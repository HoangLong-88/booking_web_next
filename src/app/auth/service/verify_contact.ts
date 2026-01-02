export interface CheckContactResponse {
  success: boolean;
  email_exists: boolean;
  phone_exists: boolean;
}

export async function checkEmailExists(email: string): Promise<CheckContactResponse> {
  if (!email) throw new Error("Email is required");

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/check-email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    throw new Error("Failed to connect API");
  }

  const data: CheckContactResponse = await res.json();
  return data;
}

export async function checkPhoneExists(phone: string): Promise<CheckContactResponse> {
  if (!phone) throw new Error("Phone number is required");

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/check-phone`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone }),
  });

  if (!res.ok) {
    throw new Error("Failed to connect API");
  }

  const data: CheckContactResponse = await res.json();
  return data;
}


