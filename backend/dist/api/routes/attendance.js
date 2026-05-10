import { Router } from "express";
import { db } from "../../db/database.js";
const router = Router();
router.post("/events/:id/attend", (req, res) => {
    const eventId = Number(req.params.id);
    const userId = Number(req.body.user_id);
    const status = req.body.status ?? "going";
    db.prepare(`
    INSERT INTO attendance (event_id, user_id, status)
    VALUES (?, ?, ?)
    ON CONFLICT(event_id, user_id) DO UPDATE SET status=excluded.status
  `).run(eventId, userId, status);
    res.json({ ok: true });
});
router.delete("/events/:id/attend", (req, res) => {
    const eventId = Number(req.params.id);
    const userId = Number(req.body.user_id);
    db.prepare("DELETE FROM attendance WHERE event_id = ? AND user_id = ?").run(eventId, userId);
    res.status(204).send();
});
router.get("/events/:id/participants", (req, res) => {
    const eventId = Number(req.params.id);
    const rows = db.prepare(`
    SELECT u.telegram_id, u.username, u.first_name, u.last_name, a.status
    FROM attendance a
    JOIN users u ON u.telegram_id = a.user_id
    WHERE a.event_id = ?
  `).all(eventId);
    res.json(rows);
});
export default router;
