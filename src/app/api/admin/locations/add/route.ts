import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try { 
    const formData = await req.formData();
    console.log(formData)
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/locations`, {
      method: "POST",
      body: formData
    });

    const data = await res.json();

    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    return NextResponse.json(
      { ok: false, message: String(err) },
      { status: 500 }
    );
  }
}
