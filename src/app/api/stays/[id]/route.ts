import { NextRequest, NextResponse } from "next/server";
interface RouteProps {
  params: {
    id: string;
  };
}

export async function GET(
  _req: Request,
  { params }: RouteProps
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { message: "stayID is required" },
        { status: 400 }
      );
    }

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/stays/${id}`,
        {
            method: 'GET',
        }
    );
    const data = await res.json();

    return NextResponse.json(data.data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch stay" },
      { status: 500 }
    );
  }
}
