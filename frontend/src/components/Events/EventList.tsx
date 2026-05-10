import type { EventItem } from "../../types";
import { EventCard } from "./EventCard";

export function EventList({ events }: { events: EventItem[] }) {
  return (
    <section>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </section>
  );
}
