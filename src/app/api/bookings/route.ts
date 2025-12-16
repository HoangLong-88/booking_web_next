import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Lấy token user (local trước)
    const token =
      req.cookies.get("token")?.value ||
      req.headers.get("authorization")?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
    }

    const res = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/api/bookings",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      }
    );

    const data = await res.json();

    return NextResponse.json(data, { status: res.status });
  } catch (e) {
    return NextResponse.json(
      { message: "Booking failed" },
      { status: 500 }
    );
  }
}
