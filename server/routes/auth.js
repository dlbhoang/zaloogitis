const express = require("express");
const bcrypt = require("bcryptjs");
const { z } = require("zod");
const { getPool } = require("../db");
const { signUser } = require("../utils/jwt");

const router = express.Router();

router.post("/login", async (req, res) => {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(1)
  });

  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: "Invalid payload" });

  const { email, password } = parsed.data;
  const pool = getPool();

  const [rows] = await pool.query(
    "SELECT id, name, email, password, role FROM Users WHERE email = ? LIMIT 1",
    [email]
  );
  const user = rows[0];
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });

  const token = signUser(user);
  return res.json({
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role }
  });
});

module.exports = router;

