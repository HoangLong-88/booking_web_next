import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
    try {
        const avatar_path = await req.json();

        const auth = req.headers.get("Authorization");
        if (!auth) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const token = auth.replace("Bearer ", "");
        // Forward to Laravel API
        const laravelRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/avatar`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ avatar_path: avatar_path }),
        });

        
        const data = await laravelRes.json();

        if (!laravelRes.ok) {
            return NextResponse.json(data, { status: laravelRes.status });
        }

        return NextResponse.json(data);
    }
    catch (err: unknown) {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}