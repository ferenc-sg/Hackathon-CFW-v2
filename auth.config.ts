import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

// Edge-safe Auth.js config (no database access). Used by the middleware and
// extended in auth.ts with the DB-backed sign-in check. The Google provider
// auto-reads AUTH_GOOGLE_ID / AUTH_GOOGLE_SECRET from the environment.
export const authConfig = {
  providers: [Google],
  pages: {
    signIn: "/login",
    error: "/login",
  },
} satisfies NextAuthConfig;
