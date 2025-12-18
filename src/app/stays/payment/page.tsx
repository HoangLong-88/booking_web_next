
"use client";

import PaymentForm from "@/component/ui/Form";
import { useAuth } from "@/hook/useAuth";
import { BookingItem } from "@/types/bookings";


export default function CheckoutPage() {
  const { token } = useAuth() || { token: '' };

  const items: BookingItem[] = [
    {
      bookingID: 'BKG-123',
      serviceType: "stay",
      serviceID: "STAY",
      quantity: 1,
      metaJson: {
        roomID: "ROOM_02",
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

