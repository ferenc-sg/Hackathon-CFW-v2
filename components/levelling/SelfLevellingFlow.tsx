"use client";

import { useState, useTransition } from "react";
import {
  flattenQuestions,
  computeResults,
  LEVEL_LABELS,
  levelValue,
  type CompetencySet,
  type Question,
  type ThemeResult,
  type OverallResult,
} from "@/lib/self-levelling-types";
import {
  startAssessment,
  saveAnswer,
  submitAssessment,
  resetAssessment,
  reopenAssessment,
} from "@/app/actions/self-levelling";

type Props = {
  cycleId: string;
  cycleLabel: string;
  existingAssessmentId: string | null;
  existingStatus: string | null;
  existingAnswers: Record<string, string>;
  existingThemeResults: ThemeResult[] | null;
  existingOverallResult: OverallResult | null;
  jobFamilies: { id: string; name: string }[];
  defaultJobFamilyId: string | null;
  defaultTrack: "IC" | "M";
  competencySet: CompetencySet | null;
};

const THEME_COLORS = [
  { bg: "bg-[#EDE9FC]", text: "text-[#5B52B0]", border: "border-[#C5BDF4]", dot: "bg-[#7B6FCC]" },
  { bg: "bg-[#FDE8E3]", text: "text-[#C44220]", border: "border-[#F5A98F]", dot: "bg-brand-500" },
  { bg: "bg-emerald-50",  text: "text-emerald-700", border: "border-emerald-200", dot: "bg-[#0e7d51]" },
  { bg: "bg-amber-50",   text: "text-amber-700",   border: "border-amber-200",   dot: "bg-amber-500" },
  { bg: "bg-sky-50",     text: "text-sky-700",     border: "border-sky-200",     dot: "bg-sky-500" },
];

function themeColor(idx: number) {
  return THEME_COLORS[idx % THEME_COLORS.length];
}

// ── Selection Screen ───────────────────────────────────────────────────────────

