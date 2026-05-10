import { EventMap } from "../components/Map/EventMap";
import { Header } from "../components/common/Header";
import { useEvents } from "../hooks/useApi";

export default function MapPage() {
  const { events } = useEvents();
  return (
    <main>
      <Header title="Карта событий" />
      <EventMap events={events} />
    </main>
  );
}
