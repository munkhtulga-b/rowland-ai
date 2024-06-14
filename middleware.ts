import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const token = request.cookies.get("session")?.value;
  if (request.nextUrl.pathname.startsWith("/auth")) {
    if (token) {
      return NextResponse.redirect(
        new URL("/chat/ecc0f9a9-2d3c-41e8-ab6e-561689af5705", request.url)
      );
    }
  }

  if (
    request.nextUrl.pathname === "/" ||
    request.nextUrl.pathname === "/chat"
  ) {
    return NextResponse.redirect(
      new URL("/chat/ecc0f9a9-2d3c-41e8-ab6e-561689af5705", request.url)
    );
  }

  if (request.nextUrl.pathname.startsWith("/chat")) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
