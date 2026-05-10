import express from 'express';
import cors from 'cors'; import { Telegraf } from 'telegraf'; import { initDatabase } from './db/database'; import eventsRouter from './api/routes/events'; import usersRouter from './api/routes/users'; import attendanceRouter from './api/routes/attendance'; import { webhookCallback } from './bot/webhooks';


const app = express(); const PORT = process.env.PORT || 3000;


// Инициализация БД initDatabase();


// Middlewares app.use(cors()); app.use(express.json());


// Тelegram bot (токен из переменных окружения) const bot = new Telegraf(process.env.BOT_TOKEN!); app.use('/api/webhook', webhookCallback(bot));


// API роуты app.use('/api/events', eventsRouter); app.use('/api/users', usersRouter); app.use('/api/attendance', attendanceRouter);


// Запуск app.listen(PORT, () => { console.log(🚀 Server running on http://localhost:${PORT}); });

