import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { prisma } from "@/lib/db";
import { getActor } from "@/lib/session";
import {
  canViewProfile,
  canEditIdentity,
  canSetLevel,
  canEditGrowthPath,
  canEditDevPlan,
  canAddTodo,
  canCompleteTodo,
  type ProfileTarget,
} from "@/lib/permissions";
import {
  ROLE_LABELS,
  GROWTH_PATH_LABELS,
  LEVELLING_METHOD_LABELS,
  CompetencyType,
  type Role,
} from "@/lib/enums";
import { ProvenanceBadge, RoleBadge } from "@/components/Badges";
import { TodoList } from "@/components/profile/TodoList";
import {
  setLevel,
  setAssessedLevel,
  setGrowthPath,
  saveDevPlan,
  changeJobFamily,
} from "@/app/actions/profile";

function fmtDate(d: Date | null | undefined) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export default async function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const actor = await getActor();

  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      brand: true,
      manager: true,
      jobFamily: true,
      level: { include: { track: true } },
      track: true,
      competencies: {
        where: { archivedAt: null },
        include: {
          competency: true,
          assessedLevel: { include: { track: true } },
        },
      },
      todos: { orderBy: { createdAt: "asc" } },
      levellingHistory: {
        include: { track: true, level: true, finalisedBy: true },
        orderBy: { finalisedAt: "desc" },
      },
    },
  });

  if (!user) notFound();

  const target: ProfileTarget = { userId: user.id, brandId: user.brandId, managerId: user.managerId };
  if (!actor || !canViewProfile(actor, target)) {
    return (
      <div>
        <PageHeader title="Profile" />
        <div className="p-8">
          <div className="card p-8 text-center text-slate-500">
            You do not have permission to view this profile.
          </div>
        </div>
      </div>
    );
  }

  const perms = {
    editIdentity: canEditIdentity(actor, target),
    setLevel: canSetLevel(actor, target),
    editGrowth: canEditGrowthPath(actor, target),
    editDevPlan: canEditDevPlan(actor, target),
    addTodo: canAddTodo(actor, target),
    completeTodo: canCompleteTodo(actor, target),
  };

  const [levels, families] = await Promise.all([
    prisma.level.findMany({ include: { track: true }, orderBy: [{ track: { name: "asc" } }, { order: "asc" }] }),
    prisma.jobFamily.findMany({ where: { archivedAt: null }, orderBy: { displayOrder: "asc" } }),
  ]);

  const general = user.competencies.filter((c) => c.competency.type === CompetencyType.GENERAL);
  const functional = user.competencies.filter((c) => c.competency.type !== CompetencyType.GENERAL);

  return (
    <div>
      <PageHeader title={user.name} subtitle={user.email}>
        <Link href="/people" className="btn-ghost">
          ← All people
        </Link>
      </PageHeader>

      <div className="grid gap-6 p-8 lg:grid-cols-3">
        {/* Left column */}
        <div className="space-y-6 lg:col-span-2">
          {/* Competencies */}
          <section className="card p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-semibold text-slate-900">Competencies</h2>
              <span className="text-xs text-slate-400">Assessed levels from the latest levelling</span>
            </div>

            <CompetencyGroup
              title="General competencies"
              hint="Apply to all users regardless of job family"
              rows={general}
              levels={levels}
              canEdit={perms.setLevel}
            />
            <div className="my-5 border-t border-dashed border-slate-200" />
            <CompetencyGroup
              title="Functional competencies"
              hint={user.jobFamily ? `${user.jobFamily.name} — resolved from the Library` : "Set a job family to resolve"}
              rows={functional}
              levels={levels}
              canEdit={perms.setLevel}
            />
          </section>

          {/* Growth path + Development plan */}
          <div className="grid gap-6 sm:grid-cols-2">
            <section className="card p-6">
              <h2 className="mb-3 text-base font-semibold text-slate-900">Growth path</h2>
              {perms.editGrowth ? (
                <form action={setGrowthPath} className="space-y-2">
                  <input type="hidden" name="userId" value={user.id} />
                  <select name="growthPath" defaultValue={user.growthPath ?? ""} className="input">
                    <option value="">— not set —</option>
                    {Object.entries(GROWTH_PATH_LABELS).map(([k, v]) => (
                      <option key={k} value={k}>
                        {v}
                      </option>
                    ))}
                  </select>
                  <button className="btn-secondary w-full">Save growth path</button>
                </form>
              ) : (
                <p className="text-sm text-slate-700">
                  {user.growthPath ? GROWTH_PATH_LABELS[user.growthPath as keyof typeof GROWTH_PATH_LABELS] : "Not set"}
                </p>
              )}
              <p className="mt-3 text-xs text-slate-400">Last updated: {fmtDate(user.growthPathUpdatedAt)}</p>
            </section>

            <section className="card p-6">
              <h2 className="mb-3 text-base font-semibold text-slate-900">Development plan</h2>
              {perms.editDevPlan ? (
                <form action={saveDevPlan} className="space-y-3">
                  <input type="hidden" name="userId" value={user.id} />
                  <div>
                    <label className="label">Focus areas</label>
                    <textarea name="focusAreas" rows={3} defaultValue={user.devPlanFocusAreas ?? ""} className="input mt-1" />
                  </div>
                  <div>
                    <label className="label">Gap notes</label>
                    <textarea name="gapNotes" rows={2} defaultValue={user.devPlanGapNotes ?? ""} className="input mt-1" />
                  </div>
                  <button className="btn-secondary w-full">Save plan</button>
                </form>
              ) : (
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="label">Focus areas</div>
                    <p className="mt-1 whitespace-pre-wrap text-slate-700">{user.devPlanFocusAreas || "—"}</p>
                  </div>
                  <div>
                    <div className="label">Gap notes</div>
                    <p className="mt-1 whitespace-pre-wrap text-slate-700">{user.devPlanGapNotes || "—"}</p>
                  </div>
                </div>
              )}
              <p className="mt-3 text-xs text-slate-400">Last updated: {fmtDate(user.devPlanUpdatedAt)}</p>
            </section>
          </div>

          {/* Levelling history */}
          <section className="card p-6">
            <h2 className="mb-1 text-base font-semibold text-slate-900">Levelling history</h2>
            <p className="mb-4 text-xs text-slate-400">Append-only · immutable for all roles</p>
            {user.levellingHistory.length === 0 ? (
              <p className="text-sm text-slate-400">No levelling events yet.</p>
            ) : (
              <table className="w-full text-sm">
                <thead className="text-left text-xs uppercase tracking-wide text-slate-400">
                  <tr>
                    <th className="py-2 font-medium">Date</th>
                    <th className="py-2 font-medium">Cycle</th>
                    <th className="py-2 font-medium">Track</th>
                    <th className="py-2 font-medium">Level</th>
                    <th className="py-2 font-medium">Method</th>
                    <th className="py-2 font-medium">Finalised by</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {user.levellingHistory.map((h) => (
                    <tr key={h.id}>
                      <td className="py-2 text-slate-600">{fmtDate(h.finalisedAt)}</td>
                      <td className="py-2 text-slate-600">{h.cycleLabel}</td>
                      <td className="py-2 text-slate-600">{h.track.name}</td>
                      <td className="py-2 font-medium text-slate-800">{h.level.code}</td>
                      <td className="py-2 text-slate-600">{LEVELLING_METHOD_LABELS[h.method as keyof typeof LEVELLING_METHOD_LABELS] ?? h.method}</td>
                      <td className="py-2 text-slate-600">{h.finalisedBy.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Identity */}
          <section className="card p-6">
            <h2 className="mb-4 text-base font-semibold text-slate-900">Identity</h2>
            <dl className="space-y-3 text-sm">
              <Field label="Name" value={user.name} />
              <Field label="Email" value={user.email} />
              <Field label="Brand / Team" value={user.brand.name} />
              <Field label="Manager" value={user.manager?.name ?? "—"} />
              <div>
                <dt className="label">Permission level</dt>
                <dd className="mt-1">
                  <RoleBadge label={ROLE_LABELS[user.role as Role] ?? user.role} />
                </dd>
              </div>
            </dl>
          </section>

          {/* Role & level */}
          <section className="card p-6">
            <h2 className="mb-4 text-base font-semibold text-slate-900">Role &amp; level</h2>

            <div className="space-y-4 text-sm">
              <div>
                <div className="label">Job family</div>
                {perms.editIdentity ? (
                  <form action={changeJobFamily} className="mt-1 space-y-2">
                    <input type="hidden" name="userId" value={user.id} />
                    <select name="jobFamilyId" defaultValue={user.jobFamilyId ?? ""} className="input">
                      <option value="">— none —</option>
                      {families.map((f) => (
                        <option key={f.id} value={f.id}>
                          {f.name}
                        </option>
                      ))}
                    </select>
                    <button className="btn-secondary w-full">Update job family</button>
                    <p className="text-xs text-slate-400">
                      Changing job family re-resolves competencies; removed ones are archived.
                    </p>
                  </form>
                ) : (
                  <p className="mt-1 text-slate-700">{user.jobFamily?.name ?? "—"}</p>
                )}
              </div>

              <Field label="Track" value={user.track?.name ?? "—"} />

              <div>
                <div className="label">Level</div>
                {perms.setLevel ? (
                  <form action={setLevel} className="mt-1 space-y-2">
                    <input type="hidden" name="userId" value={user.id} />
                    <select name="levelId" defaultValue={user.levelId ?? ""} className="input" required>
                      <option value="" disabled>
                        Select level…
                      </option>
                      {levels.map((l) => (
                        <option key={l.id} value={l.id}>
                          {l.code} · {l.label} ({l.track.name})
                        </option>
                      ))}
                    </select>
                    <input
                      name="cycleLabel"
                      placeholder="Cycle label, e.g. Q2 2026 — development cycle"
                      className="input"
                    />
                    <button className="btn-primary w-full">Set level &amp; record history</button>
                  </form>
                ) : (
                  <p className="mt-1 font-medium text-slate-800">
                    {user.level ? `${user.level.code} · ${user.level.label}` : "N/A"}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* To-dos */}
          <section className="card p-6">
            <h2 className="mb-4 text-base font-semibold text-slate-900">To-do list</h2>
            <TodoList
              todos={user.todos.map((t) => ({
                id: t.id,
                title: t.title,
                triggerType: t.triggerType,
                completedAt: t.completedAt ? t.completedAt.toISOString() : null,
              }))}
              profileUserId={user.id}
              canComplete={perms.completeTodo}
              canAdd={perms.addTodo}
            />
          </section>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="label">{label}</dt>
      <dd className="mt-0.5 text-slate-800">{value}</dd>
    </div>
  );
}

type CompRow = {
  id: string;
  competency: { name: string; provenance: string; description: string | null };
  assessedLevel: { code: string; label: string } | null;
  assessedAt: Date | null;
};

function CompetencyGroup({
  title,
  hint,
  rows,
  levels,
  canEdit,
}: {
  title: string;
  hint: string;
  rows: CompRow[];
  levels: { id: string; code: string; label: string; track: { name: string } }[];
  canEdit: boolean;
}) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <h3 className="text-sm font-semibold text-slate-700">{title}</h3>
        <span className="text-xs text-slate-400">{hint}</span>
      </div>
      {rows.length === 0 ? (
        <p className="text-sm text-slate-400">None assigned.</p>
      ) : (
        <ul className="divide-y divide-slate-100">
          {rows.map((r) => (
            <li key={r.id} className="flex items-center gap-3 py-2.5">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="truncate text-sm font-medium text-slate-800">{r.competency.name}</span>
                  <ProvenanceBadge provenance={r.competency.provenance} />
                </div>
                <div className="text-xs text-slate-400">Last assessed: {fmtDate(r.assessedAt)}</div>
              </div>
              {canEdit ? (
                <form action={setAssessedLevel} className="flex items-center gap-1.5">
                  <input type="hidden" name="userCompetencyId" value={r.id} />
                  <select name="levelId" defaultValue={r.assessedLevel ? findLevelId(levels, r.assessedLevel.code) : ""} className="input !w-auto py-1 text-xs">
                    <option value="">N/A</option>
                    {levels.map((l) => (
                      <option key={l.id} value={l.id}>
                        {l.code}
                      </option>
                    ))}
                  </select>
                  <button className="btn-ghost px-2 py-1 text-xs">Save</button>
                </form>
              ) : (
                <span className="text-sm font-semibold text-slate-700">
                  {r.assessedLevel ? r.assessedLevel.code : <span className="text-slate-400">N/A</span>}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function findLevelId(
  levels: { id: string; code: string }[],
  code: string
): string {
  return levels.find((l) => l.code === code)?.id ?? "";
}
