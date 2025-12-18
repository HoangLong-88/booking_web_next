import { BookingItem } from "./bookings";

// export type PaymentMethod = "qr" | "card" | "stay";

export interface PaymentFormProps {
  token: string;
  items: BookingItem[];
  totalPrice: number;
}