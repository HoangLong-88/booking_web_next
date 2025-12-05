// app/api/get-file/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const file = req.nextUrl.searchParams.get('file');

  if (!file) {
    return NextResponse.json({ error: 'File is required' }, { status: 400 });
  }
  try {
    const laravelRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/image/${encodeURIComponent(file)}`
    );

    if (!laravelRes.ok) {
      return new NextResponse("File not found", { status: 404 });
    }
    const contentType = laravelRes.headers.get("Content-Type") || "application/octet-stream";
    const arrayBuffer = await laravelRes.arrayBuffer();

      return new NextResponse(arrayBuffer, {
        status: 200,
        headers: {
        "Content-Type": contentType,
    },
  });
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
