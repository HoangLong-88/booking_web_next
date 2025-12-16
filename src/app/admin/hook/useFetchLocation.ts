import { useEffect, useState, useCallback } from "react";
import { locationService } from "../service/locationService";
import { Location } from "@/types/location";

interface RawLocation {
  locationID: string;
  locationName: string;
  address: string | null;
  country: string | null;
  pinCode: string | null;
  location_image_path: string | null;
  image_url: string | null;
}

export function useFetchLocation() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLocations = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await locationService.fetchLocations();

      if (res.ok) {
        const mapped: Location[] = res.locations.map(
          (item: RawLocation) => ({
            id: item.locationID,
            name: item.locationName,
            address: item.address ?? "",
            country: item.country ?? "",
            pinCode: item.pinCode ?? "",
            imagePath: item.location_image_path ?? "",
            image_url: item.image_url ?? undefined,
          })
        );

        setLocations(mapped);
      } else {
        setError(res.message || "Failed to fetch locations");
      }
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  }, []);

  // 2️⃣ useEffect CHỈ GỌI fetchLocations
  useEffect(() => {
    fetchLocations();
  }, [fetchLocations]);
  return { locations, loading, error, refetch: fetchLocations };
}
