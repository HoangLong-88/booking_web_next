import { useEffect, useState } from "react";
import { stayService } from "@/services/stayService";
import { StayHome } from "@/types/stays";

export function useFetchStayHomePage() {
  const [stays, setStays] = useState<StayHome[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStays = async () => {
      try {
        const res = await stayService.getHomePageStays();
        

        const normalized: StayHome[] = res.map((item) => ({
          stayID: item.stayID,
          stayName: item.stayName,
          address: item.address,
          rating: item.rating,
          price: item.price,
          images: Array.isArray(item.image_url)
            ? item.image_url
            : item.image_url
            ? [item.image_url]
        : [],
        }));

        setStays(normalized);
      } catch (err) {
        console.error(err);
        setError("Failed to load stays");
      } finally {
        setLoading(false);
      }
    };

    fetchStays();
  }, []);

  return {
    stays,
    loading,
    error,
  };
}
