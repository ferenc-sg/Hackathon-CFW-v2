import { PageHeader } from "@/components/PageHeader";
import { SelfLevellingFlow } from "@/components/levelling/SelfLevellingFlow";
import { prisma } from "@/lib/db";
import { getSelfUser } from "@/lib/session";

export default async function LevelingPage() {
  const user = await getSelfUser();

  if (!user) {
    return (
      <div>
        <PageHeader title="Leveling" subtitle="Self-assessment exercise" />
        <div className="p-8">
          <div className="card p-8 text-center text-slate-500">
            Sign in to access the self-levelling exercise.
          </div>
        </div>
      </div>
    );
  }

  const cycle = await prisma.cycle.findFirst({ where: { isActive: true } });

  if (!cycle) {
    return (
      <div>
        <PageHeader title="Leveling" subtitle="Self-assessment exercise" />
        <div className="p-8">
          <div className="card p-8 text-center">
            <p className="mb-1 text-base font-semibold text-slate-700">No active cycle</p>
            <p className="text-sm text-slate-500">
              The self-levelling exercise is only available during an active cycle. Check with
              your HR Admin to find out when the next cycle opens.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const [existing, jobFamilies, jobFamily] = await Promise.all([
    prisma.selfAssessment.findUnique({
      where: { userId_cycleId: { userId: user.id, cycleId: cycle.id } },
    }),
    prisma.jobFamily.findMany({
      where: { archivedAt: null },
      orderBy: { displayOrder: "asc" },
    }),
    user.jobFamilyId
      ? prisma.jobFamily.findUnique({ where: { id: user.jobFamilyId } })
      : null,
  ]);

  const userTrack = user.trackId
    ? ((await prisma.track.findUnique({ where: { id: user.trackId } }))?.name as "IC" | "M" | null)
    : null;

  return (
    <div>
      <PageHeader
        title="Self-assessment"
        subtitle={`${cycle.label} · Self-levelling exercise`}
      />
      <SelfLevellingFlow
        cycleId={cycle.id}
        cycleLabel={cycle.label}
        userId={user.id}
        userJobFamilyId={user.jobFamilyId ?? null}
        userJobFamilyName={jobFamily?.name ?? null}
        userTrack={userTrack}
        jobFamilies={jobFamilies.map((f) => ({ id: f.id, name: f.name }))}
        existing={
          existing
            ? {
                id: existing.id,
                status: existing.status,
                track: existing.track,
                jobFamilyId: existing.jobFamilyId,
                answers: (existing.answers ?? {}) as Record<
                  string,
                  { levelCode: string; levelValue: number }
                >,
                themeResults: existing.themeResults as Record<
                  string,
                  { average: number; dominantLevel: string }
                > | null,
                overallResult: existing.overallResult as {
                  average: number;
                  indicativeLevel: string;
                } | null,
              }
            : null
        }
      />
    </div>
  );
}
