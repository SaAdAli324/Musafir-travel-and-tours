import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { password } = await request.json();
    
    const validPassword = process.env.ADMIN_PASSWORD || "musafiradmin2026";

    if (password === validPassword) {
      const response = NextResponse.json({ success: true });
      
      response.cookies.set({
        name: 'admin_session',
        value: 'authenticated',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 // 1 day
      });
      
      return response;
    } else {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
