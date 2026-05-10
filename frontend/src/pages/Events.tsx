import { useState } from "react";
import { EventList } from "../components/Events/EventList";
import { Header } from "../components/common/Header";
import { useEvents } from "../hooks/useApi";

export default function EventsPage() {
  const [q, setQ] = useState("");
  const { events, loading } = useEvents(q ? { q } : undefined);

  return (
    <main>
      <Header title="События" />
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Поиск по названию" />
      {loading ? <p>Загрузка...</p> : <EventList events={events} />}
    </main>
  );
}
