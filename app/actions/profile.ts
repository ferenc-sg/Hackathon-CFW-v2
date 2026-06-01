"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { getActor } from "@/lib/session";
import { resolveCompetencies } from "@/lib/readContract";
import { hashPassword } from "@/lib/password";
import {
  Role,
  LevellingMethod,
  TodoTrigger,
  GrowthPath,
  type GrowthPath as GrowthPathT,
} from "@/lib/enums";
import {
  canSetLevel,
  canEditGrowthPath,
  canEditDevPlan,
  canAddTodo,
  canCompleteTodo,
  canCreateUser,
  canEditIdentity,
  type ProfileTarget,
} from "@/lib/permissions";

async function requireActor() {
  const actor = await getActor();
  if (!actor) throw new Error("No acting user.");
  return actor;
}

async function profileTarget(userId: string): Promise<ProfileTarget> {
  const u = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
    select: { id: true, brandId: true, managerId: true },
  });
  return { userId: u.id, brandId: u.brandId, managerId: u.managerId };
}

// ── Levels + levelling history ──────────────────────────────────────────────

export async function setLevel(formData: FormData) {
  const actor = await requireActor();
  const userId = String(formData.get("userId"));
  const levelId = String(formData.get("levelId"));
  const cycleLabel = String(formData.get("cycleLabel") || "Manual level update").trim();

  const target = await profileTarget(userId);
  if (!canSetLevel(actor, target)) throw new Error("Not permitted to set this level.");

  const level = await prisma.level.findUniqueOrThrow({ where: { id: levelId } });

  const method =
    actor.role === Role.MANAGER ? LevellingMethod.MANAGER_MANUAL : LevellingMethod.HR_ADMIN_MANUAL;

  await prisma.$transaction([
    prisma.user.update({
      where: { id: userId },
      data: { levelId: level.id, trackId: level.trackId },
    }),
    prisma.levellingHistoryRecord.create({
      data: {
        userId,
        cycleLabel,
        trackId: level.trackId,
        levelId: level.id,
        method,
        finalisedById: actor.id,
      },
    }),
  ]);

  revalidatePath(`/people/${userId}`);
}

export async function setAssessedLevel(formData: FormData) {
  const actor = await requireActor();
  const userCompetencyId = String(formData.get("userCompetencyId"));
  const levelIdRaw = String(formData.get("levelId") || "");

  const uc = await prisma.userCompetency.findUniqueOrThrow({ where: { id: userCompetencyId } });
  const target = await profileTarget(uc.userId);
  if (!canSetLevel(actor, target)) throw new Error("Not permitted to edit assessments.");

  await prisma.userCompetency.update({
    where: { id: userCompetencyId },
    data: levelIdRaw
      ? { assessedLevelId: levelIdRaw, assessedAt: new Date() }
      : { assessedLevelId: null, assessedAt: null },
  });
  revalidatePath(`/people/${uc.userId}`);
}

// ── Growth path ──────────────────────────────────────────────────────────────

export async function setGrowthPath(formData: FormData) {
  const actor = await requireActor();
  const userId = String(formData.get("userId"));
  const growthPath = String(formData.get("growthPath") || "");
  const target = await profileTarget(userId);
  if (!canEditGrowthPath(actor, target)) throw new Error("Not permitted to edit growth path.");

  const valid = growthPath === "" || growthPath in GrowthPath;
  if (!valid) throw new Error("Invalid growth path.");

  await prisma.user.update({
    where: { id: userId },
    data: {
      growthPath: growthPath ? (growthPath as GrowthPathT) : null,
      growthPathUpdatedAt: new Date(),
    },
  });
  revalidatePath(`/people/${userId}`);
}

// ── Development plan ──────────────────────────────────────────────────────────

export async function saveDevPlan(formData: FormData) {
  const actor = await requireActor();
  const userId = String(formData.get("userId"));
  const focusAreas = String(formData.get("focusAreas") || "");
  const gapNotes = String(formData.get("gapNotes") || "");
  const target = await profileTarget(userId);
  if (!canEditDevPlan(actor, target)) throw new Error("Not permitted to edit development plan.");

  await prisma.user.update({
    where: { id: userId },
    data: {
      devPlanFocusAreas: focusAreas || null,
      devPlanGapNotes: gapNotes || null,
      devPlanUpdatedAt: new Date(),
    },
  });
  revalidatePath(`/people/${userId}`);
}

// ── To-dos ────────────────────────────────────────────────────────────────────

