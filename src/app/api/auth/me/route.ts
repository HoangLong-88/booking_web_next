import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const auth = req.headers.get("Authorization");

    if (!auth) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const token = auth.replace("Bearer ", "");

    const laravelRes = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/api/auth/me",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const text = await laravelRes.text();

    try {
      const data = JSON.parse(text);
      return NextResponse.json(data);
    } catch {
      console.error("Laravel returned invalid JSON:", text);
      return NextResponse.json(
        { user: null, error: "Invalid JSON from Laravel" },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error("API /auth/me failed:", err);

    return NextResponse.json(
      { user: null, error: "Internal server error" },
      { status: 500 }
    );
  }
}
