import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const id = formData.get("id");
    if (!id) {
      return NextResponse.json(
        { ok: false, message: "Missing location id" },
        { status: 400 }
      );
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/locations/${id}`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json({ ok: false, message: errorData.message || 'Failed to update location' }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json({ ok: true, message: data.message || 'Location updated successfully' });
  } catch (err) {
    return NextResponse.json({ ok: false, message: String(err) }, { status: 500 });
  }
}