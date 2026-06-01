"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { getActorUser } from "@/lib/session";
import { getCompetencySet } from "@/lib/self-levelling-content";
import { flattenQuestions, computeResults } from "@/lib/self-levelling-types";

async function requireUser() {
  const u = await getActorUser();
  if (!u) throw new Error("No active user.");
  return u;
}

export async function getActiveCycle() {
  return prisma.cycle.findFirst({ where: { isActive: true }, orderBy: { startsAt: "desc" } });
}

export async function createCycle(formData: FormData) {
  const user = await requireUser();
  if (user.role !== "HR_ADMIN") throw new Error("Only HR admins can create cycles.");

  const label = String(formData.get("label") ?? "").trim();
  const startsAt = String(formData.get("startsAt") ?? "");
  const endsAt = String(formData.get("endsAt") ?? "");
  const activate = formData.get("activate") === "true";

  if (!label || !startsAt || !endsAt) throw new Error("Label, start date, and end date are required.");

  if (activate) await prisma.cycle.updateMany({ data: { isActive: false } });

  await prisma.cycle.create({
    data: {
      label,
      startsAt: new Date(startsAt),
      endsAt: new Date(endsAt),
      isActive: activate,
    },
  });
  revalidatePath("/leveling");
}

export async function activateCycle(formData: FormData) {
  const user = await requireUser();
  if (user.role !== "HR_ADMIN") throw new Error("Only HR admins can activate cycles.");

  const cycleId = String(formData.get("cycleId") ?? "");
  await prisma.cycle.updateMany({ data: { isActive: false } });
  await prisma.cycle.update({ where: { id: cycleId }, data: { isActive: true } });
  revalidatePath("/leveling");
}

export async function closeCycle(formData: FormData) {
  const user = await requireUser();
  if (user.role !== "HR_ADMIN") throw new Error("Only HR admins can close cycles.");

  const cycleId = String(formData.get("cycleId") ?? "");
  await prisma.cycle.update({ where: { id: cycleId }, data: { isActive: false } });
  revalidatePath("/leveling");
}

export async function getExistingAssessment(cycleId: string, userId: string) {
  return prisma.selfAssessment.findFirst({
    where: { userId, cycleId, archivedAt: null },
  });
}

export async function startAssessment(formData: FormData) {
  const user = await requireUser();
  const cycleId = String(formData.get("cycleId") ?? "");
  const jobFamilyId = String(formData.get("jobFamilyId") ?? "") || null;
  const track = (String(formData.get("track") ?? "") || user.trackId
    ? (await prisma.track.findFirst({ where: { id: user.trackId ?? undefined } }))?.name
    : "IC") as "IC" | "M";

  if (!cycleId) throw new Error("No active cycle.");

  const existing = await prisma.selfAssessment.findFirst({
    where: { userId: user.id, cycleId, archivedAt: null },
  });
  if (existing) {
    revalidatePath("/leveling");
    return existing.id;
  }

  const assessment = await prisma.selfAssessment.create({
    data: {
      userId: user.id,
      cycleId,
      jobFamilyId,
      track: track ?? "IC",
      status: "draft",
      answers: {},
    },
  });
  revalidatePath("/leveling");
  return assessment.id;
}

export async function saveAnswer(formData: FormData) {
  const user = await requireUser();
  const assessmentId = String(formData.get("assessmentId") ?? "");
  const subdimensionId = String(formData.get("subdimensionId") ?? "");
  const levelCode = String(formData.get("levelCode") ?? "");

  const assessment = await prisma.selfAssessment.findFirstOrThrow({
    where: { id: assessmentId, userId: user.id, archivedAt: null },
  });
  if (assessment.status === "submitted") return;

  const answers = (assessment.answers as Record<string, string>) ?? {};
  answers[subdimensionId] = levelCode;

  await prisma.selfAssessment.update({
    where: { id: assessmentId },
    data: { answers },
  });
}

export async function submitAssessment(formData: FormData) {
  const user = await requireUser();
  const assessmentId = String(formData.get("assessmentId") ?? "");

  const assessment = await prisma.selfAssessment.findFirstOrThrow({
    where: { id: assessmentId, userId: user.id, archivedAt: null },
  });
  if (assessment.status === "submitted") return;

  const jobFamily = assessment.jobFamilyId
    ? await prisma.jobFamily.findFirst({ where: { id: assessment.jobFamilyId } })
    : null;

  const track = (assessment.track as "IC" | "M") ?? "IC";
  const set = getCompetencySet(jobFamily?.name ?? null, track);
  if (!set) throw new Error("No competency set found.");

  const answers = (assessment.answers as Record<string, string>) ?? {};
  const { themeResults, overallResult } = computeResults(set, answers);

  await prisma.selfAssessment.update({
    where: { id: assessmentId },
    data: {
      status: "submitted",
      submittedAt: new Date(),
      themeResults: themeResults as unknown as Parameters<
        typeof prisma.selfAssessment.update
      >[0]["data"]["themeResults"],
      overallResult: overallResult as unknown as Parameters<
        typeof prisma.selfAssessment.update
      >[0]["data"]["overallResult"],
    },
  });

  revalidatePath("/leveling");
}

export async function resetAssessment(formData: FormData) {
  const user = await requireUser();
  const assessmentId = String(formData.get("assessmentId") ?? "");

  await prisma.selfAssessment.update({
    where: { id: assessmentId, userId: user.id },
    data: { archivedAt: new Date() },
  });
  revalidatePath("/leveling");
}

export async function reopenAssessment(formData: FormData) {
  const user = await requireUser();
  const assessmentId = String(formData.get("assessmentId") ?? "");

  await prisma.selfAssessment.update({
    where: { id: assessmentId, userId: user.id },
    data: { status: "draft", submittedAt: null, themeResults: undefined, overallResult: undefined },
  });
  revalidatePath("/leveling");
}
