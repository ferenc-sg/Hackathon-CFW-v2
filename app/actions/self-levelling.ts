"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { getSelfUser } from "@/lib/session";
import { computeResults, levelValue } from "@/lib/self-levelling-types";
import { getCompetencySet } from "@/lib/self-levelling-content";

// Get the active cycle — null if none is active.
export async function getActiveCycle() {
  return prisma.cycle.findFirst({ where: { isActive: true } });
}

// Get the current user's existing assessment for the active cycle.
export async function getExistingAssessment(cycleId: string) {
  const user = await getSelfUser();
  if (!user) return null;
  return prisma.selfAssessment.findUnique({
    where: { userId_cycleId: { userId: user.id, cycleId } },
  });
}

// Start a fresh assessment or return the existing draft.
// Called when the employee confirms their competency selection.
export async function startAssessment(formData: FormData) {
  const user = await getSelfUser();
  if (!user) throw new Error("Unauthenticated");

  const cycleId = formData.get("cycleId") as string;
  const jobFamilyId = (formData.get("jobFamilyId") as string) || null;
  const track = formData.get("track") as "IC" | "M";

  const existing = await prisma.selfAssessment.findUnique({
    where: { userId_cycleId: { userId: user.id, cycleId } },
  });

  if (existing) {
    return { assessmentId: existing.id };
  }

  const assessment = await prisma.selfAssessment.create({
    data: {
      userId: user.id,
      cycleId,
      jobFamilyId,
      track,
      status: "draft",
      answers: {},
    },
  });

  return { assessmentId: assessment.id };
}

// Save a single answer. Called after every selection.
export async function saveAnswer(formData: FormData) {
  const user = await getSelfUser();
  if (!user) throw new Error("Unauthenticated");

  const assessmentId = formData.get("assessmentId") as string;
  const subdimensionId = formData.get("subdimensionId") as string;
  const levelCode = formData.get("levelCode") as string;

  const assessment = await prisma.selfAssessment.findUnique({
    where: { id: assessmentId },
  });
  if (!assessment || assessment.userId !== user.id) throw new Error("Not found");

  const jobFamily = assessment.jobFamilyId
    ? await prisma.jobFamily.findUnique({ where: { id: assessment.jobFamilyId } })
    : null;

  const set = getCompetencySet(jobFamily?.name, assessment.track as "IC" | "M");
  const value = set ? levelValue(set.levels, levelCode) : 2;

  const currentAnswers = (assessment.answers ?? {}) as Record<
    string,
    { levelCode: string; levelValue: number }
  >;

  await prisma.selfAssessment.update({
    where: { id: assessmentId },
    data: {
      answers: { ...currentAnswers, [subdimensionId]: { levelCode, levelValue: value } },
    },
  });
}

// Submit the completed assessment — compute results and mark as submitted.
export async function submitAssessment(formData: FormData) {
  const user = await getSelfUser();
  if (!user) throw new Error("Unauthenticated");

  const assessmentId = formData.get("assessmentId") as string;

  const assessment = await prisma.selfAssessment.findUnique({
    where: { id: assessmentId },
  });
  if (!assessment || assessment.userId !== user.id) throw new Error("Not found");

  const jobFamily = assessment.jobFamilyId
    ? await prisma.jobFamily.findUnique({ where: { id: assessment.jobFamilyId } })
    : null;

  const set = getCompetencySet(jobFamily?.name, assessment.track as "IC" | "M");
  if (!set) throw new Error("Competency set not found");

  const answers = (assessment.answers ?? {}) as Record<
    string,
    { levelCode: string; levelValue: number }
  >;
  const { themeResults, overallResult } = computeResults(set, answers);

  await prisma.selfAssessment.update({
    where: { id: assessmentId },
    data: {
      status: "submitted",
      submittedAt: new Date(),
      themeResults: themeResults as unknown as Parameters<typeof prisma.selfAssessment.update>[0]["data"]["themeResults"],
      overallResult: overallResult as unknown as Parameters<typeof prisma.selfAssessment.update>[0]["data"]["overallResult"],
    },
  });

  revalidatePath("/leveling");
}

// Reset the draft so the employee can start over.
export async function resetAssessment(formData: FormData) {
  const user = await getSelfUser();
  if (!user) throw new Error("Unauthenticated");

  const assessmentId = formData.get("assessmentId") as string;

  const assessment = await prisma.selfAssessment.findUnique({
    where: { id: assessmentId },
  });
  if (!assessment || assessment.userId !== user.id) throw new Error("Not found");

  await prisma.selfAssessment.delete({ where: { id: assessmentId } });
  revalidatePath("/leveling");
}

// Reopen a submitted assessment for editing.
export async function reopenAssessment(formData: FormData) {
  const user = await getSelfUser();
  if (!user) throw new Error("Unauthenticated");

  const assessmentId = formData.get("assessmentId") as string;

  const assessment = await prisma.selfAssessment.findUnique({
    where: { id: assessmentId },
  });
  if (!assessment || assessment.userId !== user.id) throw new Error("Not found");

  await prisma.selfAssessment.update({
    where: { id: assessmentId },
    data: { status: "draft", submittedAt: null },
  });

  revalidatePath("/leveling");
}
