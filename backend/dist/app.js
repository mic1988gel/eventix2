import "dotenv/config";
import cors from "cors";
import express from "express";
import attendanceRoutes from "./api/routes/attendance.js";
import eventRoutes from "./api/routes/events.js";
import userRoutes from "./api/routes/users.js";
import { createBot } from "./bot/index.js";
import { webhookHandler } from "./bot/webhooks.js";
import "./db/database.js";
const app = express();
app.use(cors());
app.use(express.json());
app.get("/health", (_req, res) => res.json({ ok: true }));
app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api", attendanceRoutes);
const bot = createBot();
if (bot) {
    app.post("/api/webhook", webhookHandler(bot));
}
const port = Number(process.env.PORT || 3001);
app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Eventix backend is running on http://localhost:${port}`);
});
