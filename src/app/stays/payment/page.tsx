
"use client";

import PaymentForm from "@/component/ui/Form";
import { getDays } from "@/services/getDaysService";
import { BookingItem } from "@/types/bookings";
import { getToken } from "@/utils/storeLoginToken";


export default function CheckoutPage() {
  const token = getToken() || "";
  const days = getDays();

  const items: BookingItem[] = [
    {
      bookingID: 'BKG-123',
      serviceType: "stay",
      serviceID: "STAY",
      quantity: 1,
      metaJson: {
        roomID: "ROOM_02",
        days: days,
        price: 1200000,
      },
    },
  ];

  const totalPrice = items.reduce((sum, item) => {
    return (
      sum +
      (item.metaJson?.price ?? 0) *
      (item.metaJson?.days ?? 0) *
      item.quantity
    );
  }, 0);


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

