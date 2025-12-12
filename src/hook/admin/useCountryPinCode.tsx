import { useState, useEffect } from "react";
import { COUNTRY_PINCODES, COUNTRIES } from "@/constants/countries";

export function useCountryPinCode() {
  const [selectedCountry, setSelectedCountry] = useState<keyof typeof COUNTRY_PINCODES | "">("");
  const [pinCodes, setPinCodes] = useState<string[]>([]);
  const [selectedPinCode, setSelectedPinCode] = useState<string>("");

  useEffect(() => {
    if (!selectedCountry) {
      setPinCodes([]);
      setSelectedPinCode("");
      return;
    }

    // lấy pinCode từ constant
    const codes = COUNTRY_PINCODES[selectedCountry] || [];
    setPinCodes(codes);
    setSelectedPinCode("");
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
