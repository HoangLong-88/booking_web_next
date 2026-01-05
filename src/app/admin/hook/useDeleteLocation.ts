import { useState, useCallback } from "react";
import { locationService } from "../service/locationService";

export function useDeleteLocation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteLocation = useCallback(async (locationId: string) => {
    setLoading(true);
    setError(null);

    try {
      await locationService.deleteLocation(locationId);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { deleteLocation, loading, error };
}
