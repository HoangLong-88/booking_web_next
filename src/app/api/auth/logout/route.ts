import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const auth = req.headers.get("Authorization");

  if (!auth) {
    return NextResponse.json(
      { message: "No token provided" },
      { status: 400 }
    );
  }

  const token = auth.replace("Bearer ", "");

  // Gửi sang Laravel API
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  const data = await res.json();

  return NextResponse.json(data, { status: res.status });
}
