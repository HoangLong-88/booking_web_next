import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export function getDays() {
    const searchParams = useSearchParams();

    const checkin = searchParams.get("checkin");
    const checkout = searchParams.get("checkout");

    const days = useMemo(() => {
        if (!checkin || !checkout) return 1;

        const start = new Date(checkin);
        const end = new Date(checkout);

        return Math.max(
            Math.ceil(
                (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
            ),
            1
        );
    }, [checkin, checkout]);
}

