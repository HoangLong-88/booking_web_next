import type { Room } from "@/types/room";
export const roomService = {
  getRoomsByStayID: async (stayID?: string): Promise<Room[]> => {
    if (!stayID) return [];

    const res = await fetch(`/api/stays/${stayID}/rooms`, {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch rooms");
    }

    const json: { ok: boolean; data: Room[] } = await res.json();

    return json.data;
  },
};
