import { useState, useEffect } from "react";
import { COUNTRY_PINCODES, COUNTRIES } from "@/constants/countries";

export function useCountryPinCode() {
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [pinCodes, setPinCodes] = useState<string[]>([]);
  const [selectedPinCode, setSelectedPinCode] = useState<string>("");

  useEffect(() => {
    if (!selectedCountry) {
      setPinCodes([]);
      return;
    }

    setPinCodes(COUNTRY_PINCODES[selectedCountry] ?? []);
  }, [selectedCountry]);

  return {
    COUNTRIES,
    selectedCountry,
    setSelectedCountry,
    pinCodes,
    selectedPinCode,
    setSelectedPinCode,
  };
}
