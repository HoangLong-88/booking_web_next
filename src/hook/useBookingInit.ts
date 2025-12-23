import { useState } from "react";
import { useRouter } from "next/navigation";
import { bookingService } from "@/services/bookingService";

export function useBookingService(
    token: string,
    items: any[],
) {
    const [loading, setLoading] = useState(false);
    const [method, setMethod] = useState("stay");
    const router = useRouter();

    const handleConfirm = async () => {
        try {
            setLoading(true);

            const bookingData = await bookingService.createBooking({
                token,
                items,
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
        handleBooking
    };
}
