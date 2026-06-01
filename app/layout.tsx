import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { prisma } from "@/lib/db";
import { getActor } from "@/lib/session";

export const metadata: Metadata = {
  title: "CFMS — Career Framework Management System",
  description: "saas.group Career Framework Management System",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const actor = await getActor();

  const users = await prisma.user.findMany({
    where: { archivedAt: null },
    include: { brand: true },
    orderBy: [{ role: "asc" }, { name: "asc" }],
  });

  const userOpts = users.map((u) => ({
    id: u.id,
    name: u.name,
    role: u.role,
    brand: u.brand.name,
  }));

  const actorInfo = actor
    ? (() => {
        const u = users.find((x) => x.id === actor.id);
        return u ? { id: u.id, name: u.name, role: u.role, brand: u.brand.name } : null;
      })()
    : null;

  return (
    <html lang="en">
      <body>
        <div className="flex h-screen overflow-hidden">
          <Sidebar actor={actorInfo} users={userOpts} />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
