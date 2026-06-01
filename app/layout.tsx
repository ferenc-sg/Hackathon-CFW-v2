import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { prisma } from "@/lib/db";
import { getActorUser, getSelfUser } from "@/lib/session";
import { Role } from "@/lib/enums";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "CFMS — Career Framework Management System",
  description: "saas.group Career Framework Management System",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const self = await getSelfUser();

  // Unauthenticated (e.g. the /login page): render full-bleed, no app chrome.
  if (!self) {
    return (
      <html lang="en">
        <body>{children}</body>
      </html>
    );
  }

  const actor = await getActorUser();
  const canImpersonate = self.role === Role.HR_ADMIN;
  const impersonating = !!actor && actor.id !== self.id;

  // The "act as" switcher only needs the user list for HR/Admins.
  const users = canImpersonate
    ? await prisma.user.findMany({
        where: { archivedAt: null },
        include: { brand: true },
        orderBy: [{ role: "asc" }, { name: "asc" }],
      })
    : [];

  const userOpts = users.map((u) => ({
    id: u.id,
    name: u.name,
    role: u.role,
    brand: u.brand.name,
  }));

  const actorBrand = actor
    ? (await prisma.brand.findUnique({ where: { id: actor.brandId } }))?.name ?? ""
    : "";

  const actorInfo = actor
    ? { id: actor.id, name: actor.name, role: actor.role, brand: actorBrand }
    : null;

  return (
    <html lang="en" className={inter.variable}>
      <body>
        <div className="flex h-screen overflow-hidden">
          <Sidebar
            actor={actorInfo}
            selfId={self.id}
            users={userOpts}
            canImpersonate={canImpersonate}
            impersonating={impersonating}
          />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
