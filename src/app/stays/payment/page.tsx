
"use client";

import PaymentForm from "@/component/ui/Form";
import { BookingItem } from "@/types/bookings";


export default function CheckoutPage() {
  const token = localStorage.getItem("token") || "";

  const items: BookingItem[] = [
    {
      serviceType: "stay",
      serviceID: "STAY",
      quantity: 1,
      meta: {
        room_id: "ROOM_02",
        days: 2,
        price: 1200000,
      },
    },
  ];

  const totalPrice = 2 * 1200000;

  return (
    <div className="min-h-screen bg-gray-100 pt-30">
      <PaymentForm
        token={token}
        items={items}
        totalPrice={totalPrice}
      />
    </div>
  );
}

