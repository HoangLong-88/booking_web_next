import { roomService } from "@/services/roomService";
import type { Room } from "@/types/room";
import { useState, useEffect } from "react";

export function useRoomsByStay(stayID?: string, reloadKey?: number) {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!stayID) {
            setRooms([]); 
            setLoading(false)
            return;
        }
        const fetchRooms = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await roomService.getRoomsByStayID(stayID);
                setRooms(data);
            } catch (err) {
                setError("Failed to fetch rooms");
            } finally {
                setLoading(false);
            }
        };

        fetchRooms();
    }, [stayID, reloadKey]);

    return { rooms, loading, error };
}