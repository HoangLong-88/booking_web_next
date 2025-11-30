export interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  language: string;
  avatar_url?: string | null;
  role: "customer" | "staff" | "admin";
  remember_token?: string | null;
}
