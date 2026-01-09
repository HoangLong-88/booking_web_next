import type { Room } from "@/types/room";

export const roomService = {
  getRoomsByStayID: async (stayID?: string): Promise<Room[]> => {
    if (!stayID) return [];

    const res = await fetch(`/api/stays/${stayID}/rooms`);

    if (!res.ok) {
      throw new Error("Failed to fetch rooms");
    }

    const data: Room[] = await res.json();

    return data.map(room => ({
      ...room,
      roomType: room.roomType
    }));
  },
  checkRoomAvailability: async (stayID: string, dates: Dates): Promise<Room[] | null> => {
    const params = new URLSearchParams({
      check_in: dates.check_in,
      check_out: dates.check_out,
    });
    const res = await fetch(`/api/stays/${stayID}/availability?${params.toString()}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) {
      throw new Error("Failed to check room availability");
    }

    const data: Room[] = await res.json();
      return data.map(room => ({
      ...room,
    }));
  },
};

