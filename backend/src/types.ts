export type AttendanceStatus = "going" | "interested" | "not_going";

export interface User {
  telegram_id: number;
  username?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  city?: string | null;
  district?: string | null;
  interests: string[];
}

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
  created_by: number;
  source: "user" | "parsed";
}