export async function toggleTodo(formData: FormData) {
  const actor = await requireActor();
  const todoId = String(formData.get("todoId"));
  const todo = await prisma.todoItem.findUniqueOrThrow({ where: { id: todoId } });
  const target = await profileTarget(todo.userId);
  if (!canCompleteTodo(actor, target)) throw new Error("Not permitted to update this to-do.");

  await prisma.todoItem.update({
    where: { id: todoId },
    data: todo.completedAt
      ? { completedAt: null, archivedAt: null }
      : { completedAt: new Date(), archivedAt: new Date() },
  });
  revalidatePath(`/people/${todo.userId}`);
  revalidatePath("/");
}

export async function addTodo(formData: FormData) {
  const actor = await requireActor();
  const userId = String(formData.get("userId"));
  const title = String(formData.get("title") || "").trim();
  if (!title) return;
  const target = await profileTarget(userId);
  if (!canAddTodo(actor, target)) throw new Error("Not permitted to add to-dos here.");

  await prisma.todoItem.create({
    data: { userId, title, triggerType: TodoTrigger.MANUAL, createdById: actor.id },
  });
  revalidatePath(`/people/${userId}`);
}

// ── Identity / job family ──────────────────────────────────────────────────────

export async function changeJobFamily(formData: FormData) {
  const actor = await requireActor();
  const userId = String(formData.get("userId"));
  const jobFamilyId = String(formData.get("jobFamilyId") || "");
  const target = await profileTarget(userId);
  if (!canEditIdentity(actor, target)) throw new Error("Not permitted to edit job family.");

  const user = await prisma.user.findUniqueOrThrow({ where: { id: userId } });
  await prisma.user.update({ where: { id: userId }, data: { jobFamilyId: jobFamilyId || null } });

  if (jobFamilyId) await reconcileUserCompetencies(userId, jobFamilyId, user.brandId);
  revalidatePath(`/people/${userId}`);
}

// ── Create user (registration) ─────────────────────────────────────────────────

export async function createUser(formData: FormData) {
  const actor = await requireActor();
  if (!canCreateUser(actor)) throw new Error("Only HR/Admin can create users.");

  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const brandId = String(formData.get("brandId"));
  const role = String(formData.get("role") || Role.TEAM_MEMBER);
  const jobFamilyId = String(formData.get("jobFamilyId") || "");
  const managerId = String(formData.get("managerId") || "");
  // Password for email+password login; defaults to the shared demo password so
  // a newly created tester can sign in immediately.
  const password = String(formData.get("password") || "") || (process.env.SEED_PASSWORD || "password123");

  if (!name || !email) throw new Error("Name and email are required.");
  if (!(role in Role)) throw new Error("Invalid role.");

  const created = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash: await hashPassword(password),
      brandId,
      role: role as Role,
      jobFamilyId: jobFamilyId || null,
      managerId: managerId || null,
    },
  });

  // Onboarding to-dos auto-created on registration (PRD §3.7).
  await prisma.todoItem.createMany({
    data: [
      { userId: created.id, title: "Complete career framework onboarding", triggerType: TodoTrigger.ONBOARDING },
      { userId: created.id, title: "Read the framework materials", triggerType: TodoTrigger.ONBOARDING },
      { userId: created.id, title: "Complete self-levelling exercise", triggerType: TodoTrigger.ONBOARDING },
    ],
  });

  if (jobFamilyId) await reconcileUserCompetencies(created.id, jobFamilyId, brandId);

  revalidatePath("/people");
  return created.id;
}

// Assign competencies from the read contract; archive (not delete) any that no
// longer apply (PRD §3.2: changing job family archives removed competencies).
async function reconcileUserCompetencies(userId: string, jobFamilyId: string, brandId: string) {
  const resolved = await resolveCompetencies(jobFamilyId, brandId);
  const applicableIds = new Set(
    [...resolved.generalCompetencies, ...resolved.functionalCompetencies].map((c) => c.id)
  );

  const existing = await prisma.userCompetency.findMany({ where: { userId } });
  const existingByComp = new Map(existing.map((e) => [e.competencyId, e]));

  await prisma.$transaction(async (tx) => {
    // Archive competencies that are no longer applicable.
    for (const uc of existing) {
      if (!applicableIds.has(uc.competencyId) && !uc.archivedAt) {
        await tx.userCompetency.update({ where: { id: uc.id }, data: { archivedAt: new Date() } });
      }
    }
    // Add / un-archive applicable competencies.
    for (const id of applicableIds) {
      const e = existingByComp.get(id);
      if (!e) {
        await tx.userCompetency.create({ data: { userId, competencyId: id } });
      } else if (e.archivedAt) {
        await tx.userCompetency.update({ where: { id: e.id }, data: { archivedAt: null } });
      }
    }
  });
}
