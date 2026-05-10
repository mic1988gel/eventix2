import { Router } from "express";
import { z } from "zod";
import { db } from "../../db/database.js";

const router = Router();

const initSchema = z.object({
  telegram_id: z.number(),
  username: z.string().optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional()
});

router.post("/init", (req, res) => {
  const parsed = initSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.format());

  const { telegram_id, username, first_name, last_name } = parsed.data;
  db.prepare(`
    INSERT INTO users (telegram_id, username, first_name, last_name, interests)
    VALUES (?, ?, ?, ?, '[]')
    ON CONFLICT(telegram_id) DO UPDATE SET
      username=excluded.username,
      first_name=excluded.first_name,
      last_name=excluded.last_name
  `).run(telegram_id, username ?? null, first_name ?? null, last_name ?? null);

  const user = db.prepare("SELECT * FROM users WHERE telegram_id = ?").get(telegram_id);
  res.json(user);
});

router.get("/profile/:telegramId", (req, res) => {
  const telegramId = Number(req.params.telegramId);
  const user = db.prepare("SELECT * FROM users WHERE telegram_id = ?").get(telegramId);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

router.get("/profile", (req, res) => {
  const telegramId = Number(req.query.telegramId);
  if (!telegramId) return res.status(400).json({ error: "telegramId query is required" });
  const user = db.prepare("SELECT * FROM users WHERE telegram_id = ?").get(telegramId);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

const updateSchema = z.object({
  city: z.string().optional(),
  district: z.string().optional(),
  interests: z.array(z.string()).optional()
});

router.put("/profile/:telegramId", (req, res) => {
  const telegramId = Number(req.params.telegramId);
  const parsed = updateSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.format());

  const { city, district, interests } = parsed.data;
  db.prepare(`
    UPDATE users
    SET city = COALESCE(?, city),
        district = COALESCE(?, district),
        interests = COALESCE(?, interests)
    WHERE telegram_id = ?
  `).run(city ?? null, district ?? null, interests ? JSON.stringify(interests) : null, telegramId);

  const updated = db.prepare("SELECT * FROM users WHERE telegram_id = ?").get(telegramId);
  res.json(updated);
});

router.put("/profile", (req, res) => {
  const telegramId = Number(req.query.telegramId);
  if (!telegramId) return res.status(400).json({ error: "telegramId query is required" });
  const parsed = updateSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.format());

  const { city, district, interests } = parsed.data;
  db.prepare(`
    UPDATE users
    SET city = COALESCE(?, city),
        district = COALESCE(?, district),
        interests = COALESCE(?, interests)
    WHERE telegram_id = ?
  `).run(city ?? null, district ?? null, interests ? JSON.stringify(interests) : null, telegramId);

  const updated = db.prepare("SELECT * FROM users WHERE telegram_id = ?").get(telegramId);
  res.json(updated);
});

export default router;
