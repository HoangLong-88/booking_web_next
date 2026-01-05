import { NextResponse } from "next/server";

export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    if (!id) {
      return NextResponse.json(
        { ok: false, message: "Missing location id" },
        { status: 400 }
      );
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/locations/${id}`,
      { method: "DELETE" }
    );

    if (!res.ok) {
      const error = await res.text();
      return NextResponse.json(
        { ok: false, message: error || "Failed to delete location" },
        { status: res.status }
      );
    }

    return NextResponse.json({ ok: true, message: "Location deleted" });
  } catch (err) {
    return NextResponse.json(
      { ok: false, message: String(err) },
      { status: 500 }
    );
  }
}
