export type UserApi = {
  id: string;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  role: "customer" | "staff" | "admin";
  bookings_count?: number;
  created_at?: string;
  updated_at?: string;
  avatar_url?: string;
};