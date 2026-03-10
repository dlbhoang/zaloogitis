const express = require("express");
const { z } = require("zod");
const { getPool } = require("../db");
const { requireAuth, requireAdmin } = require("../middleware/auth");

const router = express.Router();

router.post("/", async (req, res) => {
  const schema = z.object({
    name: z.string().min(1),
    phone: z.string().min(6),
    email: z.string().email(),
    pickup: z.string().min(1),
    destination: z.string().min(1),
    cargo: z.string().min(1),
    weight: z.coerce.number().positive(),
    note: z.string().optional().default("")
  });

  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: "Invalid payload" });

  const pool = getPool();
  const q = parsed.data;
  const [result] = await pool.query(
    `INSERT INTO Quotes (name, phone, email, pickup, destination, cargo, weight, note, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [q.name, q.phone, q.email, q.pickup, q.destination, q.cargo, q.weight, q.note, "new"]
  );

  return res.status(201).json({ id: result.insertId });
});

router.get("/", requireAuth, requireAdmin, async (_req, res) => {
  const pool = getPool();
  const [rows] = await pool.query(
    "SELECT * FROM Quotes ORDER BY id DESC LIMIT 500"
  );
  return res.json(rows);
});

router.patch("/:id", requireAuth, requireAdmin, async (req, res) => {
  const schema = z.object({
    status: z.string().min(1).optional(),
    reply_price: z.coerce.number().nonnegative().optional(),
    reply_note: z.string().optional()
  });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: "Invalid payload" });

  const { id } = req.params;
  const pool = getPool();
  const updates = parsed.data;

  const fields = [];
  const values = [];
  for (const [k, v] of Object.entries(updates)) {
    fields.push(`${k} = ?`);
    values.push(v);
  }
  if (!fields.length) return res.status(400).json({ message: "No updates" });
  values.push(id);

  await pool.query(`UPDATE Quotes SET ${fields.join(", ")} WHERE id = ?`, values);
  return res.json({ ok: true });
});

module.exports = router;

