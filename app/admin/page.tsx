import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { prisma } from "@/lib/db";
import { getActor } from "@/lib/session";
import { canViewProfile, canCreateUser, canAdminister, canManageOrg } from "@/lib/permissions";
import { ROLE_LABELS, Role, type Role as RoleT } from "@/lib/enums";
import { RoleBadge } from "@/components/Badges";
import { CreateUserForm } from "@/components/people/CreateUserForm";
import { OrganisationManager } from "@/components/admin/OrganisationManager";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const actor = await getActor();
  const { tab } = await searchParams;
  const activeTab = tab === "organisation" ? "organisation" : "people";

  if (!actor || !canAdminister(actor)) {
    return (
      <div>
        <PageHeader title="Admin" />
        <div className="p-8">
          <div className="card p-8 text-center text-slate-500">
            You do not have access to the Admin area.
          </div>
        </div>
      </div>
    );
  }

  const all = await prisma.user.findMany({
    where: { archivedAt: null },
    include: { brand: true, jobFamily: true, level: { include: { track: true } } },
    orderBy: [{ name: "asc" }],
  });

  const visible = all.filter((u) =>
    canViewProfile(actor, { userId: u.id, brandId: u.brandId, managerId: u.managerId })
  );

  const [brands, families] = await Promise.all([
    prisma.brand.findMany({ where: { archivedAt: null }, orderBy: { name: "asc" } }),
    prisma.jobFamily.findMany({ where: { archivedAt: null }, orderBy: { displayOrder: "asc" } }),
  ]);

  // Only actual managers can be assigned as a new user's manager.
  const managers = all.filter((u) => u.role === Role.MANAGER);

  const showOrg = canManageOrg(actor);
  const brandUserCounts = showOrg
    ? await prisma.user.groupBy({ by: ["brandId"], where: { archivedAt: null }, _count: { _all: true } })
    : [];
  const countByBrand = new Map(brandUserCounts.map((b) => [b.brandId, b._count._all]));

  const tabs = [
    { key: "people", label: "People" },
    ...(showOrg ? [{ key: "organisation", label: "Organisation" }] : []),
  ];

  return (
    <div>
      <PageHeader title="Admin" subtitle="Administer people and the organisation">
        {activeTab === "people" && canCreateUser(actor) && (
          <CreateUserForm
            brands={brands.map((b) => ({ id: b.id, name: b.name }))}
            families={families.map((f) => ({ id: f.id, name: f.name }))}
            managers={managers.map((m) => ({ id: m.id, name: m.name }))}
          />
        )}
      </PageHeader>

      <div className="p-8">
        <div className="mb-5 flex gap-2">
          {tabs.map((t) => (
            <Link
              key={t.key}
              href={`/admin?tab=${t.key}`}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                activeTab === t.key
                  ? "bg-brand-600 text-white"
                  : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"
              }`}
            >
              {t.label}
            </Link>
          ))}
        </div>

        {activeTab === "people" ? (
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
                      <RoleBadge label={ROLE_LABELS[u.role as RoleT] ?? u.role} />
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
                      No profiles accessible.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <OrganisationManager
            brands={brands.map((b) => ({
              id: b.id,
              name: b.name,
              userCount: countByBrand.get(b.id) ?? 0,
            }))}
          />
        )}
      </div>
    </div>
  );
}
