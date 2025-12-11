import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const formData = new FormData();
    
    formData.append("_method", "PUT");
    formData.append("locationName", body.locationName);
    formData.append("address", body.address);
    formData.append("country", body.country);
    formData.append("pinCode", body.pinCode);
    formData.append("existing_image_path", body.oldImagePath);

    if (body.image) {
      formData.append("image", body.image);
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/locations/${body.id}`, {
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