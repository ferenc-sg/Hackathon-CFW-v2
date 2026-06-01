import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { prisma } from "@/lib/db";
import { getActor } from "@/lib/session";
import {
  CompetencyType,
  CompetencyScope,
  Provenance,
  ExpectationStatus,
  Role,
} from "@/lib/enums";
import {
  canEditSharedBaseline,
  canEditCompetencyText,
  canPublish,
  canCreateBrandContent,
  canManageJobFamily,
  type Actor,
} from "@/lib/permissions";
import { FrameworkGrid, type GridRow, type GridColumn } from "@/components/library/FrameworkGrid";
import { CellData } from "@/components/library/GridCell";
import { BrandSelect } from "@/components/library/BrandSelect";
import { CreateJobFamilyForm } from "@/components/library/CreateJobFamilyForm";

function toBullets(v: unknown): string[] {
  return Array.isArray(v) ? v.map((x) => String(x)) : [];
}

type ExpWithLevel = {
  id: string;
  bullets: unknown;
  draftBullets: unknown;
  status: string;
  version: number;
  level: { code: string };
};

function buildCells(expectations: ExpWithLevel[], codes: string[]): Record<string, CellData | null> {
  const byCode = new Map<string, ExpWithLevel>();
  for (const e of expectations) byCode.set(e.level.code, e);
  const out: Record<string, CellData | null> = {};
  for (const code of codes) {
    const e = byCode.get(code);
    out[code] = e
      ? {
          id: e.id,
          bullets: toBullets(e.bullets),
          draftBullets: e.draftBullets == null ? null : toBullets(e.draftBullets),
          status: e.status,
          version: e.version,
        }
      : null;
  }
  return out;
}

function editFlags(actor: Actor, provenance: string, brandId: string | null) {
  const canEdit =
    provenance === Provenance.SHARED_BASELINE
      ? canEditSharedBaseline(actor)
      : canEditCompetencyText(actor, brandId);
  return { canEdit, canPub: canPublish(actor, brandId) && (provenance !== Provenance.SHARED_BASELINE || canEditSharedBaseline(actor)) };
}

