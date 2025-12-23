import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { serviceID: string } }
) {
  try {
    const { serviceID } = params;
    const body = await req.json();
    body.serviceID = serviceID;
    const auth = req.headers.get("Authorization");
        if (!auth) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
    const token = auth.replace("Bearer ", "");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/review`,
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
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to submit review" },
      { status: 500 }
    );
  }
}