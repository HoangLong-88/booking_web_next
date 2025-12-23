"use client";

import { useEffect, useState } from "react";
import { stayService } from "@/services/stayService";
import { StayDetail } from "@/types/stays";

export function useStayDetail(stayID: string, refreshKey?: number) {
  const [stay, setStay] = useState<StayDetail>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!stayID) return;

    const fetchStay = async () => {
      try {
        setLoading(true);
        const res = await stayService.getStayById(stayID);
        setStay(res);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStay();
  }, [stayID, refreshKey]);

  return { stay, loading, error };
}
