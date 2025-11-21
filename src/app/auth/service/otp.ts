export async function sendOtp(contact: string) {
  const res = await fetch("/api/otp/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contact }),
  });

  if (!res.ok) {
    throw new Error("Failed to send OTP");
  }

  return await res.json();
}
