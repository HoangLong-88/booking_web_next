import type { User } from "./user";
export interface Review {
  id: string;
  rating: number;
  review: string;
  created_at: string;
  user: Pick<User, "id" | "name" | "avatar_url">
}
export interface SubmitReviewPayload {
  serviceID: string;
  rating: number;
  review: string;
}
