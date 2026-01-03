import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  // const backendURL =
  //   `${process.env.NEXT_PUBLIC_API_URL}/api/stays/search?` + searchParams.toString();
  const backendURL = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/stays/search`);
  backendURL.search = searchParams.toString();

  try {
    const response = await fetch(backendURL.toString(),{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return NextResponse.json(data);
  }catch(error){
      return NextResponse.json({error: 'Failed to fetch API from BE'},{status: 500});
  }
}
