import { BookingItem } from "./bookings";

// export type PaymentMethod = "qr" | "card" | "stay";

export interface PaymentFormProps {
  items: BookingItem[];
  totalPrice: number;
}