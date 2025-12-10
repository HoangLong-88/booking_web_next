"use client";
import { useCallback, useEffect, useState } from "react";
import { searchPlace, saveLocations } from "@/app/admin/service/locationService";

type Suggestion = { place_id: number; display_name: string; lat: string; lon: string };

type LocState = {
  id: string;
  name: string;
  tagsInput: string;
  type: "center" | "region";
  query: string;
  suggestions: Suggestion[];
  radius: number | "";
  unit: "km" | "mi";
  lat?: string | number | null;
  lon?: string | number | null;
};

function createEmpty(): LocState {
  return {
    id: Date.now().toString(),
    name: "",
    tagsInput: "",
    type: "center",
    query: "",
    suggestions: [],
    radius: 3,
    unit: "mi",
    lat: null,
    lon: null,
  };
}

export function useLocationForm() {
  const [locations, setLocations] = useState<LocState[]>([createEmpty()]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addLocationBlock = useCallback(() => {
    setLocations((s) => [...s, createEmpty()]);
  }, []);

  const removeLocationBlock = useCallback((idx: number) => {
    setLocations((s) => s.filter((_, i) => i !== idx));
  }, []);

  const updateLocationField = useCallback((idx: number, field: string, value: any) => {
    setLocations((s) =>
      s.map((l, i) => {
        if (i !== idx) return l;
        if (field === "selectSuggestion") {
          const sug = value as Suggestion;
          return {
            ...l,
            query: sug.display_name,
            suggestions: [],
            lat: sug.lat,
            lon: sug.lon,
          };
        }
        if (field === "query") {
          // trigger suggestion search
          const q = String(value);
          if (q.length > 2) {
            searchPlace(q).then((res) => {
              setLocations((prev) =>
                prev.map((pl, pi) => (pi === idx ? { ...pl, suggestions: res } : pl))
              );
            });
          } else {
            // clear suggestions
            setLocations((prev) => prev.map((pl, pi) => (pi === idx ? { ...pl, suggestions: [] } : pl)));
          }
        }
        return { ...l, [field]: value };
      })
    );
  }, []);

  const submit = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const payload = locations.map((l) => ({
        name: l.name,
        tags: l.tagsInput.split(",").map((s) => s.trim()).filter(Boolean),
        type: l.type,
        center: l.type === "center" ? { lat: l.lat, lon: l.lon, radius: l.radius, unit: l.unit } : null,
        regionLabel: l.type === "region" ? l.query : null,
      }));
      const res = await saveLocations(payload);
      if (!res.ok) throw new Error(res.message || "Save failed");
      // success: reset
      setLocations([createEmpty()]);
    } catch (err: any) {
      setError(err?.message ?? String(err));
    } finally {
      setLoading(false);
    }
  }, [locations]);

  useEffect(() => {
    // cleanup suggestions polling on unmount if needed
    return () => {};
  }, []);

  return {
    state: { locations, loading, error },
    actions: { addLocationBlock, removeLocationBlock, updateLocationField, submit },
  } as const;
}