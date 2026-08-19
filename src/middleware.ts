import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isOnBookingPage = req.nextUrl.pathname.startsWith("/booking");

  if (isOnBookingPage && !isLoggedIn) {
    // Redirect unauthenticated requests to landing page with auto-login modal query param
    const redirectUrl = new URL("/", req.nextUrl.origin);
    redirectUrl.searchParams.set("login", "1");
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/booking", "/booking/:path*"],
};
