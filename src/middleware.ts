// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;

    if (path.startsWith("/api")) {
        return NextResponse.next();
    }

    const token = req.cookies.get("session_token")?.value;

    const isAdminPage = path.startsWith("/admin");
    const isStaffPage = path.startsWith("/staff");

    if (!token && (isAdminPage || isStaffPage)) {
        return NextResponse.redirect(new URL("/403", req.url));
    }

    const baseUrl = req.nextUrl.origin;

    const res = await fetch(`${baseUrl}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
        method: "GET",
    });

    const data = await res.json();
    const role = data.user?.role;


    if (path.startsWith("/admin") && (role !== "admin")) {
        return NextResponse.redirect(new URL("/403", req.url));
    }

    if (path.startsWith("/staff") && role !== "staff" && role !== "admin") {
        return NextResponse.redirect(new URL("/403", req.url));
    }

    return NextResponse.next();
}

