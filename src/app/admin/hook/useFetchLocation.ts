import { useEffect, useState } from "react";
import { locationService } from "../service/locationService";

export interface Location {
  id: string;
  name: string;
  address: string;
  country: string;
  pinCode: string;
  imagePath: string;
  image_url?: string;
}

export function useFetchLocation() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLocations() {
      setLoading(true);
      setError(null);
      try {
        const res = await locationService.fetchLocations();
        if (res.ok) {
          setLocations(res.locations);
        } else {
          setError(res.message || "Failed to fetch locations");
        }
      } catch (err) {
        setError(String(err));
      } finally {
        setLoading(false);
      }
    }

    fetchLocations();
  }, []);

  return { locations, loading, error };
}
