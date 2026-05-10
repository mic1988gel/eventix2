const categories = ["concert", "exhibition", "sport", "meetup"];
const districts = ["Центр", "САО", "СВАО", "ЮАО", "ЗАО"];
export function seedMockEvents(db) {
    const count = db.prepare("SELECT COUNT(*) as c FROM events").get();
    if (count.c > 0)
        return;
    const insert = db.prepare(`
    INSERT INTO events (title, description, category, date, time, address, latitude, longitude, max_participants, created_by, source)
    VALUES (@title, @description, @category, @date, @time, @address, @latitude, @longitude, @max_participants, @created_by, 'parsed')
  `);
    for (let i = 1; i <= 24; i++) {
        const category = categories[i % categories.length];
        const district = districts[i % districts.length];
        insert.run({
            title: `Событие ${i}`,
            description: `Тестовое ${category} событие в районе ${district}`,
            category,
            date: `2026-05-${String((i % 28) + 1).padStart(2, "0")}`,
            time: `${String(10 + (i % 10)).padStart(2, "0")}:00`,
            address: `Москва, район ${district}, дом ${i}`,
            latitude: 55.75 + i * 0.003,
            longitude: 37.61 + i * 0.003,
            max_participants: 10 + (i % 20),
            created_by: 100000 + (i % 10)
        });
    }
}
