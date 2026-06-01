"use server";

import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
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
  canManageJobFamily,
  canCreateBrandContent,
  type Actor,
} from "@/lib/permissions";

// Functional/custom competencies are defined on the IC levels (per the source
// framework). Ordered.
const FAMILY_LEVEL_CODES = ["IC2", "IC3", "IC4", "IC5"];

async function requireActor() {
  const actor = await getActor();
  if (!actor) throw new Error("No acting user.");
  return actor;
}

function parseBullets(text: string): string[] {
  return text
    .split("\n")
    .map((l) => l.replace(/^[-•*]\s*/, "").trim())
    .filter(Boolean);
}

// Determine whether the actor may edit a competency's content.
function assertCanEdit(actor: Actor, competency: { provenance: string; brandId: string | null }) {
  if (competency.provenance === Provenance.SHARED_BASELINE) {
    if (!canEditSharedBaseline(actor)) throw new Error("Shared baseline is HR/Admin-only (hard block).");
    return;
  }
  if (!canEditCompetencyText(actor, competency.brandId)) {
    throw new Error("Not permitted to edit this competency.");
  }
}

// ── Draft / publish lifecycle (FR16, FR17) ──────────────────────────────────

export async function saveDraft(formData: FormData) {
  const actor = await requireActor();
  const expectationId = String(formData.get("expectationId"));
  const bullets = parseBullets(String(formData.get("bullets") || ""));

  const exp = await prisma.competencyLevelExpectation.findUniqueOrThrow({
    where: { id: expectationId },
    include: { competency: true },
  });
  assertCanEdit(actor, exp.competency);

  await prisma.competencyLevelExpectation.update({
    where: { id: expectationId },
    data: { draftBullets: bullets },
  });
  revalidatePath("/library");
}

export async function discardDraft(formData: FormData) {
  const actor = await requireActor();
  const expectationId = String(formData.get("expectationId"));
  const exp = await prisma.competencyLevelExpectation.findUniqueOrThrow({
    where: { id: expectationId },
    include: { competency: true },
  });
  assertCanEdit(actor, exp.competency);

  await prisma.competencyLevelExpectation.update({
    where: { id: expectationId },
    data: { draftBullets: Prisma.DbNull },
  });
  revalidatePath("/library");
}

export async function publishExpectation(formData: FormData) {
  const actor = await requireActor();
  const expectationId = String(formData.get("expectationId"));
  const exp = await prisma.competencyLevelExpectation.findUniqueOrThrow({
    where: { id: expectationId },
    include: { competency: true },
  });
  if (!canPublish(actor, exp.competency.brandId)) throw new Error("Not permitted to publish.");
  if (exp.competency.provenance === Provenance.SHARED_BASELINE && !canEditSharedBaseline(actor)) {
    throw new Error("Shared baseline is HR/Admin-only.");
  }

  const newBullets = (exp.draftBullets ?? exp.bullets) as unknown;
  const newVersion = exp.version + 1;

  await prisma.$transaction([
    prisma.competencyLevelExpectation.update({
      where: { id: expectationId },
      data: {
        bullets: newBullets as Prisma.InputJsonValue,
        draftBullets: Prisma.DbNull,
        status: ExpectationStatus.PUBLISHED,
        version: newVersion,
      },
    }),
    prisma.competencyLevelExpectationVersion.create({
      data: {
        competencyLevelExpectationId: expectationId,
        version: newVersion,
        bullets: newBullets as any,
        publishedById: actor.id,
      },
    }),
  ]);
  revalidatePath("/library");
}

// ── Job families (FR13) ──────────────────────────────────────────────────────

export async function createJobFamily(formData: FormData) {
  const actor = await requireActor();
  if (!canManageJobFamily(actor)) throw new Error("Only HR/Admin can create job families.");
  const name = String(formData.get("name") || "").trim();
  const description = String(formData.get("description") || "").trim();
  if (!name) throw new Error("Name is required.");

  const max = await prisma.jobFamily.aggregate({ _max: { displayOrder: true } });
  const family = await prisma.jobFamily.create({
    data: {
      name,
      description: description || null,
      displayOrder: (max._max.displayOrder ?? 0) + 1,
    },
  });
  revalidatePath("/library");
  return family.id;
}

