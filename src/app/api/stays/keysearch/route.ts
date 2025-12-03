import { METHODS } from 'http';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json([]);
  }

  try {
    const LaravelRes = await fetch(`
      ${process.env.NEXT_PUBLIC_API_URL}/api/stays/keysearch?q=${encodeURIComponent(query)}`,
      {
        method: "GET",  
        // Nếu API Laravel tự làm CORS:
        cache: "no-store",
      }
    );
    
    if (!LaravelRes.ok) {
      return NextResponse.json(
        { error: "Failed to fetch Laravel API" },
        { status: 500 }
      );
    }
    const data = await LaravelRes.json();
    return NextResponse.json(data.keywords);

  } catch (error) {
    console.error("Error calling Laravel API:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

