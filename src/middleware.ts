import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const isLoginPage = req.nextUrl.pathname === "/login";

  // Hvis brugeren ikke er logget ind og prøver at tilgå en beskyttet side
  if (!token && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
  }

  return NextResponse.next();
}

// Matcher flere beskyttede sider, hvis nødvendigt
export const config = {
  matcher: ["/dashboard/:path*"], // Beskytter alle undersider af /dashboard
};
