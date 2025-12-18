import { BookingItem } from "@/types/bookings";

export const bookingService = {
    createBooking: async ({
        token,
        items,
        totalPrice,
        paymentMethod,
    }: {
        token: string;
        items: any[];
        totalPrice: number;
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
                total_price: totalPrice,
            }),
        });

        if (!res.ok) {
            throw new Error("Create booking failed");
        }

        return res.json();
    }
}
