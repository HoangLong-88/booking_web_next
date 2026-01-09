import { useState, useEffect } from "react";
import type { Room } from "@/types/room";
import { roomService } from "@/services/roomService";
import { formatDateToYMD } from "@/utils/date";

export function useRoomAvailability(stayID: string, initialRooms: Room[], onSuccess?: () => void) {
    const [dates, setDates] = useState<Dates>({ check_in: '', check_out: '' });
    const [availability, setAvailability] = useState<Room[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const setCheckInDate = (date: Date | null) => {
        if (!date) return;
        setDates((prev) => ({
        ...prev,
        check_in: formatDateToYMD(date),
        }));
    };

    const setCheckOutDate = (date: Date | null) => {
        if (!date) return;
        setDates((prev) => ({
        ...prev,
        check_out: formatDateToYMD(date),
        }));
    };
    const checkAvailability = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const data = await roomService.checkRoomAvailability(stayID, dates);
            setAvailability(data);

            if (onSuccess) {
                onSuccess();
            }
        } catch (err: unknown) {
        setError((err as Error).message || 'Failed to fetch availability');
        } finally {
        setLoading(false);
        }
  };
    useEffect(() => {
        setAvailability(null);
    }, [stayID]);

    return {
    dates,
    setCheckInDate,
    setCheckOutDate,
    checkAvailability,
    availability,
    loading,
    error,
    roomsToShow: availability ?? initialRooms,
    hasChecked: availability !== null
  };
}