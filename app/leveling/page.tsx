import { PageHeader } from "@/components/PageHeader";
import { prisma } from "@/lib/db";
import { getActorUser } from "@/lib/session";
import { getActor } from "@/lib/session";
import { SelfLevellingFlow } from "@/components/levelling/SelfLevellingFlow";
import { CycleManager } from "@/components/levelling/CycleManager";
import { getCompetencySet } from "@/lib/self-levelling-content";
import type { ThemeResult, OverallResult } from "@/lib/self-levelling-types";
import { Role } from "@/lib/enums";

export default async function LevelingPage() {
  const [user, actor] = await Promise.all([getActorUser(), getActor()]);
  const isHrAdmin = actor?.role === Role.HR_ADMIN;

  const [cycle, allCycles] = await Promise.all([
    prisma.cycle.findFirst({ where: { isActive: true }, orderBy: { startsAt: "desc" } }),
    isHrAdmin ? prisma.cycle.findMany({ orderBy: { startsAt: "desc" } }) : Promise.resolve([]),
  ]);

  if (!cycle) {
    return (
      <div>
        <PageHeader title="Leveling" subtitle="Self-assessment exercise" />
        <div className="p-8">
          {isHrAdmin && (
            <CycleManager cycles={allCycles} />
          )}
          {!isHrAdmin && (
            <div className="card p-8 text-center text-slate-500">
              <p className="font-medium">No active levelling cycle</p>
              <p className="text-sm mt-1">An HR admin needs to open a new cycle before self-levelling is available.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  const jobFamilies = await prisma.jobFamily.findMany({
    where: { archivedAt: null },
    orderBy: { displayOrder: "asc" },
    select: { id: true, name: true },
  });

  const userJobFamily = user?.jobFamilyId
    ? jobFamilies.find((f) => f.id === user.jobFamilyId) ?? null
    : null;

  const userTrack = user?.trackId
    ? await prisma.track.findFirst({ where: { id: user.trackId }, select: { name: true } })
    : null;

  const defaultTrack: "IC" | "M" =
    userTrack?.name === "M" ? "M" : "IC";

  const existingAssessment = user
    ? await prisma.selfAssessment.findFirst({
        where: { userId: user.id, cycleId: cycle.id, archivedAt: null },
      })
    : null;

  const competencySet = getCompetencySet(userJobFamily?.name ?? null, defaultTrack);

  const existingAnswers = existingAssessment
    ? ((existingAssessment.answers as Record<string, string>) ?? {})
    : {};

  const existingThemeResults = existingAssessment?.themeResults
    ? (existingAssessment.themeResults as unknown as ThemeResult[])
    : null;

  const existingOverallResult = existingAssessment?.overallResult
    ? (existingAssessment.overallResult as unknown as OverallResult)
    : null;

  return (
    <div>
      <PageHeader
        title="Leveling"
        subtitle={`${cycle.label} — self-assessment exercise`}
      />
      <div className="px-8">
        {isHrAdmin && <CycleManager cycles={allCycles} />}
        <SelfLevellingFlow
          cycleId={cycle.id}
          cycleLabel={cycle.label}
          existingAssessmentId={existingAssessment?.id ?? null}
          existingStatus={existingAssessment?.status ?? null}
          existingAnswers={existingAnswers}
          existingThemeResults={existingThemeResults}
          existingOverallResult={existingOverallResult}
          jobFamilies={jobFamilies}
          defaultJobFamilyId={userJobFamily?.id ?? null}
          defaultTrack={defaultTrack}
          competencySet={competencySet}
        />
      </div>
    </div>
  );
}
