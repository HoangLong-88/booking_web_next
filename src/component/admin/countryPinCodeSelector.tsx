"use client";

import { useCountryPinCode } from "@/hook/admin/useCountryPinCode";
import { useEffect } from "react";
import { cn } from "@/libs/utils";

interface Props {
  onChange?: (country: string, pinCode: string) => void;
  className?: string;
}

export default function CountryPinCodeSelector({ onChange, className }: Props) {
  const {
    COUNTRIES,
    selectedCountry,
    setSelectedCountry,
    pinCodes,
    selectedPinCode,
    setSelectedPinCode,
  } = useCountryPinCode();

  // Notify parent
  useEffect(() => {
    onChange?.(selectedCountry, selectedPinCode);
  }, [selectedCountry, selectedPinCode]);

  return (
    <div className={cn("flex flex-row gap-4", className)}>
      {/* Country */}
      <select
        className="border border-gray-300 p-2 rounded-md"
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)}
      >
        <option value="">Select Country</option>
        {COUNTRIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      {/* Pin Code */}
      <select
        className="border border-gray-300 p-2 rounded-md"
        value={selectedPinCode}
        onChange={(e) => setSelectedPinCode(e.target.value)}
        disabled={!selectedCountry}
      >
        <option value="">Select Pin Code</option>
        {pinCodes.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>
    </div>
  );
}
