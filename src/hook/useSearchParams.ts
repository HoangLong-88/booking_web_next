'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toLocalDateString } from "@/utils/date";
import type { ServiceType } from "@/types/service";

export default function useSearchParams(service: ServiceType) {
  const router = useRouter();

  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [checkDate, setCheckDate] = useState<Date | null>(null);

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (location) params.append("location", location);

    if (service === "stays" || service === "cars") {
      if (checkIn) params.append("checkin", toLocalDateString(checkIn));
      if (checkOut) params.append("checkout", toLocalDateString(checkOut));
    }

    if (service === "attractions" && checkDate) {
      params.append("checkdate", toLocalDateString(checkDate));
    }

    router.push(`/${service}/search?${params.toString()}`);
  };

  return {
    location,
    checkIn,
    checkOut,
    checkDate,
    setLocation,
    setCheckIn,
    setCheckOut,
    setCheckDate,
    handleSearch
  };
}
