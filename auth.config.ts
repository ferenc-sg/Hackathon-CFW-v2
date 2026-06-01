import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

// Edge-safe Auth.js config (no database access). Used by the middleware to
// verify the session cookie. The real Credentials provider with its DB-backed
// `authorize` lives in auth.ts (Node runtime); the bare provider here just
// satisfies the config shape for the edge instance.
export const authConfig = {
  providers: [Credentials],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: { strategy: "jwt" },
} satisfies NextAuthConfig;
