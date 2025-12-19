import { BookingItem } from "@/types/bookings";
import { getToken } from "@/utils/storeLoginToken";


export const bookingService = {
    createBooking: async ({
        items,
        totalPrice,
        paymentMethod,
    }: {
        items: BookingItem[];
        totalPrice: number;
        paymentMethod: string;
    }) => {
        const token = getToken();
        const res = await fetch("/api/bookings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                paymentMethod,
                items,
                total_price: totalPrice,
            }),
        });

        if (!res.ok) {
            throw new Error("Create booking failed");
        }

        return res.json();
    }
}
