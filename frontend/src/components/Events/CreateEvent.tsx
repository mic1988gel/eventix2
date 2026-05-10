import { useState } from "react";
import { api } from "../../utils/api";

export function CreateEventForm() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("meetup");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");

  async function submit() {
    await api.post("/events", {
      title,
      category,
      date,
      time,
      address,
      created_by: 100001
    });
    alert("Событие создано");
  }

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Название" />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="concert">concert</option>
        <option value="exhibition">exhibition</option>
        <option value="sport">sport</option>
        <option value="meetup">meetup</option>
      </select>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
      <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Адрес" />
      <button onClick={submit} type="button">Создать встречу</button>
    </div>
  );
}
