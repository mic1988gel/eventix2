import Database from 'better-sqlite3';
import path from 'path';


const DB_PATH = path.join(__dirname, '../../data/eventix.db');


let db: Database.Database;


export function initDatabase() { db = new Database(DB_PATH); db.pragma('journal_mode = WAL'); db.exec( CREATE TABLE IF NOT EXISTS users ( id INTEGER PRIMARY KEY, telegram_id INTEGER UNIQUE NOT NULL, username TEXT, first_name TEXT, last_name TEXT, city TEXT, interests TEXT, district TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP );


CREATE TABLE IF NOT EXISTS events ( id INTEGER PRIMARY KEY, title TEXT NOT NULL, description TEXT, category TEXT NOT NULL, date DATE NOT NULL, time TIME NOT NULL, address TEXT NOT NULL, latitude REAL, longitude REAL, max_participants INTEGER DEFAULT 10, created_by INTEGER REFERENCES users(telegram_id), source TEXT DEFAULT 'user', created_at DATETIME DEFAULT CURRENT_TIMESTAMP );


CREATE TABLE IF NOT EXISTS attendance ( id INTEGER PRIMARY KEY, event_id INTEGER REFERENCES events(id), user_id INTEGER REFERENCES users(telegram_id), status TEXT DEFAULT 'going', created_at DATETIME DEFAULT CURRENT_TIMESTAMP, UNIQUE(event_id, user_id) );


  );
return db; }


export function getDb(): Database.Database { if (!db) { throw new Error('Database not initialized'); } return db; }

