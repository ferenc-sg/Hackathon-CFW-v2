import { prisma } from "./db";
import { CompetencyType, CompetencyScope, Provenance, ExpectationStatus } from "./enums";

// ─────────────────────────────────────────────────────────────────────────
// Framework Library read contract — PRD §M1.6.4 (FR18).
//
// This is the SINGLE function consuming modules (User Profile, Levelling Flow)
// call to resolve "job family -> competency set". It never exposes raw tables.
// The signature and response shape are FROZEN — any change is a breaking change
// requiring coordinated update across all consumers (PRD §5).
// ─────────────────────────────────────────────────────────────────────────

export type ResolvedExpectation = {
  levelCode: string; // e.g. "IC2"
  levelLabel: string; // e.g. "Beginner"
  bullets: string[]; // ordered array of expectation strings
};

export type ResolvedCompetency = {
  id: string;
  name: string;
  description: string | null;
  provenance: Provenance;
  displayOrder: number;
  expectations: ResolvedExpectation[];
};

export type ResolveResult = {
  generalCompetencies: ResolvedCompetency[];
  functionalCompetencies: ResolvedCompetency[];
};

type ExpectationRow = {
  bullets: unknown;
  level: { code: string; label: string; order: number; track: { name: string } };
};

function asBullets(value: unknown): string[] {
  if (Array.isArray(value)) return value.map((b) => String(b));
  return [];
}

function shapeExpectations(rows: ExpectationRow[]): ResolvedExpectation[] {
  return rows
    .slice()
    .sort((a, b) => {
      // IC track before M track, then by level order within the track.
      if (a.level.track.name !== b.level.track.name) {
        return a.level.track.name === "IC" ? -1 : 1;
      }
      return a.level.order - b.level.order;
    })
    .map((e) => ({
      levelCode: e.level.code,
      levelLabel: e.level.label,
      bullets: asBullets(e.bullets),
    }));
}

/**
 * Resolve the applicable competency set for a job family, with brand forks /
 * add-ons applied where the brand is provided.
 *
 * @param jobFamilyId  the user's job family
 * @param brandId      optional; the user's brand. Always passed by the User
 *                     Profile so brand forks / add-ons are honoured (PRD §3.3).
 */
export async function resolveCompetencies(
  jobFamilyId: string,
  brandId?: string | null
): Promise<ResolveResult> {
  const publishedExpectations = {
    where: { status: ExpectationStatus.PUBLISHED },
    include: { level: { include: { track: true } } },
  } as const;

  // 1. GENERAL competencies (scope GLOBAL). The five SHARED_BASELINE are always
  //    included; BRAND_ADDON general competencies are included when brandId is set.
  const generalRaw = await prisma.competency.findMany({
    where: {
      type: CompetencyType.GENERAL,
      scope: CompetencyScope.GLOBAL,
      archivedAt: null,
      OR: [
        { provenance: Provenance.SHARED_BASELINE },
        ...(brandId
          ? [{ provenance: Provenance.BRAND_ADDON, brandId }]
          : []),
      ],
    },
    include: { expectations: publishedExpectations },
  });

  // General competencies have no JobFamilyCompetency row; order baselines first,
  // then add-ons, each alphabetically for a stable display order.
  const generalCompetencies: ResolvedCompetency[] = generalRaw
    .map((c, idx) => ({
      id: c.id,
      name: c.name,
      description: c.description,
      provenance: c.provenance as Provenance,
      displayOrder:
        (c.provenance === Provenance.SHARED_BASELINE ? 0 : 1000) + idx,
      expectations: shapeExpectations(c.expectations),
    }))
    .sort((a, b) => a.displayOrder - b.displayOrder || a.name.localeCompare(b.name));

  // 2. FUNCTIONAL competencies linked to this job family via JobFamilyCompetency,
  //    ordered by displayOrder.
  const links = await prisma.jobFamilyCompetency.findMany({
    where: { jobFamilyId, competency: { archivedAt: null } },
    orderBy: { displayOrder: "asc" },
    include: { competency: { include: { expectations: publishedExpectations } } },
  });

  // 3. For each functional competency, substitute a brand fork if one exists.
  const functionalCompetencies: ResolvedCompetency[] = [];
  for (const link of links) {
    const baseline = link.competency;
    let chosen = baseline;

    if (brandId) {
      const fork = await prisma.competency.findFirst({
        where: {
          provenance: Provenance.BRAND_FORK,
          brandId,
          forkedFromId: baseline.id,
          archivedAt: null,
        },
        include: { expectations: publishedExpectations },
      });
      if (fork) chosen = fork;
    }

    functionalCompetencies.push({
      id: chosen.id,
      name: chosen.name,
      description: chosen.description,
      provenance: chosen.provenance as Provenance,
      displayOrder: link.displayOrder,
      expectations: shapeExpectations(chosen.expectations),
    });
  }

  // 4. Both IC and M track users in the same family get the same set.
  return { generalCompetencies, functionalCompetencies };
}