export async function archiveJobFamily(formData: FormData) {
  const actor = await requireActor();
  if (!canManageJobFamily(actor)) throw new Error("Only HR/Admin can archive job families.");
  const jobFamilyId = String(formData.get("jobFamilyId"));
  await prisma.jobFamily.update({
    where: { id: jobFamilyId },
    data: { archivedAt: new Date() },
  });
  revalidatePath("/library");
}

// ── Create / edit / publish a competency (FR4, FR14) ────────────────────────

// Create a new competency under a job family, with per-level descriptions.
// "Save draft" keeps it unpublished (hidden from profiles) so it can be resumed;
// "Publish" makes it live in the framework.
export async function createCompetency(formData: FormData) {
  const actor = await requireActor();
  const name = String(formData.get("name") || "").trim();
  const jobFamilyId = String(formData.get("jobFamilyId") || "");
  const description = String(formData.get("description") || "").trim();
  const publish = String(formData.get("publish") || "") === "1";

  if (!name) throw new Error("Competency name is required.");
  if (!jobFamilyId) throw new Error("A job family is required.");

  // Brand admins create content scoped to their brand; HR/Admin creates baseline-scoped.
  const brandId = actor.role === Role.BRAND_ADMIN ? actor.brandId : null;
  if (!canCreateBrandContent(actor, brandId)) throw new Error("Not permitted to create competencies.");

  const comp = await prisma.competency.create({
    data: {
      name,
      description: description || null,
      type: CompetencyType.CUSTOM,
      scope: CompetencyScope.FAMILY,
      provenance: Provenance.CUSTOM,
      jobFamilyId,
      brandId,
    },
  });

  const max = await prisma.jobFamilyCompetency.aggregate({
    where: { jobFamilyId },
    _max: { displayOrder: true },
  });
  await prisma.jobFamilyCompetency.create({
    data: { jobFamilyId, competencyId: comp.id, displayOrder: (max._max.displayOrder ?? 0) + 1 },
  });

  const levels = await prisma.level.findMany({ where: { code: { in: FAMILY_LEVEL_CODES } } });
  for (const lvl of levels) {
    const bullets = parseBullets(String(formData.get(`bullets_${lvl.code}`) || ""));
    const cle = await prisma.competencyLevelExpectation.create({
      data: {
        competencyId: comp.id,
        levelId: lvl.id,
        bullets,
        status: publish ? ExpectationStatus.PUBLISHED : ExpectationStatus.DRAFT,
        version: 1,
      },
    });
    if (publish) {
      await prisma.competencyLevelExpectationVersion.create({
        data: { competencyLevelExpectationId: cle.id, version: 1, bullets, publishedById: actor.id },
      });
    }
  }
  revalidatePath("/library");
  return comp.id;
}

