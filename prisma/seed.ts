import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import {
  GENERAL_COMPETENCIES,
  JOB_FAMILIES,
  ALL_CODES,
  type CompetencyDef,
} from "./seed-content";
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

// ── Level structure (PRD §System overview). IC1 / IC6 are reserved, not seeded.
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
  await prisma.competencyLevelExpectationVersion.deleteMany();
  await prisma.userCompetency.deleteMany();
  await prisma.levellingHistoryRecord.deleteMany();
  await prisma.todoItem.deleteMany();
  await prisma.competencyLevelExpectation.deleteMany();
  await prisma.jobFamilyCompetency.deleteMany();
  // Delete forks first (self-FK), then the rest.
  await prisma.competency.deleteMany({ where: { provenance: Provenance.BRAND_FORK } });
  await prisma.competency.deleteMany();
  // Clear manager self-FK before deleting users.
  await prisma.user.updateMany({ data: { managerId: null } });
  await prisma.user.deleteMany();
  await prisma.jobFamily.deleteMany();
  await prisma.level.deleteMany();
  await prisma.track.deleteMany();
  await prisma.brand.deleteMany();
}

async function main() {
  console.log("Seeding CFMS…");
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

  // A primary HR/Admin created early so it can stand as the publisher of v1
  // content versions.
  const ferenc = await prisma.user.create({
    data: {
      name: "Ferenc Csonka",
      email: "ferenc@saas.group",
      brandId: central.id,
      role: Role.HR_ADMIN,
    },
  });

  // ── Helper: create a competency with per-level PUBLISHED expectations + v1 ──
  async function createCompetency(
    def: CompetencyDef,
    opts: {
      type: string;
      scope: string;
      provenance: string;
      jobFamilyId?: string | null;
      brandId?: string | null;
      forkedFromId?: string | null;
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
        forkedFromId: opts.forkedFromId ?? null,
      },
    });
    for (const code of ALL_CODES) {
      const bullets = def.bullets[code] ?? [];
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

  // ── General competencies (5 SHARED_BASELINE, both tracks) ──────────────────
  for (const def of GENERAL_COMPETENCIES) {
    await createCompetency(def, {
      type: CompetencyType.GENERAL,
      scope: CompetencyScope.GLOBAL,
      provenance: Provenance.SHARED_BASELINE,
    });
  }

  // ── Job families + functional competencies ─────────────────────────────────
  const familyByName: Record<string, string> = {};
  const engineeringCompByName: Record<string, string> = {};
  for (let fi = 0; fi < JOB_FAMILIES.length; fi++) {
    const fam = JOB_FAMILIES[fi];
    const family = await prisma.jobFamily.create({
      data: { name: fam.name, description: fam.description, displayOrder: fi + 1 },
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
      if (fam.name === "Engineering") engineeringCompByName[comp.name] = comp.id;
    }
  }

  // ── Brand examples: a BRAND_FORK and a BRAND_ADDON for Channable ────────────
  // Channable forks "Code Quality & Craft" to tailor its IC4/IC5 expectations.
  const baselineCQ = JOB_FAMILIES.find((f) => f.name === "Engineering")!.competencies.find(
    (c) => c.name === "Code Quality & Craft"
  )!;
  const forkBullets = { ...baselineCQ.bullets } as Record<string, string[]>;
  forkBullets.IC4 = [
    "Owns code quality end-to-end at Channable, including our feed-processing scale.",
    "Champions Channable's automated-testing and review standards.",
  ];
  forkBullets.IC5 = [
    "Sets Channable's engineering craft standard across squads.",
    "Drives quality initiatives spanning the Channable platform.",
  ];
  await createCompetency(
    { name: "Code Quality & Craft", description: baselineCQ.description, bullets: forkBullets },
    {
      type: CompetencyType.FUNCTIONAL,
      scope: CompetencyScope.FAMILY,
      provenance: Provenance.BRAND_FORK,
      jobFamilyId: familyByName["Engineering"],
      brandId: channable.id,
      forkedFromId: engineeringCompByName["Code Quality & Craft"],
    }
  );

  // Channable adds a general competency (add-on) on top of the five shared ones.
  await createCompetency(
    {
      name: "Customer Obsession",
      description: "Channable's brand-specific emphasis on customer outcomes.",
      bullets: {
        IC2: ["Understands who Channable's customers are and what they need."],
        IC3: ["Factors customer impact into day-to-day decisions."],
        IC4: ["Advocates for the customer across the squad."],
        IC5: ["Embeds customer obsession into how the org operates."],
        M4: ["Builds a customer-obsessed team culture."],
        M5: ["Drives customer focus across multiple teams."],
        M6: ["Makes customer obsession a strategic pillar."],
      },
    },
    {
      type: CompetencyType.GENERAL,
      scope: CompetencyScope.GLOBAL,
      provenance: Provenance.BRAND_ADDON,
      brandId: channable.id,
    }
  );

  // ── Demo users ──────────────────────────────────────────────────────────────
  const anna = await prisma.user.create({
    data: { name: "Anna Kovács", email: "anna@saas.group", brandId: central.id, role: Role.HR_ADMIN },
  });

  const bram = await prisma.user.create({
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
      trackId: (await prisma.track.findFirst({ where: { name: TrackName.M } }))!.id,
      levelId: levelByCode["M4"],
      growthPath: GrowthPath.ADVANCE_LEVEL,
      growthPathUpdatedAt: new Date(),
    },
  });

  const icTrackId = (await prisma.track.findFirst({ where: { name: TrackName.IC } }))!.id;

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
      trackId: (await prisma.track.findFirst({ where: { name: TrackName.M } }))!.id,
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
      trackId: (await prisma.track.findFirst({ where: { name: TrackName.M } }))!.id,
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
      trackId: (await prisma.track.findFirst({ where: { name: TrackName.M } }))!.id,
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

  const allUsers = [ferenc, anna, bram, sofia, diego, yuki, liam, maya, nora, tom, eve, kristjan];

  // ── Assign competencies via the read contract + onboarding to-dos ───────────
  const { resolveCompetencies } = await import("../lib/readContract");

  for (const u of allUsers) {
    // Onboarding to-dos (auto-created on registration — PRD §3.7).
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
          // If the user has a finalised level, reflect it as the assessed level.
          assessedLevelId: u.levelId ?? null,
          assessedAt: u.levelId ? new Date() : null,
        },
      });
    }
  }

  // Mark some onboarding to-dos complete for a couple of users.
  const diegoTodos = await prisma.todoItem.findMany({ where: { userId: diego.id } });
  await prisma.todoItem.update({
    where: { id: diegoTodos[0].id },
    data: { completedAt: new Date() },
  });
  // A manual to-do added by HR/Admin.
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
      {
        userId: diego.id,
        cycleLabel: "Q2 2025 — development cycle",
        trackId: icTrackId,
        levelId: levelByCode["IC2"],
        method: LevellingMethod.MANAGER_MANUAL,
        finalisedById: sofia.id,
        finalisedAt: new Date("2025-06-15"),
      },
      {
        userId: diego.id,
        cycleLabel: "Q4 2025 — performance cycle",
        trackId: icTrackId,
        levelId: levelByCode["IC3"],
        method: LevellingMethod.MANAGER_MANUAL,
        finalisedById: sofia.id,
        finalisedAt: new Date("2025-12-10"),
      },
      {
        userId: maya.id,
        cycleLabel: "Q4 2025 — performance cycle",
        trackId: icTrackId,
        levelId: levelByCode["IC4"],
        method: LevellingMethod.HR_ADMIN_MANUAL,
        finalisedById: anna.id,
        finalisedAt: new Date("2025-12-12"),
      },
    ],
  });

  const counts = {
    brands: await prisma.brand.count(),
    tracks: await prisma.track.count(),
    levels: await prisma.level.count(),
    jobFamilies: await prisma.jobFamily.count(),
    competencies: await prisma.competency.count(),
    expectations: await prisma.competencyLevelExpectation.count(),
    users: await prisma.user.count(),
    userCompetencies: await prisma.userCompetency.count(),
    todos: await prisma.todoItem.count(),
    history: await prisma.levellingHistoryRecord.count(),
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
