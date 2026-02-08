import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    const { password } = await request.json();

    if (password === process.env.ADMIN_PASSWORD) {
        const response = NextResponse.json({ success: true });

        // In a real app, use a proper session token. 
        // Here we use a simple flag for the demo.
        response.cookies.set("admin_session", "true", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24, // 24 hours
        });

        return response;
    }

    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
}
