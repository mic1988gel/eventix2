# Eventix

Telegram Mini App для поиска и создания событий.

## Что реализовано в MVP

- Backend на Express + TypeScript + SQLite (`better-sqlite3`)
- Telegram bot команды `/start` и `/settings` через `telegraf`
- API пользователей, событий и участия
- Моковые пользователи и 24 моковых события по Москве
- Frontend на React + Vite с экранами:
  - Home
  - Events
  - EventDetails
  - Map (MVP заглушка списка маркеров)
  - Profile
  - CreateEvent

## Структура

- `backend/` - API, БД, бот, webhook
- `frontend/` - Mini App интерфейс

## Запуск локально

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

По умолчанию:

- Backend: `http://localhost:3001`
- Frontend: `http://localhost:5173`

## ENV для backend

Создайте `.env` в `backend/`:

```env
PORT=3001
BOT_TOKEN=your_telegram_bot_token
MINI_APP_URL=https://your-mini-app-url
```

## Webhook

- Endpoint: `POST /api/webhook`
- Пример production URL: `https://yourdomain.com/api/webhook`
