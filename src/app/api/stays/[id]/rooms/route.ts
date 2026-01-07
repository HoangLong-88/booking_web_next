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

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/stays/${id}/rooms`,
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
