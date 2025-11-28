import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { contact, otp } = await req.json();

  const laravelRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/otp/verify-otp`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contact, otp })
    }
  );

  const data = await laravelRes.json();

  return NextResponse.json(data, { status: laravelRes.status });
}
