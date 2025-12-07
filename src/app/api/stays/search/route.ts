import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const location = searchParams.get("location");
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");

  // Forward tất cả params sang Laravel API
  const backendURL =
    `${process.env.NEXT_PUBLIC_API_URL}/api/stays/search?` + searchParams.toString();

  const response = await fetch(backendURL);
  const data = await response.json();

  return NextResponse.json(data);
}
