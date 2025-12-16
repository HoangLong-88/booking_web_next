import { useEffect, useState } from "react";
import { locationService } from "../service/locationService";
import { Location } from "@/types/location";

export interface LocationPayload {
    id: string;
  locationName: string;
  address: string;
  country: string;
  pinCode: string;

  image?: File | null;

  // frontend-only helpers
  preview?: string | null;
  fileName?: string | null;

  // backend update support
  existing_image_path?: string | null;
}


type State = {
  locations: LocationPayload[];
  loading: boolean;
  error: string | null;
};

type Actions = {
  updateLocation: (
    id: string,
    patch: Partial<LocationPayload>
  ) => void;
  updateLocationImage: (id: string, file: File) => void;
  submit: () => Promise<void>;
  initialize: (apiLocations: Location[]) => void;
};


function locationToPayload(loc: Location): LocationPayload {
  return {
    id: loc.id,
    locationName: loc.name,
    address: loc.address,
    country: loc.country,
    pinCode: loc.pinCode,
    existing_image_path: loc.imagePath,
  };
}

export function useUpdateLocations(): State & Actions {
  const [locations, setLocations] = useState<LocationPayload[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initialize = (apiLocations: Location[]) => {
    setLocations(apiLocations.map(locationToPayload));
  };

  // 2️⃣ Update UI state only
    const updateLocation = (
        id: string,
        patch: Partial<LocationPayload>
        ) => {
        setLocations((prev) =>
            prev.map((loc) =>
            loc.id === id
                ? { ...loc, ...patch }
                : loc
            )
        );
    };
  const updateLocationImage = (id: string, file: File) => {
    setLocations((prev) => {
      const next = prev.map((loc) =>
        loc.id === id
          ? {
              ...loc,
              image: file,
              fileName: file.name,
              preview: URL.createObjectURL(file),
            }
          : loc
      );

      return next;
    });
  };

  // submit via service
  const submit = async () => {
    setLoading(true);
    setError(null);

    try {
      for (const payload of locations) {
        const formData = new FormData();

        formData.append("_method", "PUT");
        formData.append("id", payload.id)
        formData.append("locationName", payload.locationName);
        formData.append("address", payload.address);
        formData.append("country", payload.country);
        formData.append("pinCode", payload.pinCode);

        if (payload.existing_image_path) {
          formData.append(
            "existing_image_path",
            payload.existing_image_path
          );
        }

        if (payload.image instanceof File) {
          formData.append("image", payload.image);

        }

        await locationService.updateLocation(formData);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unexpected error"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    return () => {
      locations.forEach((loc) => {
        if (loc.preview) {
          URL.revokeObjectURL(loc.preview);
        }
      });
    };
  }, []);
  return {
    locations,
    initialize,
    loading,
    error,
    updateLocation,
    updateLocationImage,
    submit,
  };
}
