export const otpService = {
   sendOtp: async (contact: string) => {
    const res = await fetch("/api/otp/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contact }),
    });

    const text = await res.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { message: text || "Invalid JSON from backend" };
    }

    return {
      ok: res.ok,
      status: res.status,
      data, // ← parsed
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
