

interface StayHomeApi {
  stayName: string;
  location: string;
  address: string;
  rating: number | null;
  price: string;
  image_url: string[]; 
}
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
  }
};