import { useState } from "react";

export const getDateInput = () => {
    const [checkIn, setCheckIn] = useState<Date | null>(null);
    const [checkOut, setCheckOut] = useState<Date | null>(null);
    const [checkDate, setCheckDate] = useState<Date | null>(null);

    return { checkIn, checkOut, checkDate, setCheckIn, setCheckOut, setCheckDate }
}
