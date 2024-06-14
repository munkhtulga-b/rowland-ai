import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const token = request.cookies.get("access-token")?.value;
  if (request.nextUrl.pathname.startsWith("/auth")) {
    if (token) {
      return NextResponse.redirect(new URL("/c", request.url));
    }
  }

  // if (request.nextUrl.pathname === "/") {
  //   if (!token) {
  //         return NextResponse.redirect(new URL("/auth/login", request.url));
  //       }
  // }

  // if (request.nextUrl.pathname.startsWith("/chat")) {
  //   if (!token) {
  //     return NextResponse.redirect(new URL("/auth/login", request.url));
  //   }
  // }
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
