import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/locations`, {
      method: "GET",
    });

    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json({ ok: false, message: errorData.message || "Failed to fetch locations" }, { status: res.status });
    }

    const data = await res.json();
    console.log('GET /api/admin/locations data:', data);
    return NextResponse.json({ 
      ok: true, 
      locations: data?.original?.data || data?.data || []
    });
  } catch (err) {
    return NextResponse.json({ ok: false, message: String(err) }, { status: 500 });
  }
}