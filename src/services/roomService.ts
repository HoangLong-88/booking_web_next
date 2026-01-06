import type { Room } from "@/types/room";

export const roomService = {
  getRoomsByStayID: async (stayID?: string): Promise<Room[]> => {
    if (!stayID) return [];

    const res = await fetch(`/api/stays/${stayID}/rooms`);

    if (!res.ok) {
      throw new Error("Failed to fetch rooms");
    }

    const data: Room[] = await res.json();

    console.log(data)

    return data.map(room => ({
      ...room,
      roomType: room.roomType
    }));
  },
};

