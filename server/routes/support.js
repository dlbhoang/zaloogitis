const express = require("express");
const { z } = require("zod");
const { getPool } = require("../db");
const { requireAuth, requireAdmin } = require("../middleware/auth");

const router = express.Router();

router.get("/:code", async (req, res) => {
  const code = String(req.params.code || "").trim();
  if (!code) return res.status(400).json({ message: "Missing tracking code" });

  const pool = getPool();
  const [rows] = await pool.query(
    "SELECT tracking_code, sender, message, created_at FROM SupportMessages WHERE tracking_code = ? ORDER BY created_at ASC, id ASC LIMIT 200",
    [code]
  );

  return res.json(rows);
});

router.post("/:code/customer", async (req, res) => {
  const code = String(req.params.code || "").trim();
  if (!code) return res.status(400).json({ message: "Missing tracking code" });

  const schema = z.object({
    message: z.string().min(1).max(1000)
  });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: "Invalid payload" });

  const pool = getPool();
  const now = new Date().toISOString().slice(0, 19).replace("T", " ");
  const [result] = await pool.query(
    "INSERT INTO SupportMessages (tracking_code, sender, message, created_at) VALUES (?, 'customer', ?, ?)",
    [code, parsed.data.message, now]
  );

  const msg = {
    id: result.insertId,
    tracking_code: code,
    sender: "customer",
    message: parsed.data.message,
    created_at: now
  };

  req.app.get("io")?.to(`support:${code}`).emit("support:message", msg);
  return res.status(201).json(msg);
});

router.post("/:code/agent", requireAuth, requireAdmin, async (req, res) => {
  const code = String(req.params.code || "").trim();
  if (!code) return res.status(400).json({ message: "Missing tracking code" });

  const schema = z.object({
    message: z.string().min(1).max(1000)
  });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: "Invalid payload" });

  const pool = getPool();
  const now = new Date().toISOString().slice(0, 19).replace("T", " ");
  const [result] = await pool.query(
    "INSERT INTO SupportMessages (tracking_code, sender, message, created_at) VALUES (?, 'agent', ?, ?)",
    [code, parsed.data.message, now]
  );

  const msg = {
    id: result.insertId,
    tracking_code: code,
    sender: "agent",
    message: parsed.data.message,
    created_at: now
  };

  req.app.get("io")?.to(`support:${code}`).emit("support:message", msg);
  return res.status(201).json(msg);
});

module.exports = router;

