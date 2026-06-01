// Types for the Self-Levelling module — matches the PRD data model (§3).

export interface Statement {
  text: string;
  example: string;
}

export interface Subdimension {
  id: string;
  name: string;
  note?: string | null;
  statements: Record<string, Statement>; // levelCode → Statement
}

export interface Theme {
  id: string;
  name: string;
  fullName: string;
  description?: string;
  subdimensions: Subdimension[];
}

export interface CompetencySet {
  jobFamilyName: string;
  track: "IC" | "M";
  levels: string[];
  themes: Theme[];
}

export const LEVEL_LABELS: Record<string, string> = {
  IC2: "Beginner",
  IC3: "Proficient",
  IC4: "Fully proficient",
  IC5: "Domain expert",
  M4: "Team Lead",
  M5: "Senior Manager",
  M6: "Strategic Leader",
};

// Numeric value for scoring — sequential from 2, matching level order.
export function levelValue(levels: string[], code: string): number {
  const idx = levels.indexOf(code);
  return idx === -1 ? 2 : idx + 2;
}

export function levelAtValue(levels: string[], value: number): string {
  const idx = Math.round(value) - 2;
  return levels[Math.max(0, Math.min(idx, levels.length - 1))];
}

// Flatten a competency set into an ordered list of questions.
export interface Question {
  themeId: string;
  themeName: string;
  subdimensionId: string;
  subdimensionName: string;
  subdimensionNote?: string | null;
  statements: { levelCode: string; text: string; example: string }[];
}

export function flattenQuestions(set: CompetencySet): Question[] {
  const questions: Question[] = [];
  for (const theme of set.themes) {
    for (const sd of theme.subdimensions) {
      const statements = set.levels.map((code) => ({
        levelCode: code,
        text: sd.statements[code]?.text ?? "",
        example: sd.statements[code]?.example ?? "",
      }));
      questions.push({
        themeId: theme.id,
        themeName: theme.name,
        subdimensionId: sd.id,
        subdimensionName: sd.name,
        subdimensionNote: sd.note,
        statements,
      });
    }
  }
  return questions;
}

// Compute theme results and overall result from answers.
export interface ThemeResult {
  average: number;
  dominantLevel: string;
}

export interface OverallResult {
  average: number;
  indicativeLevel: string;
}

export function computeResults(
  set: CompetencySet,
  answers: Record<string, { levelCode: string; levelValue: number }>
): { themeResults: Record<string, ThemeResult>; overallResult: OverallResult } {
  const themeResults: Record<string, ThemeResult> = {};
  const themeAverages: number[] = [];

  for (const theme of set.themes) {
    const scores = theme.subdimensions
      .map((sd) => answers[sd.id]?.levelValue)
      .filter((v): v is number => v !== undefined);

    if (scores.length === 0) continue;
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
    const dominant = levelAtValue(set.levels, avg);
    themeResults[theme.id] = { average: avg, dominantLevel: dominant };
    themeAverages.push(avg);
  }

  const overallAvg =
    themeAverages.length > 0
      ? themeAverages.reduce((a, b) => a + b, 0) / themeAverages.length
      : 2;

  return {
    themeResults,
    overallResult: {
      average: overallAvg,
      indicativeLevel: levelAtValue(set.levels, overallAvg),
    },
  };
}
