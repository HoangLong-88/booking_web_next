import { NextResponse } from "next/server";

interface RouteProps {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  _req: Request,
  { params }: RouteProps
) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { message: "stayID is required" },
        { status: 400 }
      );
    }
    const { searchParams } = new URL(_req.url);
    const checkIn = searchParams.get("check_in");
    const checkOut = searchParams.get("check_out");

    if (!checkIn || !checkOut) {
      return NextResponse.json(
        { message: "checkIn & checkOut are required" },
        { status: 400 }
      );
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/stays/${id}/rooms/available?check_in=${checkIn}&check_out=${checkOut}`,
      { method: "GET" }
    );

    
    if (!res.ok) {
      throw new Error("Backend error");
    }

    const data = await res.json();

    return NextResponse.json(data.data, { status: 200 });
  } catch (error) {
    console.error("GET rooms error:", error);

    return NextResponse.json(
      { message: "Failed to fetch rooms" },
      { status: 500 }
    );
  }
}
