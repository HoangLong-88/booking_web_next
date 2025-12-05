import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }
    const laravelFormData = new FormData();
    laravelFormData.append("image", file);
    // Forward to Laravel API
    const laravelRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/upload`, {
      method: "POST",
      body: laravelFormData,
    });

    console.log("Laravel Response Status:", laravelRes.status);
    const data = await laravelRes.json();

    if (!laravelRes.ok) {
      return NextResponse.json(data, { status: laravelRes.status });
    }

    return NextResponse.json(data);
  } catch (err: unknown) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
