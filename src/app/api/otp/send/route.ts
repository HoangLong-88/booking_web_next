import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { contact } = body ?? {};

    if (!contact) {
      return NextResponse.json({ success: false, message: "Missing contact" }, { status: 400 });
    }

    const laravelRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/otp/send-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({ contact }),
      redirect: "follow", // quan trọng nếu Laravel redirect HTTP->HTTPS
    });

    let data;
    try {
      data = await laravelRes.json();
    } catch (err) {
      const text = await laravelRes.text();
      data = { success: false, message: text || "Invalid JSON from backend" };
    }

    // luôn return 200 để Next.js route không ném 500
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error("OTP proxy error:", err);
    return NextResponse.json({ success: false, message: String(err) }, { status: 200 });
  }
}
