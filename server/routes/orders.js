const express = require("express");
const { z } = require("zod");
const { getPool } = require("../db");
const { requireAuth, requireAdmin } = require("../middleware/auth");

function nowIso() {
  return new Date().toISOString().slice(0, 19).replace("T", " ");
}

const router = express.Router();

router.get("/", requireAuth, requireAdmin, async (_req, res) => {
  const pool = getPool();
  const [rows] = await pool.query(
    "SELECT * FROM Orders ORDER BY id DESC LIMIT 500"
  );
  return res.json(rows);
});

router.post("/", requireAuth, requireAdmin, async (req, res) => {
  const schema = z.object({
    tracking_code: z.string().min(6),
    customer_name: z.string().min(1),
    phone: z.string().min(6),
    origin: z.string().min(1),
    destination: z.string().min(1),
    status: z.enum(["pending", "shipping", "warehouse", "delivering", "completed"]).default("pending")
  });

  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: "Invalid payload" });

  const pool = getPool();
  const o = parsed.data;

  const [result] = await pool.query(
    `INSERT INTO Orders (tracking_code, customer_name, phone, origin, destination, status, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [o.tracking_code, o.customer_name, o.phone, o.origin, o.destination, o.status, nowIso()]
  );
  const orderId = result.insertId;

  await pool.query(
    `INSERT INTO TrackingHistory (order_id, status, location, time)
     VALUES (?, ?, ?, ?)`,
    [orderId, o.status, o.origin, nowIso()]
  );

  req.app.get("io")?.emit("orders:updated", { orderId, tracking_code: o.tracking_code });

  return res.status(201).json({ id: orderId });
});

router.patch("/:id/status", requireAuth, requireAdmin, async (req, res) => {
  const schema = z.object({
    status: z.enum(["pending", "shipping", "warehouse", "delivering", "completed"]),
    location: z.string().min(1).optional()
  });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: "Invalid payload" });

  const { id } = req.params;
  const pool = getPool();

  const [orderRows] = await pool.query("SELECT * FROM Orders WHERE id = ? LIMIT 1", [id]);
  const order = orderRows[0];
  if (!order) return res.status(404).json({ message: "Order not found" });

  await pool.query("UPDATE Orders SET status = ? WHERE id = ?", [parsed.data.status, id]);

  await pool.query(
    `INSERT INTO TrackingHistory (order_id, status, location, time)
     VALUES (?, ?, ?, ?)`,
    [id, parsed.data.status, parsed.data.location || order.destination, nowIso()]
  );

  req.app.get("io")?.emit("tracking:updated", { tracking_code: order.tracking_code });
  req.app.get("io")?.emit("orders:updated", { orderId: Number(id), tracking_code: order.tracking_code });

  return res.json({ ok: true });
});

router.post("/:id/location", requireAuth, requireAdmin, async (req, res) => {
  const schema = z.object({
    lat: z.coerce.number().min(-90).max(90),
    lng: z.coerce.number().min(-180).max(180)
  });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: "Invalid payload" });

  const { id } = req.params;
  const pool = getPool();

  const [orderRows] = await pool.query("SELECT * FROM Orders WHERE id = ? LIMIT 1", [id]);
  const order = orderRows[0];
  if (!order) return res.status(404).json({ message: "Order not found" });

  const ts = nowIso();
  await pool.query(
    "INSERT INTO VehicleLocations (order_id, latitude, longitude, timestamp) VALUES (?, ?, ?, ?)",
    [id, parsed.data.lat, parsed.data.lng, ts]
  );

  const payload = {
    tracking_code: order.tracking_code,
    orderId: order.tracking_code,
    lat: parsed.data.lat,
    lng: parsed.data.lng,
    timestamp: ts
  };

  req.app.get("io")?.emit("vehicleLocation", payload);
  req.app.get("io")?.emit("tracking:updated", { tracking_code: order.tracking_code });

  return res.status(201).json({ ok: true });
});

module.exports = router;

