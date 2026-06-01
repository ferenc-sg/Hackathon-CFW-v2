export interface Statement {
  text: string;
  example: string;
}

export interface Subdimension {
  id: string;
  name: string;
  note?: string | null;
  statements: Record<string, Statement>; // keyed by level code e.g. "IC2"
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
  levels: string[]; // ordered list of level codes e.g. ["IC2","IC3","IC4","IC5"]
  themes: Theme[];
}

export const LEVEL_LABELS: Record<string, string> = {
  IC2: "Beginner",
  IC3: "Proficient",
  IC4: "Fully Proficient",
  IC5: "Domain Expert",
  M4: "Team Lead",
  M5: "Senior Manager",
  M6: "Strategic Leader",
};

// Numeric value for a level code within a given levels array.
// First level → 2, second → 3, etc. (floor at 2, ceiling at 2+n-1)
export function levelValue(levels: string[], code: string): number {
  const idx = levels.indexOf(code);
  return idx === -1 ? 2 : idx + 2;
}

// Level code for a numeric value within a given levels array.
export function levelAtValue(levels: string[], value: number): string {
  const idx = Math.round(value) - 2;
  return levels[Math.max(0, Math.min(idx, levels.length - 1))];
}

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
    for (const sub of theme.subdimensions) {
      questions.push({
        themeId: theme.id,
        themeName: theme.name,
        subdimensionId: sub.id,
        subdimensionName: sub.name,
        subdimensionNote: sub.note,
        statements: set.levels
          .filter((code) => sub.statements[code])
          .map((code) => ({ levelCode: code, ...sub.statements[code] })),
      });
    }
  }
  return questions;
}

export interface ThemeResult {
  themeId: string;
  themeName: string;
  avgValue: number;
  indicativeLevel: string;
  answeredCount: number;
}

export interface OverallResult {
  avgValue: number;
  indicativeLevel: string;
  themeCount: number;
}

export function computeResults(
  set: CompetencySet,
  answers: Record<string, string> // { [subdimensionId]: levelCode }
): { themeResults: ThemeResult[]; overallResult: OverallResult } {
  const themeResults: ThemeResult[] = [];

  for (const theme of set.themes) {
    const values: number[] = [];
    for (const sub of theme.subdimensions) {
      const ans = answers[sub.id];
      if (ans) values.push(levelValue(set.levels, ans));
    }
    if (values.length === 0) continue;
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    themeResults.push({
      themeId: theme.id,
      themeName: theme.name,
      avgValue: avg,
      indicativeLevel: levelAtValue(set.levels, avg),
      answeredCount: values.length,
    });
  }

  const overall =
    themeResults.length > 0
      ? themeResults.reduce((a, b) => a + b.avgValue, 0) / themeResults.length
      : 2;

  return {
    themeResults,
    overallResult: {
      avgValue: overall,
      indicativeLevel: levelAtValue(set.levels, overall),
      themeCount: themeResults.length,
    },
  };
}
