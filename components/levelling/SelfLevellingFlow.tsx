"use client";

import { useState, useTransition } from "react";
import {
  type CompetencySet,
  type Question,
  flattenQuestions,
  computeResults,
  levelValue,
  LEVEL_LABELS,
} from "@/lib/self-levelling-types";
import { getCompetencySet } from "@/lib/self-levelling-content";
import { saveAnswer, submitAssessment, startAssessment, resetAssessment, reopenAssessment } from "@/app/actions/self-levelling";

// ─── Types ────────────────────────────────────────────────────────────────────

type Step = "selection" | "questions" | "results";

type JobFamilyOption = { id: string; name: string };

type ExistingAssessment = {
  id: string;
  status: string;
  track: string;
  jobFamilyId: string | null;
  answers: Record<string, { levelCode: string; levelValue: number }>;
  themeResults: Record<string, { average: number; dominantLevel: string }> | null;
  overallResult: { average: number; indicativeLevel: string } | null;
};

type Props = {
  cycleId: string;
  cycleLabel: string;
  userId: string;
  userJobFamilyId: string | null;
  userJobFamilyName: string | null;
  userTrack: "IC" | "M" | null;
  jobFamilies: JobFamilyOption[];
  existing: ExistingAssessment | null;
};

// Theme colour palette — one per theme index, cycling if more themes than colours.
const THEME_COLORS = [
  { bg: "bg-[#EDE9FC]", text: "text-[#5B52B0]", border: "border-[#7B6FCC]", dot: "bg-[#7B6FCC]" },
  { bg: "bg-[#FDE8E3]", text: "text-[#C44220]", border: "border-brand-500", dot: "bg-brand-500" },
  { bg: "bg-green-50", text: "text-[#0e7d51]", border: "border-[#0e7d51]", dot: "bg-[#0e7d51]" },
  { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-500", dot: "bg-amber-500" },
  { bg: "bg-sky-50", text: "text-sky-700", border: "border-sky-500", dot: "bg-sky-500" },
];

function themeColor(idx: number) {
  return THEME_COLORS[idx % THEME_COLORS.length];
}

// ─── Main component ───────────────────────────────────────────────────────────

export function SelfLevellingFlow({
  cycleId,
  cycleLabel,
  userId,
  userJobFamilyId,
  userJobFamilyName,
  userTrack,
  jobFamilies,
  existing,
}: Props) {
  const [isPending, startTransition] = useTransition();

  // Selection state
  const [selectedFamilyId, setSelectedFamilyId] = useState<string>(
    existing?.jobFamilyId ?? userJobFamilyId ?? ""
  );
  const [selectedTrack, setSelectedTrack] = useState<"IC" | "M">(
    (existing?.track as "IC" | "M") ?? userTrack ?? "IC"
  );

  // Assessment state
  const [assessmentId, setAssessmentId] = useState<string | null>(existing?.id ?? null);
  const [answers, setAnswers] = useState<Record<string, { levelCode: string; levelValue: number }>>(
    (existing?.answers as Record<string, { levelCode: string; levelValue: number }>) ?? {}
  );
  const [step, setStep] = useState<Step>(() => {
    if (!existing) return "selection";
    if (existing.status === "submitted") return "results";
    if (Object.keys(existing.answers ?? {}).length > 0) return "questions";
    return "selection";
  });
  const [questionIndex, setQuestionIndex] = useState(0);
  const [showResumePrompt, setShowResumePrompt] = useState(
    existing?.status === "draft" && Object.keys(existing?.answers ?? {}).length > 0
  );

  // Competency set derivation
  const selectedFamilyName = jobFamilies.find((f) => f.id === selectedFamilyId)?.name ?? null;
  const competencySet: CompetencySet | null = getCompetencySet(selectedFamilyName, selectedTrack);
  const questions: Question[] = competencySet ? flattenQuestions(competencySet) : [];

  // ── Resume prompt ────────────────────────────────────────────────────────────
  if (showResumePrompt && existing) {
    const answeredCount = Object.keys(existing.answers ?? {}).length;
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-8">
        <div className="card w-full max-w-md p-8 text-center">
          <div className="mb-2 text-3xl">↩</div>
          <h2 className="mb-2 text-lg font-semibold text-slate-900">Resume your assessment?</h2>
          <p className="mb-6 text-sm text-slate-500">
            You have an unfinished assessment with {answeredCount} of{" "}
            {questions.length} questions answered.
          </p>
          <div className="space-y-2">
            <button
              className="btn-primary w-full"
              onClick={() => {
                setShowResumePrompt(false);
                setStep("questions");
                const lastAnsweredIdx = Math.min(answeredCount, questions.length - 1);
                setQuestionIndex(lastAnsweredIdx);
              }}
            >
              Resume where I left off
            </button>
            <button
              className="btn-secondary w-full"
              onClick={() => {
                if (
                  window.confirm(
                    "This will delete your existing draft and all answers. Are you sure?"
                  )
                ) {
                  const fd = new FormData();
                  fd.append("assessmentId", existing.id);
                  startTransition(async () => {
                    await resetAssessment(fd);
                    setAssessmentId(null);
                    setAnswers({});
                    setStep("selection");
                    setShowResumePrompt(false);
                  });
                }
              }}
            >
              Start over
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Selection step ────────────────────────────────────────────────────────────
  if (step === "selection") {
    const canStart = !!competencySet;
    return (
      <div className="p-8">
        <div className="mx-auto max-w-2xl space-y-6">
          <div className="card p-8">
            <h2 className="mb-1 text-lg font-semibold text-slate-900">Before you begin</h2>
            <p className="mb-6 text-sm text-slate-500">
              Choose the competency set you want to assess against. Your profile settings are
              pre-selected — change them if your role spans multiple families.
            </p>

            <div className="space-y-5">
              <div>
                <label className="label">Job family</label>
                <select
                  className="input mt-1"
                  value={selectedFamilyId}
                  onChange={(e) => setSelectedFamilyId(e.target.value)}
                >
                  <option value="">— General (no family) —</option>
                  {jobFamilies.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label">Track</label>
                <div className="mt-1 flex gap-3">
                  {(["IC", "M"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setSelectedTrack(t)}
                      className={`flex-1 rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
                        selectedTrack === t
                          ? "border-[#7B6FCC] bg-[#EDE9FC] text-[#5B52B0]"
                          : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {t === "IC" ? "IC — Individual Contributor" : "M — Management"}
                    </button>
                  ))}
                </div>
              </div>

              {competencySet && (
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Competency preview
                    </span>
                    <span className="text-xs text-slate-400">
                      {questions.length} question{questions.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <ul className="space-y-1">
                    {competencySet.themes.map((theme, i) => {
                      const c = themeColor(i);
                      return (
                        <li key={theme.id} className="flex items-center gap-2 text-sm text-slate-700">
                          <span className={`h-2 w-2 rounded-full ${c.dot}`} />
                          {theme.name}
                          <span className="text-xs text-slate-400">
                            ({theme.subdimensions.length})
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>

            <div className="mt-6">
              <button
                disabled={!canStart || isPending}
                className="btn-primary w-full disabled:opacity-50"
                onClick={() => {
                  const fd = new FormData();
                  fd.append("cycleId", cycleId);
                  fd.append("jobFamilyId", selectedFamilyId);
                  fd.append("track", selectedTrack);
                  startTransition(async () => {
                    const result = await startAssessment(fd);
                    setAssessmentId(result.assessmentId);
                    setAnswers({});
                    setQuestionIndex(0);
                    setStep("questions");
                  });
                }}
              >
                {isPending ? "Starting…" : "Start self-assessment →"}
              </button>
              <p className="mt-3 text-center text-xs text-slate-400">
                Cycle: {cycleLabel}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Questions step ────────────────────────────────────────────────────────────
  if (step === "questions" && competencySet && questions.length > 0) {
    const q = questions[questionIndex];
    const isFirst = questionIndex === 0;
    const isLast = questionIndex === questions.length - 1;
    const currentAnswer = answers[q.subdimensionId];
    const hasAnswer = !!currentAnswer;

    // Find theme index for colour
    const themeIdx = competencySet.themes.findIndex((t) => t.id === q.themeId);
    const color = themeColor(themeIdx);

    const handleSelect = (levelCode: string) => {
      if (!assessmentId) return;
      const value = levelValue(competencySet.levels, levelCode);
      const newAnswers = {
        ...answers,
        [q.subdimensionId]: { levelCode, levelValue: value },
      };
      setAnswers(newAnswers);

      const fd = new FormData();
      fd.append("assessmentId", assessmentId);
      fd.append("subdimensionId", q.subdimensionId);
      fd.append("levelCode", levelCode);
      startTransition(() => saveAnswer(fd));
    };

    const handleNext = () => {
      if (isLast) {
        setStep("results");
      } else {
        setQuestionIndex((i) => i + 1);
      }
    };

    const progress = ((questionIndex + (hasAnswer ? 1 : 0)) / questions.length) * 100;

    return (
      <div className="p-8">
        <div className="mx-auto max-w-2xl space-y-5">
          {/* Progress */}
          <div>
            <div className="mb-1.5 flex items-center justify-between text-xs text-slate-500">
              <span>
                Question {questionIndex + 1} of {questions.length}
              </span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <div
              className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200"
              role="progressbar"
              aria-valuenow={Math.round(progress)}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="h-full rounded-full bg-[#7B6FCC] transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Theme badge */}
          <div className="flex items-center gap-2">
            <span className={`badge ${color.bg} ${color.text} border-0 text-xs font-semibold`}>
              {q.themeName}
            </span>
          </div>

          {/* Question card */}
          <div className={`card border-l-4 ${color.border} p-6`}>
            <h2 className="mb-1 text-lg font-semibold text-slate-900">{q.subdimensionName}</h2>
            {q.subdimensionNote && (
              <p className="mb-3 text-sm italic text-slate-500">{q.subdimensionNote}</p>
            )}
            <p className="mb-5 text-sm text-slate-500">
              Select the statement that best describes how you consistently operate.
            </p>

            <div
              role="radiogroup"
              aria-label={q.subdimensionName}
              className="space-y-3"
            >
              {q.statements.map((s, i) => {
                const isSelected = currentAnswer?.levelCode === s.levelCode;
                return (
                  <button
                    key={s.levelCode}
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => handleSelect(s.levelCode)}
                    className={`w-full rounded-lg border-2 p-4 text-left transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7B6FCC] ${
                      isSelected
                        ? `${color.border} ${color.bg}`
                        : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                    }`}
                    style={{ minHeight: 44 }}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                          isSelected
                            ? `${color.border} ${color.dot}`
                            : "border-slate-300 bg-white"
                        }`}
                      >
                        {isSelected && (
                          <div className="h-2 w-2 rounded-full bg-white" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm leading-relaxed text-slate-800">{s.text}</p>
                        {s.example && (
                          <p className="mt-2 text-sm leading-relaxed text-slate-500">
                            <strong className="font-semibold not-italic text-slate-600">
                              Example:
                            </strong>{" "}
                            <em>{s.example}</em>
                          </p>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {!hasAnswer && (
              <p className="mt-3 text-xs text-slate-400">Select an option above to continue.</p>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              disabled={isFirst}
              onClick={() => setQuestionIndex((i) => Math.max(0, i - 1))}
              className="btn-ghost disabled:opacity-30"
            >
              ← Back
            </button>
            <button
              disabled={!hasAnswer || isPending}
              onClick={handleNext}
              className="btn-primary disabled:opacity-50"
            >
              {isLast ? "View results →" : "Next →"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Results step ──────────────────────────────────────────────────────────────
  if (step === "results" && competencySet) {
    const isSubmitted = existing?.status === "submitted" && assessmentId === existing?.id;
    const { themeResults, overallResult } = computeResults(competencySet, answers);

    return (
      <div className="p-8">
        <div className="mx-auto max-w-2xl space-y-5">
          {/* Framing notice */}
          <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            These results are a starting point for your development conversation with your
            manager — not a final determination of your level.
          </div>

          {/* Overall indicative level */}
          <div className="card p-6 text-center">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Overall indicative level
            </p>
            <div className="mb-1 text-4xl font-bold text-slate-900">
              {overallResult.indicativeLevel}
            </div>
            <p className="text-sm text-slate-500">
              {LEVEL_LABELS[overallResult.indicativeLevel] ?? ""}
            </p>
            <span className="mt-2 inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
              indicative
            </span>
          </div>

          {/* Per-theme breakdown */}
          <div className="card divide-y divide-slate-100">
            {competencySet.themes.map((theme, themeIdx) => {
              const result = themeResults[theme.id];
              const color = themeColor(themeIdx);
              return (
                <div key={theme.id} className="p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`h-2.5 w-2.5 rounded-full ${color.dot}`} />
                      <h3 className="text-sm font-semibold text-slate-800">{theme.name}</h3>
                    </div>
                    {result && (
                      <span className={`badge ${color.bg} ${color.text} border-0 text-xs`}>
                        {result.dominantLevel}
                        {LEVEL_LABELS[result.dominantLevel]
                          ? ` — ${LEVEL_LABELS[result.dominantLevel]}`
                          : ""}
                      </span>
                    )}
                  </div>
                  <ul className="space-y-1.5">
                    {theme.subdimensions.map((sd) => {
                      const ans = answers[sd.id];
                      return (
                        <li
                          key={sd.id}
                          className="flex items-center justify-between rounded px-2 py-1.5 text-sm"
                        >
                          <span className="text-slate-600">{sd.name}</span>
                          {ans ? (
                            <span className="font-medium text-slate-800">
                              {ans.levelCode}
                              {LEVEL_LABELS[ans.levelCode]
                                ? ` · ${LEVEL_LABELS[ans.levelCode]}`
                                : ""}
                            </span>
                          ) : (
                            <span className="text-slate-400">Skipped</span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 sm:flex-row-reverse">
            {!isSubmitted ? (
              <>
                <form action={submitAssessment} className="flex-1">
                  <input type="hidden" name="assessmentId" value={assessmentId ?? ""} />
                  <button type="submit" className="btn-primary w-full">
                    Submit assessment
                  </button>
                </form>
                <button
                  className="btn-ghost flex-1"
                  onClick={() => {
                    setStep("questions");
                    setQuestionIndex(0);
                  }}
                >
                  ← Review answers
                </button>
              </>
            ) : (
              <>
                <div className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-[#0e7d51]">
                  <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current">
                    <path d="M16.7 5.3a1 1 0 0 1 0 1.4l-8 8a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4L8 12.6l7.3-7.3a1 1 0 0 1 1.4 0Z" />
                  </svg>
                  Submitted
                </div>
                <form action={reopenAssessment} className="flex-1">
                  <input type="hidden" name="assessmentId" value={assessmentId ?? ""} />
                  <button type="submit" className="btn-secondary w-full">
                    Edit answers
                  </button>
                </form>
              </>
            )}
          </div>

          {!isSubmitted && (
            <p className="text-center text-xs text-slate-400">
              You can go back and change any answer before submitting.
            </p>
          )}
        </div>
      </div>
    );
  }

  return null;
}
