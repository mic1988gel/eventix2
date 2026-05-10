import type { EventItem } from "../../types";

export function EventMarker({ event }: { event: EventItem }) {
  return (
    <div style={{ border: "1px solid #bbb", borderRadius: 8, padding: 8 }}>
      <strong>{event.title}</strong>
      <div>{event.latitude}, {event.longitude}</div>
    </div>
  );
}
