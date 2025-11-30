import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { contact } = await req.json();

    if (!contact) {
      console.log("Missing contact in request!");
      return NextResponse.json({ success: false, message: "Missing contact" }, { status: 400 });
    }
    const laravelRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/otp/send-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({ contact }),
      redirect: "manual",
    });

    // đọc body 1 lần
    const text = await laravelRes.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { success: laravelRes.ok, message: text || "Invalid JSON from backend" };
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return NextResponse.json({ success: false, message: String(err) }, { status: 200 });
  }
}
