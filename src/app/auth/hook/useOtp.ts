import { useState } from "react";
import { otpService } from "../service/otp.service";

export function useOtp() {
  const [loading, setLoading] = useState(false);
  const [otpError, setOtpError] = useState<string | null>(null);

  const sendOtp = async (contact: string) => {
    setLoading(true);
    setOtpError(null);

    const res = await otpService.sendOtp(contact);

    setLoading(false);

    if (!res.ok) {
      setOtpError(res.data?.message || "Failed to send OTP");
    }

    return res;
  };

  const verifyOtp = async (contact: string, otp: string) => {
    setLoading(true);
    setOtpError(null);

    const res = await otpService.verifyOtp(contact, otp);

    setLoading(false);

    if (res.ok) {
      return true;
    } else {
      setOtpError("OTP is incorrect");
      return false;
    }
  };

  return {
    loading,
    otpError,
    verifyOtp,
    sendOtp,
  };
}
