import { NextRequest, NextResponse } from "next/server";
import { validateCredentials, generateToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const isValid = await validateCredentials(email, password);

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = generateToken(email);

    const response = NextResponse.json(
      { success: true, token, email },
      { status: 200 }
    );

    // Debug log (helpful in Vercel logs when diagnosing auth cookie issues)
    console.log("Auth: setting cookie for", email);

    // Set JWT token in httpOnly cookie. Use `lax` SameSite to avoid some cross-site
    // navigation cases where `strict` may prevent the cookie from being sent.
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
