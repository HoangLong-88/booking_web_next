import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { contact } = await req.json();
    console.log("Next.js received contact:", contact);

    if (!contact) {
      console.log("Missing contact in request!");
      return NextResponse.json({ success: false, message: "Missing contact" }, { status: 400 });
    }

    console.log("Sending request to Laravel with contact:", contact);
    const laravelRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/otp/send-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({ contact }),
      redirect: "follow",
    });

    // đọc body 1 lần
    const text = await laravelRes.text();
    console.log("Raw response from Laravel:", text);

    let data;
    try {
      data = JSON.parse(text);
      console.log("Parsed JSON from Laravel:", data);
    } catch {
      data = { success: laravelRes.ok, message: text || "Invalid JSON from backend" };
      console.log("Fallback data from Laravel:", data);
    }

    console.log("Returning to client:", data);
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error("OTP proxy error:", err);
    return NextResponse.json({ success: false, message: String(err) }, { status: 200 });
  }
}
