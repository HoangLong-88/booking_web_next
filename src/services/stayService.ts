import type { StayHomeApi, StayDetail } from "@/types/stays";
export const stayService = {
  getHomePageStays: async () : Promise<StayHomeApi[]> => {
    try {
      const res = await fetch("/api/stays/home", {
        method: "GET",
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }
      return data;
    } catch (err: unknown) {
      if (err instanceof Error) throw err;
      throw new Error("Update avatar failed");
    }
  },
  getStayById: async (id: string) : Promise<StayDetail> => {
      try {
        const res = await fetch(`/api/stays/${id}`, {
          method: "GET",
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }
      return data;
    } catch (err: unknown) {
      if (err instanceof Error) throw err;
      throw new Error("Update avatar failed");
    }
  }
};