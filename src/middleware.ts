import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/admin"];

// Middleware runs in the Edge runtime where Node libraries like jsonwebtoken
// are not available. Only check for the presence of the auth-token cookie here.
// Full JWT verification happens in server-side API routes which use Node runtime.
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the route needs protection
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const token = request.cookies.get("auth-token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
