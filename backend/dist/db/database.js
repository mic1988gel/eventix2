import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";
import { seedMockEvents } from "../services/eventParser.js";
const dataDir = path.resolve(process.cwd(), "data");
if (!fs.existsSync(dataDir))
    fs.mkdirSync(dataDir, { recursive: true });
const dbPath = path.join(dataDir, "eventix.db");
const schemaPath = path.resolve(process.cwd(), "src/db/schema.sql");
const schemaSql = fs.readFileSync(schemaPath, "utf-8");
export const db = new Database(dbPath);
db.pragma("journal_mode = WAL");
db.exec(schemaSql);
const usersCount = db.prepare("SELECT COUNT(*) as c FROM users").get();
if (usersCount.c === 0) {
    const insertUser = db.prepare(`
    INSERT INTO users (telegram_id, username, first_name, last_name, city, district, interests)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
    for (let i = 1; i <= 8; i++) {
        insertUser.run(100000 + i, `user${i}`, `Имя${i}`, `Фамилия${i}`, "Москва", "Центр", '["concert","meetup"]');
    }
}
seedMockEvents(db);
