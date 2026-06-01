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
} from "@/lib/enums";
import {
  canEditSharedBaseline,
  canEditCompetencyText,
  canPublish,
  canManageJobFamily,
  canCreateBrandContent,
  type Actor,
} from "@/lib/permissions";

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
