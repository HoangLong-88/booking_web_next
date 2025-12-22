import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("images[]") as File[];
    const folder = formData.get("folder") as string;

    if (!files) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }
    const laravelFormData = new FormData();
    files.forEach((file) => {
        laravelFormData.append("images[]", file);
    });
    laravelFormData.append("folder", folder)
    // Forward to Laravel API
    const laravelRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/upload/multiple`, {
      method: "POST",
      body: laravelFormData,
    });

    const data = await laravelRes.json();

    if (!laravelRes.ok) {
      return NextResponse.json(data, { status: laravelRes.status });
    }

    return NextResponse.json(data);
  } catch (err: unknown) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
