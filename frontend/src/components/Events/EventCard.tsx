import { Link } from "react-router-dom";
import type { EventItem } from "../../types";

export function EventCard({ event }: { event: EventItem }) {
  return (
    <article style={{ border: "1px solid #ddd", borderRadius: 10, padding: 12, marginBottom: 10 }}>
      <h3>{event.title}</h3>
      <p>{event.date} {event.time} - {event.address}</p>
      <p>Категория: {event.category}</p>
      <p>Участники: {event.participants ?? 0}</p>
      <Link to={`/events/${event.id}`}>Подробнее</Link>
    </article>
  );
}
