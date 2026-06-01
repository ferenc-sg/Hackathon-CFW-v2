import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { prisma } from "@/lib/db";
import { getActor } from "@/lib/session";
import { canViewProfile, canCreateUser } from "@/lib/permissions";
import { ROLE_LABELS, type Role } from "@/lib/enums";
import { RoleBadge } from "@/components/Badges";
import { CreateUserForm } from "@/components/people/CreateUserForm";

export default async function PeoplePage() {
  const actor = await getActor();

  const all = await prisma.user.findMany({
    where: { archivedAt: null },
    include: { brand: true, jobFamily: true, level: { include: { track: true } } },
    orderBy: [{ name: "asc" }],
  });

  const visible = actor
    ? all.filter((u) =>
        canViewProfile(actor, { userId: u.id, brandId: u.brandId, managerId: u.managerId })
      )
    : [];

  const showCreate = actor ? canCreateUser(actor) : false;
  const [brands, families] = await Promise.all([
    prisma.brand.findMany({ where: { archivedAt: null }, orderBy: { name: "asc" } }),
    prisma.jobFamily.findMany({ where: { archivedAt: null }, orderBy: { displayOrder: "asc" } }),
  ]);

  return (
    <div>
      <PageHeader title="People" subtitle={`${visible.length} profile${visible.length === 1 ? "" : "s"} you can access`}>
        {showCreate && (
          <CreateUserForm
            brands={brands.map((b) => ({ id: b.id, name: b.name }))}
            families={families.map((f) => ({ id: f.id, name: f.name }))}
            managers={all.map((u) => ({ id: u.id, name: u.name }))}
          />
        )}
      </PageHeader>

      <div className="p-8">
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Brand</th>
                <th className="px-5 py-3 font-medium">Job family</th>
                <th className="px-5 py-3 font-medium">Role</th>
                <th className="px-5 py-3 font-medium">Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {visible.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50">
                  <td className="px-5 py-3">
                    <Link href={`/people/${u.id}`} className="font-medium text-[#7B6FCC] hover:underline">
                      {u.name}
                    </Link>
                    <div className="text-xs text-slate-400">{u.email}</div>
                  </td>
                  <td className="px-5 py-3 text-slate-600">{u.brand.name}</td>
                  <td className="px-5 py-3 text-slate-600">{u.jobFamily?.name ?? "—"}</td>
                  <td className="px-5 py-3">
                    <RoleBadge label={ROLE_LABELS[u.role as Role] ?? u.role} />
                  </td>
                  <td className="px-5 py-3">
                    {u.level ? (
                      <span className="font-medium text-slate-700">{u.level.code}</span>
                    ) : (
                      <span className="text-slate-400">N/A</span>
                    )}
                  </td>
                </tr>
              ))}
              {visible.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-10 text-center text-slate-400">
                    No profiles accessible with the current role.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
