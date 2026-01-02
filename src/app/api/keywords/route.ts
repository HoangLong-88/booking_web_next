import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') || '';

  try {
    // Gọi sang Laravel (Sửa URL theo môi trường của bạn)
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/keywords?q=${encodeURIComponent(q)}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    const data = await response.json();
    
    // Vì Laravel trả về trực tiếp mảng [ "Hà Nội", "Đà Nẵng" ] 
    // nên ta trả trực tiếp về cho frontend
    return NextResponse.json(data);
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json([], { status: 500 });
  }
}