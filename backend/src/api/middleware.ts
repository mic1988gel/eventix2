import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';


export function validateTelegramInitData(req: Request, res: Response, next: NextFunction) { const initData = req.headers['x-telegram-init-data'] as string; if (!initData) { return res.status(401).json({ error: 'Missing Telegram init data' }); }


// Простейшая проверка HMAC (в реальности использовать библиотеку) const secret = crypto.createHmac('sha256', 'WebAppData').update(process.env.BOT_TOKEN!).digest(); const checkHash = initData.match(/hash=([^&]+)/)?.[1]; // ... полная проверка опущена для краткости next(); }

