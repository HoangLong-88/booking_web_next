import { useState } from "react";
import { useRouter } from "next/navigation";
import { bookingService } from "@/services/bookingService";
import { BookingItem } from "@/types/bookings";

export function useBookingService(
    items: BookingItem[],
    totalPrice: number,
) {
    const [loading, setLoading] = useState(false);
    const [method, setMethod] = useState("stay");
    const router = useRouter();

    const handleConfirm = async () => {
        try {
            setLoading(true);

            const bookingData = await bookingService.createBooking({
                items,
                totalPrice,
                paymentMethod: method,
            });

            if (bookingData.redirect_url) {
                window.location.href = bookingData.redirect_url;
            } else {
                router.push("/bookings");
            }
        } catch (e) {
            alert("Có lỗi khi tạo booking");
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        method,
        setMethod,
        handleConfirm,
    };
}
