"use client";

import { useEffect, useState } from "react";
import { stayService } from "@/services/stayService";
import { StayDetail } from "@/types/stays";

export function useStayDetail(stayID: string) {
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
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStay();
  }, [stayID]);

  return { stay, loading, error };
}
