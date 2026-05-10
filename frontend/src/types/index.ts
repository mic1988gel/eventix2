export interface EventItem {
  id: number;
  title: string;
  description: string | null;
  category: string;
  date: string;
  time: string;
  address: string;
  latitude: number | null;
  longitude: number | null;
  max_participants: number;
  participants?: number;
}

export interface UserProfile {
  telegram_id: number;
  username?: string;
  first_name?: string;
  last_name?: string;
  city?: string;
  district?: string;
  interests?: string;
}
