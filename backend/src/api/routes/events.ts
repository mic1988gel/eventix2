import { Router, Request, Response } from 'express';
import { getDb } from '../../db/database';


const router = Router();


// GET /api/events — список с фильтрами router.get('/', (req: Request, res: Response) => { const db = getDb(); let query = 'SELECT * FROM events WHERE 1=1'; const params: any[] = [];


if (req.query.category) { query += ' AND category = ?'; params.push(req.query.category); } if (req.query.date) { query += ' AND date = ?'; params.push(req.query.date); } if (req.query.search) { query += ' AND title LIKE ?'; params.push(%${req.query.search}%); }


const events = db.prepare(query).all(...params); res.json(events); });


// POST /api/events — создание router.post('/', (req: Request, res: Response) => { const db = getDb(); const { title, description, category, date, time, address, latitude, longitude, max_participants, created_by } = req.body; const stmt = db.prepare( INSERT INTO events (title, description, category, date, time, address, latitude, longitude, max_participants, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)


  );
const result = stmt.run(title, description, category, date, time, address, latitude, longitude, max_participants, created_by); res.status(201).json({ id: result.lastInsertRowid }); });


export default router;

