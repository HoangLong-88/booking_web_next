import { searchServices } from "@/services/searchServices";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function searchLocationAndDuelDate(service: string) {
    const [location, setLocation] = useState<string>("");
    const [checkIn, setCheckIn] = useState<Date | null>(null);
    const [checkOut, setCheckOut] = useState<Date | null>(null);
    const router = useRouter();

    const handleSearch = async () => {
        searchServices.LocationAndDuelDates({ location, checkIn, checkOut, service });
        router.push(
            `/stays/search?location=${location}` +
            `${checkIn ? "&checkIn=" + checkIn.toISOString().split("T")[0] : ""}` +
            `${checkOut ? "&checkOut=" + checkOut.toISOString().split("T")[0] : ""}`
        );
    };

    return ({ setLocation, setCheckIn, setCheckOut, handleSearch })
}

export function searchWithSingleDate(service: string) {
    const [location, setLocation] = useState<string>("");
    const [checkDate, setCheckDate] = useState<Date | null>(null);
    const router = useRouter();

    const handleSearch = async () => {
        searchServices.LocationAndSingleDate({ location, checkDate, service });
        router.push(
            `/attractions/search?location=${location}` +
            `${checkDate ? "&checkIn=" + checkDate.toISOString().split("T")[0] : ""}`
        );
    };

    return ({setLocation, setCheckDate, handleSearch})
}