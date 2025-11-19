export interface CheckContactResponse {
  exists: boolean;
}

/**
 * Kiểm tra email đã tồn tại chưa
 */
export async function checkEmailExists(email: string): Promise<CheckContactResponse> {
  if (!email) throw new Error("Email is required");

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/check_email`, {
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

/**
 * Kiểm tra phone đã tồn tại chưa
 */
export async function checkPhoneExists(phone: string): Promise<CheckContactResponse> {
  if (!phone) throw new Error("Phone number is required");

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/check_phone`, {
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
