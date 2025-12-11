import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // TODO: persist to DB. For now return success.
    console.log("Locations received:", body.locations);
    return NextResponse.json({ ok: true, message: "Locations saved (mock)" });
  } catch (err) {
    return NextResponse.json({ ok: false, message: String(err) }, { status: 500 });
  }
}