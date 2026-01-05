import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try { 

        const auth = req.headers.get("Authorization");
        if (!auth) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const token = auth.replace("Bearer ", "");

        const formData = await req.formData();
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/staff/stays`, {
        method: "POST",
        headers: {"Authorization": `Bearer ${token}`},
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