export default async function LibraryPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string; brand?: string }>;
}) {
  const sp = await searchParams;
  const actor = await getActor();
  if (!actor) return null;

  const families = await prisma.jobFamily.findMany({
    where: { archivedAt: null },
    orderBy: { displayOrder: "asc" },
  });
  const brands = await prisma.brand.findMany({ where: { archivedAt: null }, orderBy: { name: "asc" } });

  const currentBrandId =
    actor.role === Role.BRAND_ADMIN ? actor.brandId : sp.brand || null;
  const currentBrandName = brands.find((b) => b.id === currentBrandId)?.name ?? null;

  const view = sp.view ?? "general-ic";

  const tabs = [
    { key: "general-ic", label: "General (IC)" },
    { key: "general-m", label: "General (Manager)" },
    ...families.map((f) => ({ key: `family-${f.id}`, label: f.name })),
  ];

  let columns: GridColumn[] = [];
  let rows: GridRow[] = [];

  const levels = await prisma.level.findMany({
    include: { track: true },
    orderBy: [{ track: { name: "asc" } }, { order: "asc" }],
  });

  if (view.startsWith("general")) {
    const trackName = view === "general-m" ? "M" : "IC";
    const trackLevels = levels.filter((l) => l.track.name === trackName);
    columns = trackLevels.map((l) => ({ code: l.code, label: l.label, track: l.track.name }));
    const codes = columns.map((c) => c.code);

    const comps = await prisma.competency.findMany({
      where: {
        type: CompetencyType.GENERAL,
        scope: CompetencyScope.GLOBAL,
        archivedAt: null,
        OR: [
          { provenance: Provenance.SHARED_BASELINE },
          ...(currentBrandId ? [{ provenance: Provenance.BRAND_ADDON, brandId: currentBrandId }] : []),
        ],
      },
      include: {
        brand: true,
        expectations: { where: { status: ExpectationStatus.PUBLISHED }, include: { level: true } },
      },
    });

    comps.sort((a, b) => {
      const rank = (p: string) => (p === Provenance.SHARED_BASELINE ? 0 : 1);
      return rank(a.provenance) - rank(b.provenance) || a.name.localeCompare(b.name);
    });

    rows = comps.map((c) => {
      const { canEdit, canPub } = editFlags(actor, c.provenance, c.brandId);
      return {
        competencyId: c.id,
        name: c.name,
        description: c.description,
        provenance: c.provenance,
        brandName: c.brand?.name ?? null,
        canEdit,
        canPublish: canPub,
        isFork: false,
        canFork: false,
        cells: buildCells(c.expectations, codes),
      };
    });
  } else if (view.startsWith("family-")) {
    const familyId = view.slice("family-".length);
    const icLevels = levels.filter((l) => l.track.name === "IC");
    columns = icLevels.map((l) => ({ code: l.code, label: l.label, track: l.track.name }));
    const codes = columns.map((c) => c.code);

    const links = await prisma.jobFamilyCompetency.findMany({
      where: { jobFamilyId: familyId, competency: { archivedAt: null } },
      orderBy: { displayOrder: "asc" },
      include: {
        competency: {
          include: {
            brand: true,
            expectations: { where: { status: ExpectationStatus.PUBLISHED }, include: { level: true } },
          },
        },
      },
    });

    const baselineIds = links.map((l) => l.competencyId);

    const forks = currentBrandId
      ? await prisma.competency.findMany({
          where: {
            provenance: Provenance.BRAND_FORK,
            brandId: currentBrandId,
            forkedFromId: { in: baselineIds },
            archivedAt: null,
          },
          include: {
            brand: true,
            expectations: { where: { status: ExpectationStatus.PUBLISHED }, include: { level: true } },
          },
        })
      : [];
    const forkByBaseline = new Map(forks.map((f) => [f.forkedFromId!, f]));

    for (const link of links) {
      const c = link.competency;
      const fork = forkByBaseline.get(c.id);
      const base = editFlags(actor, c.provenance, c.brandId);
      rows.push({
        competencyId: c.id,
        name: c.name,
        description: c.description,
        provenance: c.provenance,
        brandName: c.brand?.name ?? null,
        canEdit: base.canEdit,
        canPublish: base.canPub,
        isFork: false,
        canFork:
          c.provenance === Provenance.SHARED_BASELINE &&
          !fork &&
          !!currentBrandId &&
          canCreateBrandContent(actor, currentBrandId),
        cells: buildCells(c.expectations, codes),
      });

      if (fork) {
        const ff = editFlags(actor, fork.provenance, fork.brandId);
        rows.push({
          competencyId: fork.id,
          name: fork.name,
          description: fork.description,
          provenance: fork.provenance,
          brandName: fork.brand?.name ?? null,
          canEdit: ff.canEdit,
          canPublish: ff.canPub,
          isFork: true,
          overridesBaselineName: c.name,
          canFork: false,
          cells: buildCells(fork.expectations, codes),
        });
      }
    }
  }

  const showCreateFamily = canManageJobFamily(actor);

  return (
    <div>
      <PageHeader title="Framework Library" subtitle="The structured source of truth for all competency content">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="label">Brand context</span>
            {actor.role === Role.BRAND_ADMIN ? (
              <span className="badge bg-[#EDE9FC] text-[#5B52B0]">{currentBrandName}</span>
            ) : (
              <BrandSelect brands={brands.map((b) => ({ id: b.id, name: b.name }))} value={currentBrandId ?? ""} />
            )}
          </div>
          {showCreateFamily && <CreateJobFamilyForm />}
        </div>
      </PageHeader>

      <div className="p-8">
        <div className="mb-5 flex flex-wrap gap-2">
          {tabs.map((t) => {
            const active = view === t.key;
            const qp = new URLSearchParams();
            qp.set("view", t.key);
            if (currentBrandId && actor.role !== Role.BRAND_ADMIN) qp.set("brand", currentBrandId);
            return (
              <Link
                key={t.key}
                href={`/library?${qp.toString()}`}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  active ? "bg-brand-600 text-white" : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"
                }`}
              >
                {t.label}
              </Link>
            );
          })}
        </div>

        {columns.length === 0 ? (
          <div className="card p-8 text-center text-slate-400">Select a view.</div>
        ) : (
          <FrameworkGrid columns={columns} rows={rows} currentBrandId={currentBrandId} />
        )}

        <p className="mt-4 text-xs text-slate-400">
          Cells show the published per-level bullet array. Shared baseline competencies are locked
          for non-HR/Admin roles. Pending drafts preview before publish.
        </p>
      </div>
    </div>
  );
}
