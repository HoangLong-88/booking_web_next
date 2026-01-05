import { BookingItem } from "@/types/bookings";
import { getToken } from "@/utils/storeLoginToken";


export const bookingService = {
    createBooking: async ({
        token,
        items,
        paymentMethod,
    }: {
        token: string;
        items: any[];
        paymentMethod: string;
    }) => {
        const res = await fetch("/api/bookings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                paymentMethod,
                items,
            }),
        });

        if (!res.ok) {
            throw new Error("Create booking failed");
        }

        return res.json();
    }
}
