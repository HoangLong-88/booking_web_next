import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { reviewID: string } }
) {
  try {
    const { reviewID } = params;

    const auth = req.headers.get("Authorization");
        if (!auth) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
    const token = auth.replace("Bearer ", "");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/review/${reviewID}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete review" },
      { status: 500 }
    );
  }
}