// Update a draft competency in progress (resume editing). Saves per-level
// content; "Publish" flips the whole competency live.
export async function updateCompetency(formData: FormData) {
  const actor = await requireActor();
  const competencyId = String(formData.get("competencyId") || "");
  const name = String(formData.get("name") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const publish = String(formData.get("publish") || "") === "1";
  if (!name) throw new Error("Competency name is required.");

  const comp = await prisma.competency.findUniqueOrThrow({ where: { id: competencyId } });
  assertCanEdit(actor, comp);

  await prisma.competency.update({
    where: { id: competencyId },
    data: { name, description: description || null },
  });

  const levels = await prisma.level.findMany({ where: { code: { in: FAMILY_LEVEL_CODES } } });
  for (const lvl of levels) {
    const bullets = parseBullets(String(formData.get(`bullets_${lvl.code}`) || ""));
    const existing = await prisma.competencyLevelExpectation.findUnique({
      where: { competencyId_levelId: { competencyId, levelId: lvl.id } },
    });
    const status = publish ? ExpectationStatus.PUBLISHED : ExpectationStatus.DRAFT;
    if (existing) {
      await prisma.competencyLevelExpectation.update({
        where: { id: existing.id },
        data: { bullets, draftBullets: Prisma.DbNull, status },
      });
      if (publish) {
        await prisma.competencyLevelExpectationVersion.create({
          data: { competencyLevelExpectationId: existing.id, version: existing.version, bullets, publishedById: actor.id },
        });
      }
    } else {
      const cle = await prisma.competencyLevelExpectation.create({
        data: { competencyId, levelId: lvl.id, bullets, status, version: 1 },
      });
      if (publish) {
        await prisma.competencyLevelExpectationVersion.create({
          data: { competencyLevelExpectationId: cle.id, version: 1, bullets, publishedById: actor.id },
        });
      }
    }
  }
  revalidatePath("/library");
}

// Publish a draft competency (make all its level expectations live).
export async function publishCompetency(formData: FormData) {
  const actor = await requireActor();
  const competencyId = String(formData.get("competencyId") || "");
  const comp = await prisma.competency.findUniqueOrThrow({
    where: { id: competencyId },
    include: { expectations: true },
  });
  assertCanEdit(actor, comp);
  if (!canPublish(actor, comp.brandId)) throw new Error("Not permitted to publish.");

  for (const e of comp.expectations) {
    const bullets = (e.draftBullets ?? e.bullets) as Prisma.InputJsonValue;
    await prisma.competencyLevelExpectation.update({
      where: { id: e.id },
      data: { bullets, draftBullets: Prisma.DbNull, status: ExpectationStatus.PUBLISHED },
    });
    await prisma.competencyLevelExpectationVersion.create({
      data: { competencyLevelExpectationId: e.id, version: e.version, bullets, publishedById: actor.id },
    });
  }
  revalidatePath("/library");
}

// ── Brand fork (FR5, FR8, FR15) ─────────────────────────────────────────────

export async function forkCompetency(formData: FormData) {
  const actor = await requireActor();
  const baselineId = String(formData.get("competencyId"));
  // HR/Admin may fork for a chosen brand; Brand admin forks for their own brand.
  const brandId =
    actor.role === "HR_ADMIN" ? String(formData.get("brandId") || "") : actor.brandId || "";
  if (!brandId) throw new Error("A target brand is required to fork.");
  if (!canCreateBrandContent(actor, brandId)) throw new Error("Not permitted to fork for this brand.");

  const baseline = await prisma.competency.findUniqueOrThrow({
    where: { id: baselineId },
    include: { expectations: true },
  });
  if (baseline.type !== CompetencyType.FUNCTIONAL) throw new Error("Only functional competencies can be forked.");

  // Idempotency: don't create a duplicate fork for the same brand + baseline.
  const existing = await prisma.competency.findFirst({
    where: { provenance: Provenance.BRAND_FORK, brandId, forkedFromId: baselineId, archivedAt: null },
  });
  if (existing) {
    revalidatePath("/library");
    return;
  }

  const fork = await prisma.competency.create({
    data: {
      name: baseline.name,
      description: baseline.description,
      type: CompetencyType.FUNCTIONAL,
      scope: CompetencyScope.FAMILY,
      provenance: Provenance.BRAND_FORK,
      jobFamilyId: baseline.jobFamilyId,
      brandId,
      forkedFromId: baseline.id,
    },
  });
  // Seed the fork's expectations as a published copy of the baseline.
  for (const e of baseline.expectations) {
    await prisma.competencyLevelExpectation.create({
      data: {
        competencyId: fork.id,
        levelId: e.levelId,
        bullets: e.bullets as any,
        status: ExpectationStatus.PUBLISHED,
        version: 1,
      },
    });
  }
  revalidatePath("/library");
}
