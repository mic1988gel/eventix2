import { useEffect, useState } from "react";
import { UserProfile } from "../components/Profile/UserProfile";
import { Header } from "../components/common/Header";
import { useTelegram } from "../hooks/useTelegram";
import type { UserProfile as UserProfileType } from "../types";
import { api } from "../utils/api";

export default function ProfilePage() {
  const { user } = useTelegram();
  const [profile, setProfile] = useState<UserProfileType | null>(null);

  useEffect(() => {
    if (!user?.id) return;
    api.get<UserProfileType>(`/users/profile/${user.id}`).then((res) => setProfile(res.data)).catch(() => {
      setProfile({ telegram_id: user.id, first_name: user.first_name });
    });
  }, [user?.id, user?.first_name]);

  return (
    <main>
      <Header title="Профиль" />
      <UserProfile profile={profile} />
    </main>
  );
}
