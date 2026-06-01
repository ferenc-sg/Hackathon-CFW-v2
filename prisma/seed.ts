import "dotenv/config";
import { readFileSync } from "fs";
import { join } from "path";
import { PrismaClient } from "@prisma/client";
import {
  CompetencyType,
  CompetencyScope,
  Provenance,
  ExpectationStatus,
  Role,
  TrackName,
  LevellingMethod,
  TodoTrigger,
  GrowthPath,
} from "../lib/enums";

const prisma = new PrismaClient();

// ── Framework content extracted verbatim from the source spreadsheet ─────────
// (scripts/extract_framework.py -> prisma/framework-content.json).
type CompetencyDef = {
  name: string;
  description?: string;
  levels: Record<string, string[]>;
};
type FrameworkContent = {
  levelLabels: Record<string, string>;
  general: CompetencyDef[];
  families: { name: string; sourceSheet: string; displayOrder: number; competencies: CompetencyDef[] }[];
};

const content: FrameworkContent = JSON.parse(
  readFileSync(join(process.cwd(), "prisma", "framework-content.json"), "utf8")
);

// ── Level structure (PRD §System overview). IC1 / IC6 reserved, not seeded. ──
const LEVELS = {
  IC: [
    { code: "IC2", label: "Beginner", order: 1 },
    { code: "IC3", label: "Proficient", order: 2 },
    { code: "IC4", label: "Fully proficient", order: 3 },
    { code: "IC5", label: "Domain expert", order: 4 },
  ],
  M: [
    { code: "M4", label: "Team Lead", order: 1 },
    { code: "M5", label: "Senior Manager", order: 2 },
    { code: "M6", label: "Strategic Leader", order: 3 },
  ],
};

async function wipe() {
  await prisma.selfAssessment.deleteMany();
  await prisma.cycle.deleteMany();
  await prisma.competencyLevelExpectationVersion.deleteMany();
  await prisma.userCompetency.deleteMany();
  await prisma.levellingHistoryRecord.deleteMany();
  await prisma.todoItem.deleteMany();
  await prisma.competencyLevelExpectation.deleteMany();
  await prisma.jobFamilyCompetency.deleteMany();
  await prisma.competency.deleteMany({ where: { provenance: Provenance.BRAND_FORK } });
  await prisma.competency.deleteMany();
  await prisma.user.updateMany({ data: { managerId: null } });
  await prisma.user.deleteMany();
  await prisma.jobFamily.deleteMany();
  await prisma.level.deleteMany();
  await prisma.track.deleteMany();
  await prisma.brand.deleteMany();
}

