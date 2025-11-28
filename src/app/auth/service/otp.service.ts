export const otpService = {
  sendOtp: async (contact: string) => {
    const res = await fetch("/api/otp/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contact })
    });

    return {
      ok: res.ok,
      status: res.status,
      data: await res.json()
    };
  },

  verifyOtp: async (contact: string, otp: string) => {
    const res = await fetch("/api/otp/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contact, otp })
    });

    return {
      ok: res.ok,
      status: res.status,
      data: await res.json()
    };
  }
};
