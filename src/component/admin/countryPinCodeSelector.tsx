"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { useCountryPinCode } from "@/hook/admin/useCountryPinCode";
import { cn } from "@/libs/utils";

interface Props {
  country?: string;
  pinCode?: string;
  onChange?: (country: string, pinCode: string) => void;
  className?: string;
}

function normalizeCountry(
  value: string | undefined,
  countries: string[]
): string {
  if (!value) return "";

  const normalizedInput = value.replace(/\s+/g, "").toLowerCase();

  const matched = countries.find(
    (c) => c.replace(/\s+/g, "").toLowerCase() === normalizedInput
  );

  return matched ?? "";
}

export default function CountryPinCodeSelector({
  country,
  pinCode,
  onChange,
  className,
}: Props) {
  const {
    COUNTRIES,
    selectedCountry,
    setSelectedCountry,
    pinCodes,
    selectedPinCode,
    setSelectedPinCode,
  } = useCountryPinCode();

  const normalizedCountry = useMemo(
    () => normalizeCountry(country, COUNTRIES),
    [country, COUNTRIES]
  );

  // track last country we synced from parent to avoid re-sync loops
  const lastSyncedNormalized = useRef<string | null>(null);

  useEffect(() => {
    // nothing to do
    if (!normalizedCountry) return;

    // already synced this normalized value or already current -> skip
    if (lastSyncedNormalized.current === normalizedCountry) return;
    if (normalizedCountry === selectedCountry) {
      lastSyncedNormalized.current = normalizedCountry;
      return;
    }

    // sync once for this incoming normalized country
    setSelectedCountry(normalizedCountry);
    lastSyncedNormalized.current = normalizedCountry;
  }, [normalizedCountry, selectedCountry, setSelectedCountry]);

  // sync pinCode after pinCodes are available for the selected country
  useEffect(() => {
    if (!pinCode) return;
    if (!pinCodes || pinCodes.length === 0) return;

    // 1️⃣ exact match
    if (pinCodes.includes(pinCode)) {
      setSelectedPinCode(pinCode);
      return;
    }

    // 2️⃣ relaxed match (ONLY if formats are compatible)
    const normalize = (v: string) => v.replace(/\D/g, "");
    
    const target = normalize(pinCode);
    if (!target) return;

    const found = pinCodes.find(
      (p) => normalize(p) === target
    );
    if (found) {
      setSelectedPinCode(found);
    }
  }, [pinCode, pinCodes]);
  return (
    <div className={cn("flex flex-row gap-4", className)}>
      {/* Country */}
      <select
        className="border border-gray-300 p-2 rounded-md"
        value={selectedCountry}
        onChange={(e) => {
          const value = e.target.value;
          // user changed country -> clear lastSyncedNormalized so future parent changes can re-sync
          lastSyncedNormalized.current = null;
          setSelectedCountry(value);
          setSelectedPinCode("");
          onChange?.(value, "");
        }}
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
        onChange={(e) => {
          const value = e.target.value;
          setSelectedPinCode(value);
          onChange?.(selectedCountry, value);
        }}
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