import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { prisma } from "@/lib/db";
import { getActor } from "@/lib/session";
import { TodoList } from "@/components/profile/TodoList";

export default async function DashboardPage() {
  const actor = await getActor();

  const [brands, families, competencies, users, publishedExpectations] = await Promise.all([
    prisma.brand.count({ where: { archivedAt: null } }),
    prisma.jobFamily.count({ where: { archivedAt: null } }),
    prisma.competency.count({ where: { archivedAt: null } }),
    prisma.user.count({ where: { archivedAt: null } }),
    prisma.competencyLevelExpectation.count({ where: { status: "PUBLISHED" } }),
  ]);

  const me = actor
    ? await prisma.user.findUnique({
        where: { id: actor.id },
        include: {
          brand: true,
          jobFamily: true,
          level: { include: { track: true } },
          todos: { orderBy: { createdAt: "asc" } },
        },
      })
    : null;

  const stats = [
    { label: "Job families", value: families, href: "/library" },
    { label: "Competencies", value: competencies, href: "/library" },
    { label: "Level expectations", value: publishedExpectations, href: "/library" },
    { label: "People", value: users, href: "/people" },
    { label: "Brands", value: brands, href: "/people" },
  ];

  return (
    <div>
      <PageHeader
        title={me ? `Welcome, ${me.name.split(" ")[0]}` : "Dashboard"}
        subtitle="Career Framework Management System — saas.group"
      />
      <div className="space-y-8 p-8">
        <section className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((s) => (
            <Link key={s.label} href={s.href} className="card p-5 transition-shadow hover:shadow-md">
              <div className="text-3xl font-bold text-slate-900">{s.value}</div>
              <div className="mt-1 text-sm text-slate-500">{s.label}</div>
            </Link>
          ))}
        </section>

        <div className="grid gap-6 lg:grid-cols-3">
          {me && (
            <section className="card p-6 lg:col-span-2">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-base font-semibold text-slate-900">My to-dos</h2>
                <Link href={`/people/${me.id}`} className="text-sm font-medium text-brand-600 hover:underline">
                  View my profile →
                </Link>
              </div>
              <TodoList
                todos={me.todos.map((t) => ({
                  id: t.id,
                  title: t.title,
                  triggerType: t.triggerType,
                  completedAt: t.completedAt ? t.completedAt.toISOString() : null,
                }))}
                profileUserId={me.id}
                canComplete
                canAdd={false}
              />
            </section>
          )}

          <section className="card p-6">
            <h2 className="mb-4 text-base font-semibold text-slate-900">My placement</h2>
            {me ? (
              <dl className="space-y-3 text-sm">
                <Row label="Brand" value={me.brand.name} />
                <Row label="Job family" value={me.jobFamily?.name ?? "—"} />
                <Row
                  label="Level"
                  value={me.level ? `${me.level.code} · ${me.level.label}` : "N/A"}
                />
                <Row label="Track" value={me.level?.track.name ?? "—"} />
              </dl>
            ) : (
              <p className="text-sm text-slate-500">No active user.</p>
            )}
            <div className="mt-5 flex flex-col gap-2">
              <Link href="/library" className="btn-secondary w-full">
                Browse the framework
              </Link>
              <Link href="/people" className="btn-secondary w-full">
                View people
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-slate-500">{label}</dt>
      <dd className="font-medium text-slate-900">{value}</dd>
    </div>
  );
}
