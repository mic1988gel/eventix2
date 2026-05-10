import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { EventItem } from "../types";
import { api } from "../utils/api";

export default function EventDetailsPage() {
  const { id } = useParams();
  const [event, setEvent] = useState<EventItem | null>(null);
  const [participants, setParticipants] = useState<Array<{ first_name?: string; username?: string }>>([]);

  useEffect(() => {
    if (!id) return;
    api.get<EventItem>(`/events/${id}`).then((res) => setEvent(res.data));
    api.get(`/events/${id}/participants`).then((res) => setParticipants(res.data));
  }, [id]);

  async function attend() {
    await api.post(`/events/${id}/attend`, { user_id: 100001, status: "going" });
    alert("Вы записаны");
  }

  if (!event) return <p>Загрузка...</p>;
  return (
    <main>
      <h2>{event.title}</h2>
      <p>{event.description}</p>
      <p>{event.date} {event.time}</p>
      <p>{event.address}</p>
      <button onClick={attend} type="button">Иду тоже</button>
      <h4>Участники</h4>
      {participants.map((p, idx) => <p key={idx}>{p.first_name ?? p.username}</p>)}
    </main>
  );
}
