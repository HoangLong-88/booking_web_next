import { NextResponse, NextRequest } from 'next/server';

const KEYWORDS: string[] = [
  "Hà Nội", "TP.Hồ Chí Minh", "Đà Nẵng", "Hội An", "Hạ Long Bay", 
  "Đà Lạt", "Ninh Bình", "Hà Giang", "Sapa", "Huế", 
  "Nha Trang", "Phú Quốc", "Cần Thơ", "Vũng Tàu", "Phan Thiết"
];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json([]);
  }

  const filtered = KEYWORDS.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return NextResponse.json(filtered.slice(0, 5));
}