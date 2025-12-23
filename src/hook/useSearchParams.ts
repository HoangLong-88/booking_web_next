'use client'
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useState } from "react";

export function selectSearchParams(service: string) {
    const [location, setLocation] = useState<string>("");
    const [checkIn, setCheckIn] = useState<Date | null>(null);
    const [checkOut, setCheckOut] = useState<Date | null>(null);
    const [checkDate, setCheckDate] = useState<Date | null>(null);

    const handleSearch = async (router: AppRouterInstance) => {
        const locParam = location ? `location=${location}` : "";
        if (service === 'stays' || service === 'cars') {
            const ci = `${checkIn ? "&checkin=" + checkIn.toISOString().split("T")[0] : ""}`;
            const co = `${checkOut ? "&checkout=" + checkOut.toISOString().split("T")[0] : ""}`;

            window.location.href =`/${service}/search?${locParam}${ci}${co}`;
        } else if (service === 'attractions') {
            const cdate = `${checkDate ? "&checkdate=" + checkDate.toISOString().split("T")[0] : ""}`
            window.location.href =`/attractions/search?location=${location}`;
        }
    };

    return { setLocation, handleSearch, setCheckIn, setCheckOut, setCheckDate }
}
