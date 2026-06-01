import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "./auth.config";

// Build an edge-safe Auth.js instance from the DB-free config for route gating.
const { auth } = NextAuth(authConfig);

// AUTH_DEV_BYPASS skips authentication entirely — intended for LOCAL DEVELOPMENT
// ONLY. Never enable it in a deployed/published environment. (Read at build time
// for the edge bundle.)
const devBypass = process.env.AUTH_DEV_BYPASS === "true";

export default auth((req) => {
  if (devBypass) return NextResponse.next();

  const isLoggedIn = !!req.auth;
  const path = req.nextUrl.pathname;

  // The login page is always reachable.
  if (path.startsWith("/login")) return NextResponse.next();

  // Everything else requires an authenticated session.
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
  }
  return NextResponse.next();
});

export const config = {
  // Run on everything except Next internals, the auth API, and static assets.
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
};