function SelectionScreen({
  cycleId,
  cycleLabel,
  jobFamilies,
  defaultJobFamilyId,
  defaultTrack,
  onStart,
}: {
  cycleId: string;
  cycleLabel: string;
  jobFamilies: { id: string; name: string }[];
  defaultJobFamilyId: string | null;
  defaultTrack: "IC" | "M";
  onStart: (assessmentId: string, set: CompetencySet) => void;
}) {
  const [jobFamilyId, setJobFamilyId] = useState(defaultJobFamilyId ?? "");
  const [track, setTrack] = useState<"IC" | "M">(defaultTrack);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  // Dynamically import content to avoid bundling the whole file on initial load
  async function getSet(): Promise<CompetencySet | null> {
    const { getCompetencySet } = await import("@/lib/self-levelling-content");
    const family = jobFamilies.find((f) => f.id === jobFamilyId);
    return getCompetencySet(family?.name ?? null, track);
  }

  function handleStart() {
    startTransition(async () => {
      setError(null);
      const set = await getSet();
      if (!set) { setError("Please select a job family to continue."); return; }

      const fd = new FormData();
      fd.set("cycleId", cycleId);
      fd.set("jobFamilyId", jobFamilyId);
      fd.set("track", track);
      try {
        const id = await startAssessment(fd);
        onStart(id, set);
      } catch {
        setError("Something went wrong. Please try again.");
      }
    });
  }

  return (
    <div className="mx-auto max-w-xl space-y-6 py-8">
      <div className="card p-6 space-y-5">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Start your self-levelling</h2>
          <p className="mt-1 text-sm text-slate-500">
            Cycle: <span className="font-medium text-slate-700">{cycleLabel}</span>
          </p>
        </div>

        <div className="space-y-1">
          <label className="label">Job Family</label>
          <select
            className="input"
            value={jobFamilyId}
            onChange={(e) => setJobFamilyId(e.target.value)}
          >
            <option value="">Select a job family…</option>
            {jobFamilies.map((f) => (
              <option key={f.id} value={f.id}>{f.name}</option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="label">Career Track</label>
          <div className="flex gap-2">
            {(["IC", "M"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTrack(t)}
                className={`flex-1 rounded-md border px-3 py-2 text-sm font-medium transition-colors ${
                  track === t
                    ? "border-[#7B6FCC] bg-[#EDE9FC] text-[#5B52B0]"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                {t === "IC" ? "Individual Contributor (IC)" : "Manager (M)"}
              </button>
            ))}
          </div>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          onClick={handleStart}
          disabled={pending}
          className="btn-primary w-full"
        >
          {pending ? "Starting…" : "Start self-levelling exercise"}
        </button>
      </div>

      <div className="rounded-lg bg-[#EDE9FC] border border-[#C5BDF4] px-4 py-3 text-sm text-[#5B52B0]">
        <strong>How it works:</strong> You&apos;ll be shown a series of short descriptions about
        different work behaviours. Pick the one that best describes your current work. There are no
        right or wrong answers — this is purely to help you and your manager have a better
        conversation about your growth.
      </div>
    </div>
  );
}

// ── Question Screen ────────────────────────────────────────────────────────────

function QuestionScreen({
  assessmentId,
  questions,
  initialAnswers,
  set,
  onComplete,
}: {
  assessmentId: string;
  questions: Question[];
  initialAnswers: Record<string, string>;
  set: CompetencySet;
  onComplete: (answers: Record<string, string>) => void;
}) {
  const [answers, setAnswers] = useState<Record<string, string>>(initialAnswers);
  const [currentIdx, setCurrentIdx] = useState(() => {
    // Start from first unanswered question
    const first = questions.findIndex((q) => !initialAnswers[q.subdimensionId]);
    return first === -1 ? 0 : first;
  });
  const [saving, startSave] = useTransition();
  const [submitting, startSubmit] = useTransition();

  const current = questions[currentIdx];
  const answered = answers[current.subdimensionId];
  const progress = Object.keys(answers).length;
  const total = questions.length;

  const themeIdx = set.themes.findIndex((t) => t.id === current.themeId);
  const color = themeColor(themeIdx);

  function selectAnswer(levelCode: string) {
    const newAnswers = { ...answers, [current.subdimensionId]: levelCode };
    setAnswers(newAnswers);

    startSave(async () => {
      const fd = new FormData();
      fd.set("assessmentId", assessmentId);
      fd.set("subdimensionId", current.subdimensionId);
      fd.set("levelCode", levelCode);
      await saveAnswer(fd);
    });
  }

  function goNext() {
    if (currentIdx < questions.length - 1) setCurrentIdx(currentIdx + 1);
  }

  function goPrev() {
    if (currentIdx > 0) setCurrentIdx(currentIdx - 1);
  }

  function handleSubmit() {
    startSubmit(async () => {
      const fd = new FormData();
      fd.set("assessmentId", assessmentId);
      await submitAssessment(fd);
      onComplete(answers);
    });
  }

  const allAnswered = questions.every((q) => answers[q.subdimensionId]);
  const isLast = currentIdx === questions.length - 1;

  return (
    <div className="mx-auto max-w-2xl space-y-5 py-6">
      {/* Progress */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span className={`font-semibold ${color.text}`}>{current.themeName}</span>
          <span>{progress} of {total} answered</span>
        </div>
        <div
          className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={total}
        >
          <div
            className="h-full rounded-full bg-[#7B6FCC] transition-all duration-300"
            style={{ width: `${(progress / total) * 100}%` }}
          />
        </div>
        <div className="flex gap-1">
          {questions.map((q, i) => (
            <button
              key={q.subdimensionId}
              type="button"
              onClick={() => setCurrentIdx(i)}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                i === currentIdx
                  ? "bg-[#7B6FCC]"
                  : answers[q.subdimensionId]
                  ? "bg-[#C5BDF4]"
                  : "bg-slate-200"
              }`}
              aria-label={`Question ${i + 1}: ${q.subdimensionName}`}
            />
          ))}
        </div>
      </div>

      {/* Question card */}
      <div className="card overflow-hidden">
        <div className={`px-5 py-3 border-b ${color.bg} ${color.border}`}>
          <div className="flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${color.dot}`} />
            <span className={`text-xs font-semibold uppercase tracking-wide ${color.text}`}>
              {current.themeName}
            </span>
          </div>
          <h2 className="mt-1 text-base font-semibold text-slate-900">{current.subdimensionName}</h2>
          {current.subdimensionNote && (
            <p className="mt-0.5 text-xs text-slate-500">{current.subdimensionNote}</p>
          )}
        </div>

        <div
          className="divide-y divide-slate-100"
          role="radiogroup"
          aria-label={current.subdimensionName}
        >
          {current.statements.map((stmt) => {
            const selected = answered === stmt.levelCode;
            return (
              <button
                key={stmt.levelCode}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => selectAnswer(stmt.levelCode)}
                className={`w-full text-left px-5 py-4 transition-colors ${
                  selected
                    ? "bg-[#EDE9FC]"
                    : "hover:bg-slate-50"
                }`}
              >
                <div className="flex gap-3">
                  <div
                    className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                      selected ? "border-[#7B6FCC] bg-[#7B6FCC]" : "border-slate-300"
                    }`}
                  >
                    {selected && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                  </div>
                  <div className="min-w-0 space-y-1">
                    <p className={`text-sm font-medium leading-snug ${selected ? "text-[#3B3380]" : "text-slate-800"}`}>
                      {stmt.text}
                    </p>
                    <p className="text-xs text-slate-500 italic">
                      e.g. {stmt.example}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={goPrev}
          disabled={currentIdx === 0}
          className="btn-secondary"
        >
          ← Back
        </button>

        <div className="flex items-center gap-2">
          {saving && <span className="text-xs text-slate-400">Saving…</span>}
        </div>

        {isLast ? (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!allAnswered || submitting}
            className="btn-primary"
          >
            {submitting ? "Submitting…" : allAnswered ? "See results →" : "Answer all questions to continue"}
          </button>
        ) : (
          <button
            type="button"
            onClick={goNext}
            disabled={!answered}
            className="btn-primary"
          >
            Next →
          </button>
        )}
      </div>
    </div>
  );
}

// ── Results Screen ─────────────────────────────────────────────────────────────

function ResultsScreen({
  assessmentId,
  set,
  answers,
  themeResults,
  overallResult,
  onEdit,
  onReset,
}: {
  assessmentId: string;
  set: CompetencySet;
  answers: Record<string, string>;
  themeResults: ThemeResult[];
  overallResult: OverallResult;
  onEdit: () => void;
  onReset: () => void;
}) {
  const [pending, startTransition] = useTransition();

  function handleReset() {
    startTransition(async () => {
      const fd = new FormData();
      fd.set("assessmentId", assessmentId);
      await resetAssessment(fd);
      onReset();
    });
  }

  function handleEdit() {
    startTransition(async () => {
      const fd = new FormData();
      fd.set("assessmentId", assessmentId);
      await reopenAssessment(fd);
      onEdit();
    });
  }

  const overallLabel = LEVEL_LABELS[overallResult.indicativeLevel] ?? overallResult.indicativeLevel;

  return (
    <div className="mx-auto max-w-2xl space-y-6 py-6">
      {/* Overall result */}
      <div className="card overflow-hidden">
        <div className="bg-[#EDE9FC] border-b border-[#C5BDF4] px-6 py-4">
          <p className="text-sm font-medium text-[#5B52B0]">Indicative overall level</p>
          <h2 className="mt-1 text-2xl font-bold text-[#3B3380]">{overallLabel}</h2>
          <p className="mt-0.5 text-sm text-[#5B52B0]">
            Based on {overallResult.themeCount} theme{overallResult.themeCount !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="px-6 py-4 text-sm text-slate-600 bg-amber-50 border-b border-amber-100">
          <strong className="text-amber-700">Important:</strong> This is an indicative result for
          self-reflection and conversation — not a formal level assignment. Your manager and HR will
          validate and finalise your level through the full levelling process.
        </div>
      </div>

      {/* Per-theme breakdown */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
          Theme Breakdown
        </h3>
        {themeResults.map((tr, i) => {
          const color = themeColor(i);
          const label = LEVEL_LABELS[tr.indicativeLevel] ?? tr.indicativeLevel;
          const theme = set.themes.find((t) => t.id === tr.themeId);
          const questions = flattenQuestions(set).filter((q) => q.themeId === tr.themeId);

          return (
            <div key={tr.themeId} className="card overflow-hidden">
              <div className={`flex items-center justify-between px-5 py-3 border-b ${color.bg} ${color.border}`}>
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${color.dot}`} />
                  <span className={`text-sm font-semibold ${color.text}`}>{tr.themeName}</span>
                </div>
                <span className={`text-sm font-bold ${color.text}`}>{label}</span>
              </div>
              <div className="divide-y divide-slate-100">
                {questions.map((q) => {
                  const answerCode = answers[q.subdimensionId];
                  const stmt = q.statements.find((s) => s.levelCode === answerCode);
                  if (!stmt) return null;
                  return (
                    <div key={q.subdimensionId} className="px-5 py-3">
                      <p className="text-xs font-medium text-slate-500 mb-1">{q.subdimensionName}</p>
                      <p className="text-sm text-slate-800">{stmt.text}</p>
                    </div>
                  );
                })}
              </div>
              {/* Level bar */}
              <div className="px-5 pb-4 pt-2">
                <div className="flex gap-1.5">
                  {set.levels.map((code) => {
                    const val = levelValue(set.levels, code);
                    const resultVal = levelValue(set.levels, tr.indicativeLevel);
                    const active = val <= resultVal;
                    return (
                      <div
                        key={code}
                        className={`flex-1 rounded h-1.5 transition-colors ${active ? color.dot : "bg-slate-200"}`}
                      />
                    );
                  })}
                </div>
                <div className="flex justify-between mt-1">
                  {set.levels.map((code) => (
                    <span key={code} className="text-[10px] text-slate-400">
                      {LEVEL_LABELS[code] ?? code}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button type="button" onClick={handleEdit} disabled={pending} className="btn-secondary flex-1">
          Edit answers
        </button>
        <button type="button" onClick={handleReset} disabled={pending} className="btn-ghost">
          Start over
        </button>
      </div>
    </div>
  );
}

// ── Resume Prompt ──────────────────────────────────────────────────────────────

function ResumePrompt({
  cycleLabel,
  answeredCount,
  totalCount,
  status,
  onResume,
  onStartOver,
}: {
  cycleLabel: string;
  answeredCount: number;
  totalCount: number;
  status: string;
  onResume: () => void;
  onStartOver: () => void;
}) {
  return (
    <div className="mx-auto max-w-lg space-y-4 py-8">
      <div className="card p-6 space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            {status === "submitted" ? "Exercise completed" : "Continue where you left off"}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Cycle: <span className="font-medium text-slate-700">{cycleLabel}</span>
          </p>
        </div>
        {status === "submitted" ? (
          <p className="text-sm text-slate-600">
            You have submitted your self-levelling exercise. You can view your results or start over.
          </p>
        ) : (
          <p className="text-sm text-slate-600">
            You answered <strong>{answeredCount}</strong> of <strong>{totalCount}</strong> questions.
          </p>
        )}
        <div className="flex gap-3">
          <button type="button" onClick={onResume} className="btn-primary flex-1">
            {status === "submitted" ? "View results" : "Continue exercise"}
          </button>
          <button type="button" onClick={onStartOver} className="btn-ghost text-sm">
            Start over
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Flow ──────────────────────────────────────────────────────────────────

export function SelfLevellingFlow({
  cycleId,
  cycleLabel,
  existingAssessmentId,
  existingStatus,
  existingAnswers,
  existingThemeResults,
  existingOverallResult,
  jobFamilies,
  defaultJobFamilyId,
  defaultTrack,
  competencySet,
}: Props) {
  type Screen = "resume-prompt" | "selection" | "questions" | "results";

  function initialScreen(): Screen {
    if (!existingAssessmentId) return "selection";
    if (existingStatus === "submitted") return "resume-prompt";
    return "resume-prompt";
  }

  const [screen, setScreen] = useState<Screen>(initialScreen);
  const [assessmentId, setAssessmentId] = useState<string | null>(existingAssessmentId);
  const [activeSet, setActiveSet] = useState<CompetencySet | null>(competencySet);
  const [answers, setAnswers] = useState<Record<string, string>>(existingAnswers ?? {});
  const [themeResults, setThemeResults] = useState<ThemeResult[] | null>(
    existingThemeResults ?? null
  );
  const [overallResult, setOverallResult] = useState<OverallResult | null>(
    existingOverallResult ?? null
  );
  const [resetting, startReset] = useTransition();

  const questions = activeSet ? flattenQuestions(activeSet) : [];

  function handleStartOver() {
    if (!assessmentId) return;
    startReset(async () => {
      const fd = new FormData();
      fd.set("assessmentId", assessmentId);
      await resetAssessment(fd);
      setAssessmentId(null);
      setActiveSet(null);
      setAnswers({});
      setThemeResults(null);
      setOverallResult(null);
      setScreen("selection");
    });
  }

  if (resetting) {
    return <div className="py-16 text-center text-sm text-slate-500">Resetting…</div>;
  }

  if (screen === "resume-prompt" && existingAssessmentId) {
    return (
      <ResumePrompt
        cycleLabel={cycleLabel}
        answeredCount={Object.keys(existingAnswers ?? {}).length}
        totalCount={activeSet ? flattenQuestions(activeSet).length : 0}
        status={existingStatus ?? "draft"}
        onResume={() => {
          if (existingStatus === "submitted" && existingThemeResults && existingOverallResult) {
            setScreen("results");
          } else {
            setScreen("questions");
          }
        }}
        onStartOver={handleStartOver}
      />
    );
  }

  if (screen === "selection") {
    return (
      <SelectionScreen
        cycleId={cycleId}
        cycleLabel={cycleLabel}
        jobFamilies={jobFamilies}
        defaultJobFamilyId={defaultJobFamilyId}
        defaultTrack={defaultTrack}
        onStart={async (id, set) => {
          setAssessmentId(id);
          setActiveSet(set);
          setAnswers({});
          setScreen("questions");
        }}
      />
    );
  }

  if (screen === "questions" && assessmentId && activeSet) {
    return (
      <QuestionScreen
        assessmentId={assessmentId}
        questions={questions}
        initialAnswers={answers}
        set={activeSet}
        onComplete={(finalAnswers) => {
          const { themeResults: tr, overallResult: or } = computeResults(activeSet, finalAnswers);
          setAnswers(finalAnswers);
          setThemeResults(tr);
          setOverallResult(or);
          setScreen("results");
        }}
      />
    );
  }

  if (screen === "results" && assessmentId && activeSet && themeResults && overallResult) {
    return (
      <ResultsScreen
        assessmentId={assessmentId}
        set={activeSet}
        answers={answers}
        themeResults={themeResults}
        overallResult={overallResult}
        onEdit={() => setScreen("questions")}
        onReset={handleStartOver}
      />
    );
  }

  return null;
}
