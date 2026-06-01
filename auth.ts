import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { prisma } from "@/lib/db";

// Full Auth.js instance (Node runtime — may use Prisma). Used by the API route
// handlers, server components, and server actions.
//
// Access policy: a Google account may sign in ONLY if its email matches an
// existing, non-archived User (i.e. the person has been provisioned by an
// HR/Admin). An optional AUTH_ALLOWED_DOMAIN further restricts by email domain.
export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ user, profile }) {
      const email = (profile?.email ?? user?.email ?? "").toLowerCase();
      if (!email) return false;

      const allowedDomain = process.env.AUTH_ALLOWED_DOMAIN?.toLowerCase();
      if (allowedDomain && !email.endsWith(`@${allowedDomain}`)) return false;

      const existing = await prisma.user.findFirst({
        where: { email, archivedAt: null },
        select: { id: true },
      });
      return !!existing;
    },
    async jwt({ token, profile }) {
      if (profile?.email) token.email = profile.email.toLowerCase();
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.email) session.user.email = token.email as string;
      return session;
    },
  },
});
