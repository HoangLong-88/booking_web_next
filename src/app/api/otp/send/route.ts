import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json(); // read once
    const { contact } = body ?? {};

    if (!contact) {
      return NextResponse.json({ success: false, message: "Missing contact" }, { status: 400 });
    }

    const laravelRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/otp/send-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contact }),
    });

    const text = await laravelRes.text();
    let data;

    if (text && text.trim().length > 0) {
      try {
        data = JSON.parse(text);
      } catch (err) {
        // non-JSON response from backend
        data = { success: false, message: text };
      }
    } else {
      data = { success: laravelRes.ok, message: "Empty response from backend" };
    }

    return NextResponse.json(data, { status: laravelRes.status });
  } catch (err) {
    console.error("OTP proxy error:", err);
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}