async function main() {
  console.log("Seeding CFMS from spreadsheet content…");
  await wipe();

  // ── Brands ────────────────────────────────────────────────────────────────
  const central = await prisma.brand.create({ data: { name: "Central saas.group" } });
  const channable = await prisma.brand.create({ data: { name: "Channable" } });
  const tower = await prisma.brand.create({ data: { name: "Tower" } });
  const rendin = await prisma.brand.create({ data: { name: "Rendin" } });

  // ── Tracks + Levels ─────────────────────────────────────────────────────────
  const levelByCode: Record<string, string> = {};
  for (const name of [TrackName.IC, TrackName.M] as const) {
    const track = await prisma.track.create({ data: { name } });
    for (const lvl of LEVELS[name]) {
      const created = await prisma.level.create({
        data: { trackId: track.id, code: lvl.code, label: lvl.label, order: lvl.order },
      });
      levelByCode[lvl.code] = created.id;
    }
  }

  // Primary HR/Admin — stands as the publisher of v1 content versions.
  const ferenc = await prisma.user.create({
    data: { name: "Ferenc Csonka", email: "ferenc@saas.group", brandId: central.id, role: Role.HR_ADMIN },
  });

  // Create a competency + PUBLISHED per-level expectations for the levels that
  // the spreadsheet actually defines for it (general: IC+M; functional: IC).
  async function createCompetency(
    def: CompetencyDef,
    opts: {
      type: string;
      scope: string;
      provenance: string;
      jobFamilyId?: string | null;
      brandId?: string | null;
    }
  ) {
    const comp = await prisma.competency.create({
      data: {
        name: def.name,
        description: def.description ?? null,
        type: opts.type,
        scope: opts.scope,
        provenance: opts.provenance,
        jobFamilyId: opts.jobFamilyId ?? null,
        brandId: opts.brandId ?? null,
      },
    });
    for (const [code, bullets] of Object.entries(def.levels)) {
      if (!levelByCode[code]) continue;
      const cle = await prisma.competencyLevelExpectation.create({
        data: {
          competencyId: comp.id,
          levelId: levelByCode[code],
          bullets,
          status: ExpectationStatus.PUBLISHED,
          version: 1,
        },
      });
      await prisma.competencyLevelExpectationVersion.create({
        data: {
          competencyLevelExpectationId: cle.id,
          version: 1,
          bullets,
          publishedById: ferenc.id,
        },
      });
    }
    return comp;
  }

  // ── General competencies (SHARED_BASELINE, IC + M) ──────────────────────────
  for (const def of content.general) {
    await createCompetency(def, {
      type: CompetencyType.GENERAL,
      scope: CompetencyScope.GLOBAL,
      provenance: Provenance.SHARED_BASELINE,
    });
  }

  // ── Job families + functional competencies (source order preserved) ─────────
  const familyByName: Record<string, string> = {};
  for (const fam of content.families) {
    const family = await prisma.jobFamily.create({
      data: { name: fam.name, displayOrder: fam.displayOrder },
    });
    familyByName[fam.name] = family.id;

    for (let ci = 0; ci < fam.competencies.length; ci++) {
      const comp = await createCompetency(fam.competencies[ci], {
        type: CompetencyType.FUNCTIONAL,
        scope: CompetencyScope.FAMILY,
        provenance: Provenance.SHARED_BASELINE,
        jobFamilyId: family.id,
      });
      await prisma.jobFamilyCompetency.create({
        data: { jobFamilyId: family.id, competencyId: comp.id, displayOrder: ci + 1 },
      });
    }
  }

  // ── Demo users (Module 2) ────────────────────────────────────────────────────
  const mTrackId = (await prisma.track.findFirstOrThrow({ where: { name: TrackName.M } })).id;
  const icTrackId = (await prisma.track.findFirstOrThrow({ where: { name: TrackName.IC } })).id;

  const anna = await prisma.user.create({
    data: { name: "Anna Kovács", email: "anna@saas.group", brandId: central.id, role: Role.HR_ADMIN },
  });

  await prisma.user.create({
    data: {
      name: "Bram de Vries",
      email: "bram@channable.example",
      brandId: channable.id,
      role: Role.BRAND_ADMIN,
      jobFamilyId: familyByName["Engineering"],
    },
  });

  const sofia = await prisma.user.create({
    data: {
      name: "Sofia Almeida",
      email: "sofia@channable.example",
      brandId: channable.id,
      role: Role.MANAGER,
      jobFamilyId: familyByName["Engineering"],
      trackId: mTrackId,
      levelId: levelByCode["M4"],
      growthPath: GrowthPath.ADVANCE_LEVEL,
      growthPathUpdatedAt: new Date(),
    },
  });

  const diego = await prisma.user.create({
    data: {
      name: "Diego Martins",
      email: "diego@channable.example",
      brandId: channable.id,
      role: Role.TEAM_MEMBER,
      jobFamilyId: familyByName["Engineering"],
      managerId: sofia.id,
      trackId: icTrackId,
      levelId: levelByCode["IC3"],
      growthPath: GrowthPath.ADVANCE_LEVEL,
      growthPathUpdatedAt: new Date(),
      devPlanFocusAreas: "Deepen system design skills; lead a cross-squad project.",
      devPlanGapNotes: "Needs more exposure to large-scale architecture decisions.",
      devPlanUpdatedAt: new Date(),
    },
  });

  const yuki = await prisma.user.create({
    data: {
      name: "Yuki Tanaka",
      email: "yuki@channable.example",
      brandId: channable.id,
      role: Role.TEAM_MEMBER,
      jobFamilyId: familyByName["Engineering"],
      managerId: sofia.id,
      trackId: icTrackId,
      levelId: levelByCode["IC2"],
      growthPath: GrowthPath.GROW_IN_LEVEL,
      growthPathUpdatedAt: new Date(),
    },
  });

  const liam = await prisma.user.create({
    data: {
      name: "Liam O'Brien",
      email: "liam@tower.example",
      brandId: tower.id,
      role: Role.MANAGER,
      jobFamilyId: familyByName["Product Management"],
      trackId: mTrackId,
      levelId: levelByCode["M5"],
    },
  });

  const maya = await prisma.user.create({
    data: {
      name: "Maya Singh",
      email: "maya@tower.example",
      brandId: tower.id,
      role: Role.TEAM_MEMBER,
      jobFamilyId: familyByName["Product Management"],
      managerId: liam.id,
      trackId: icTrackId,
      levelId: levelByCode["IC4"],
      growthPath: GrowthPath.BECOME_MANAGER,
      growthPathUpdatedAt: new Date(),
    },
  });

  const nora = await prisma.user.create({
    data: {
      name: "Nora Haavik",
      email: "nora@saas.group",
      brandId: central.id,
      role: Role.MANAGER,
      jobFamilyId: familyByName["Marketing"],
      trackId: mTrackId,
      levelId: levelByCode["M4"],
    },
  });

  const tom = await prisma.user.create({
    data: {
      name: "Tom Becker",
      email: "tom@saas.group",
      brandId: central.id,
      role: Role.TEAM_MEMBER,
      jobFamilyId: familyByName["Marketing"],
      managerId: nora.id,
      trackId: icTrackId,
      levelId: levelByCode["IC3"],
    },
  });

  const eve = await prisma.user.create({
    data: {
      name: "Eve Laar",
      email: "eve@rendin.example",
      brandId: rendin.id,
      role: Role.MANAGER,
      jobFamilyId: familyByName["Sales"],
      trackId: mTrackId,
      levelId: levelByCode["M4"],
    },
  });

  const kristjan = await prisma.user.create({
    data: {
      name: "Kristjan Tamm",
      email: "kristjan@rendin.example",
      brandId: rendin.id,
      role: Role.TEAM_MEMBER,
      jobFamilyId: familyByName["Sales"],
      managerId: eve.id,
      trackId: icTrackId,
      levelId: levelByCode["IC2"],
    },
  });

  const allUsers = [ferenc, anna, sofia, diego, yuki, liam, maya, nora, tom, eve, kristjan];

  // ── Assign competencies via the read contract + onboarding to-dos ───────────
  const { resolveCompetencies } = await import("../lib/readContract");

  for (const u of allUsers) {
    await prisma.todoItem.createMany({
      data: [
        { userId: u.id, title: "Complete career framework onboarding", triggerType: TodoTrigger.ONBOARDING },
        { userId: u.id, title: "Read the framework materials", triggerType: TodoTrigger.ONBOARDING },
        { userId: u.id, title: "Complete self-levelling exercise", triggerType: TodoTrigger.ONBOARDING },
      ],
    });
    if (!u.jobFamilyId) continue;
    const resolved = await resolveCompetencies(u.jobFamilyId, u.brandId);
    const all = [...resolved.generalCompetencies, ...resolved.functionalCompetencies];
    for (const c of all) {
      await prisma.userCompetency.create({
        data: {
          userId: u.id,
          competencyId: c.id,
          assessedLevelId: u.levelId ?? null,
          assessedAt: u.levelId ? new Date() : null,
        },
      });
    }
  }

  const diegoTodos = await prisma.todoItem.findMany({ where: { userId: diego.id } });
  await prisma.todoItem.update({ where: { id: diegoTodos[0].id }, data: { completedAt: new Date(), archivedAt: new Date() } });
  await prisma.todoItem.create({
    data: {
      userId: yuki.id,
      title: "Schedule first 1:1 with your manager about levelling",
      triggerType: TodoTrigger.MANUAL,
      createdById: anna.id,
    },
  });

  // ── Levelling history (append-only) ─────────────────────────────────────────
  await prisma.levellingHistoryRecord.createMany({
    data: [
      { userId: diego.id, cycleLabel: "Q2 2025 — development cycle", trackId: icTrackId, levelId: levelByCode["IC2"], method: LevellingMethod.MANAGER_MANUAL, finalisedById: sofia.id, finalisedAt: new Date("2025-06-15") },
      { userId: diego.id, cycleLabel: "Q4 2025 — performance cycle", trackId: icTrackId, levelId: levelByCode["IC3"], method: LevellingMethod.MANAGER_MANUAL, finalisedById: sofia.id, finalisedAt: new Date("2025-12-10") },
      { userId: maya.id, cycleLabel: "Q4 2025 — performance cycle", trackId: icTrackId, levelId: levelByCode["IC4"], method: LevellingMethod.HR_ADMIN_MANUAL, finalisedById: anna.id, finalisedAt: new Date("2025-12-12") },
    ],
  });

  // ── Active levelling cycle ───────────────────────────────────────────────────
  await prisma.cycle.create({
    data: {
      label: "H1 2026 — Development Cycle",
      startsAt: new Date("2026-01-01"),
      endsAt: new Date("2026-06-30"),
      isActive: true,
    },
  });

  const counts = {
    brands: await prisma.brand.count(),
    levels: await prisma.level.count(),
    jobFamilies: await prisma.jobFamily.count(),
    competencies: await prisma.competency.count(),
    expectations: await prisma.competencyLevelExpectation.count(),
    users: await prisma.user.count(),
    userCompetencies: await prisma.userCompetency.count(),
    cycles: await prisma.cycle.count(),
  };
  console.log("Seed complete:", counts);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
