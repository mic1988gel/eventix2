import { useState } from "react";
import { api } from "../../utils/api";
import type { UserProfile as UserProfileType } from "../../types";

export function UserProfile({ profile }: { profile: UserProfileType | null }) {
  const [district, setDistrict] = useState(profile?.district ?? "");
  const [city, setCity] = useState(profile?.city ?? "Москва");
  const [interests, setInterests] = useState("concert, meetup");

  async function save() {
    if (!profile?.telegram_id) return;
    await api.put(`/users/profile/${profile.telegram_id}`, {
      city,
      district,
      interests: interests.split(",").map((x) => x.trim())
    });
    alert("Профиль сохранен");
  }

  return (
    <section style={{ display: "grid", gap: 8 }}>
      <p>{profile?.first_name} {profile?.last_name}</p>
      <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Город" />
      <input value={district} onChange={(e) => setDistrict(e.target.value)} placeholder="Район" />
      <input value={interests} onChange={(e) => setInterests(e.target.value)} placeholder="Интересы через запятую" />
      <button onClick={save} type="button">Сохранить</button>
    </section>
  );
}
