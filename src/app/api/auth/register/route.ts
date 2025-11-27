import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const laravelRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    }
  );
  const data = await laravelRes.json();

  return NextResponse.json(data, { status: laravelRes.status });
}
