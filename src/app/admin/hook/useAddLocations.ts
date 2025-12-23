import { useCallback, useState } from "react";
import { locationService } from "../service/locationService";

export interface LocationPayload {
  name: string;
  address: string;
  country: string;
  pinCode: string;
  image?: File | null;
  preview?: string | null;
  fileName?: string | null;
}

type State = {
  locations: LocationPayload[];
  loading: boolean;
  error: string | null;
};

type Actions = {
  addLocation: () => void;
  updateField: (index: number, field: keyof LocationPayload, value: unknown) => void;
  removeLocation: (index: number) => void;
  submit: () => Promise<void>;
};

export function useLocationForm(): { state: State; actions: Actions } {
  const [locations, setLocations] = useState<LocationPayload[]>([
    { name: "", address: "", country: "", pinCode: "", image:  null, preview: null },
  ]);
  const MAX_IMAGE_SIZE = 20 * 1024 * 1024;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addLocation = useCallback(() => {
    setLocations((prev) => [
      ...prev,
      { name: "", address: "", country: "", pinCode: "", image: null, preview: null, fileName: null },
    ]);
  }, []);

  const updateField = useCallback(
    (index: number, field: keyof LocationPayload, value: unknown) => {
      setLocations((prev) => {
        const next = [...prev];
        if (!next[index]) return prev;
        const updated = { ...next[index], [field]: value };

      if (field === "image") {
        if (value instanceof File) {
          updated.preview = URL.createObjectURL(value);
          updated.fileName = value.name
        } else {
          updated.preview = null;
          updated.fileName = null;
        }
      }
      next[index] = updated;
      return next;
      });
    },
    []
  );

  const removeLocation = useCallback((index: number) => {
    setLocations((prev) => {
    const loc = prev[index];
    if (loc?.preview) URL.revokeObjectURL(loc.preview);
    return prev.filter((_, i) => i !== index);
  });
  }, []);

  const submit = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      if (locations.some((l) => !l.name.trim())) {
        throw new Error("Location name is required");
      }

      for (const loc of locations) {
        const form = new FormData();
        if (loc.image) {
          if (loc.image.size > MAX_IMAGE_SIZE) {
            setError("Image must be smaller than 20MB");
            return;
          }
        }
        form.append("locationName", loc.name);
        form.append("address", loc.address);
        form.append("country", loc.country);
        form.append("pinCode", loc.pinCode);
        if (loc.image) form.append("image", loc.image);

        await locationService.addLocation(form);
      }
    } catch (err) {
      setError(String(err));
      throw err;
    } finally {
      setLoading(false);
      window.location.reload;
    }
  }, [locations]);

  return {
    state: { locations, loading, error },
    actions: { addLocation, updateField, removeLocation, submit },
  };
}
