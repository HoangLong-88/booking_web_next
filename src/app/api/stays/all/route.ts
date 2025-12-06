import { NextResponse } from "next/server";


export async function GET() {
    try {
        const LaravelRes = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/stays/all`,
            {
                method: 'GET',
                cache: 'no-store'
            }
        );
        if (!LaravelRes.ok) {
            return NextResponse.json(
                { error: "Failed to fetch Laravel API" },
                { status: 500 }
            );
        };
        const data = await LaravelRes.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error calling Laravel API:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    };
}