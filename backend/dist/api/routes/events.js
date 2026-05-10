import { Router } from "express";
import { z } from "zod";
import { db } from "../../db/database.js";
const router = Router();
router.get("/", (req, res) => {
    const { category, date, q, district } = req.query;
    const rows = db.prepare(`
    SELECT e.*,
      (SELECT COUNT(*) FROM attendance a WHERE a.event_id = e.id AND a.status = 'going') as participants
    FROM events e
    WHERE (? IS NULL OR e.category = ?)
      AND (? IS NULL OR e.date = ?)
      AND (? IS NULL OR e.title LIKE ?)
      AND (? IS NULL OR e.address LIKE ?)
    ORDER BY e.date ASC, e.time ASC
  `).all(category ?? null, category ?? null, date ?? null, date ?? null, q ?? null, q ? `%${q}%` : null, district ?? null, district ? `%${district}%` : null);
    res.json(rows);
});
router.get("/:id", (req, res) => {
    const id = Number(req.params.id);
    const event = db.prepare("SELECT * FROM events WHERE id = ?").get(id);
    if (!event)
        return res.status(404).json({ error: "Event not found" });
    res.json(event);
});
const eventSchema = z.object({
    title: z.string().min(3).max(120),
    description: z.string().max(500).optional(),
    category: z.string().min(2),
    date: z.string(),
    time: z.string(),
    address: z.string().min(3),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    max_participants: z.number().min(2).max(200).optional(),
    created_by: z.number()
});
router.post("/", (req, res) => {
    const parsed = eventSchema.safeParse(req.body);
    if (!parsed.success)
        return res.status(400).json(parsed.error.format());
    const e = parsed.data;
    const stmt = db.prepare(`
    INSERT INTO events (title, description, category, date, time, address, latitude, longitude, max_participants, created_by, source)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'user')
  `);
    const r = stmt.run(e.title, e.description ?? null, e.category, e.date, e.time, e.address, e.latitude ?? null, e.longitude ?? null, e.max_participants ?? 10, e.created_by);
    const created = db.prepare("SELECT * FROM events WHERE id = ?").get(r.lastInsertRowid);
    res.status(201).json(created);
});
router.put("/:id", (req, res) => {
    const id = Number(req.params.id);
    const parsed = eventSchema.partial().safeParse(req.body);
    if (!parsed.success)
        return res.status(400).json(parsed.error.format());
    const e = parsed.data;
    db.prepare(`
    UPDATE events
    SET title=COALESCE(?, title),
        description=COALESCE(?, description),
        category=COALESCE(?, category),
        date=COALESCE(?, date),
        time=COALESCE(?, time),
        address=COALESCE(?, address),
        latitude=COALESCE(?, latitude),
        longitude=COALESCE(?, longitude),
        max_participants=COALESCE(?, max_participants)
    WHERE id=?
  `).run(e.title ?? null, e.description ?? null, e.category ?? null, e.date ?? null, e.time ?? null, e.address ?? null, e.latitude ?? null, e.longitude ?? null, e.max_participants ?? null, id);
    const updated = db.prepare("SELECT * FROM events WHERE id = ?").get(id);
    res.json(updated);
});
router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);
    db.prepare("DELETE FROM events WHERE id = ?").run(id);
    res.status(204).send();
});
export default router;
