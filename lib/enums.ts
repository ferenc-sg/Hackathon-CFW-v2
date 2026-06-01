// Centralised "enum" definitions. SQLite/Prisma cannot model native enums, so
// allowed values live here and are enforced at the application layer.

export const TrackName = {
  IC: "IC",
  M: "M",
} as const;
export type TrackName = (typeof TrackName)[keyof typeof TrackName];

export const CompetencyType = {
  GENERAL: "GENERAL",
  FUNCTIONAL: "FUNCTIONAL",
  CUSTOM: "CUSTOM",
} as const;
export type CompetencyType = (typeof CompetencyType)[keyof typeof CompetencyType];

export const CompetencyScope = {
  GLOBAL: "GLOBAL",
  FAMILY: "FAMILY",
} as const;
export type CompetencyScope = (typeof CompetencyScope)[keyof typeof CompetencyScope];

export const Provenance = {
  SHARED_BASELINE: "SHARED_BASELINE",
  BRAND_ADDON: "BRAND_ADDON",
  BRAND_FORK: "BRAND_FORK",
  CUSTOM: "CUSTOM",
} as const;
export type Provenance = (typeof Provenance)[keyof typeof Provenance];

export const ExpectationStatus = {
  DRAFT: "DRAFT",
  PUBLISHED: "PUBLISHED",
} as const;
export type ExpectationStatus = (typeof ExpectationStatus)[keyof typeof ExpectationStatus];

export const Role = {
  HR_ADMIN: "HR_ADMIN",
  BRAND_ADMIN: "BRAND_ADMIN",
  MANAGER: "MANAGER",
  TEAM_MEMBER: "TEAM_MEMBER",
} as const;
export type Role = (typeof Role)[keyof typeof Role];

export const ROLE_LABELS: Record<Role, string> = {
  HR_ADMIN: "HR / Admin",
  BRAND_ADMIN: "Brand/Team Admin",
  MANAGER: "Manager",
  TEAM_MEMBER: "Team member",
};

export const GrowthPath = {
  GROW_IN_LEVEL: "GROW_IN_LEVEL",
  ADVANCE_LEVEL: "ADVANCE_LEVEL",
  BECOME_MANAGER: "BECOME_MANAGER",
  RETURN_TO_IC: "RETURN_TO_IC",
  ADJUST_SCOPE: "ADJUST_SCOPE",
  INTERNAL_MOBILITY: "INTERNAL_MOBILITY",
  BECOME_MENTOR: "BECOME_MENTOR",
  CHANGE_FAMILY: "CHANGE_FAMILY",
} as const;
export type GrowthPath = (typeof GrowthPath)[keyof typeof GrowthPath];

export const GROWTH_PATH_LABELS: Record<GrowthPath, string> = {
  GROW_IN_LEVEL: "Grow within current level",
  ADVANCE_LEVEL: "Advance to next seniority level",
  BECOME_MANAGER: "Become a people manager",
  RETURN_TO_IC: "Return to individual contributor",
  ADJUST_SCOPE: "Adjust scope of current role",
  INTERNAL_MOBILITY: "Internal mobility — move between brands or central teams",
  BECOME_MENTOR: "Become a mentor",
  CHANGE_FAMILY: "Change job family",
};

export const LevellingMethod = {
  LEVELLING_FLOW: "LEVELLING_FLOW",
  MANAGER_MANUAL: "MANAGER_MANUAL",
  HR_ADMIN_MANUAL: "HR_ADMIN_MANUAL",
} as const;
export type LevellingMethod = (typeof LevellingMethod)[keyof typeof LevellingMethod];

export const LEVELLING_METHOD_LABELS: Record<LevellingMethod, string> = {
  LEVELLING_FLOW: "Levelling Flow",
  MANAGER_MANUAL: "Manager (manual)",
  HR_ADMIN_MANUAL: "HR/Admin (manual)",
};

export const TodoTrigger = {
  ONBOARDING: "ONBOARDING",
  CYCLE: "CYCLE",
  MANUAL: "MANUAL",
} as const;
export type TodoTrigger = (typeof TodoTrigger)[keyof typeof TodoTrigger];

export const PROVENANCE_LABELS: Record<Provenance, string> = {
  SHARED_BASELINE: "Shared baseline",
  BRAND_ADDON: "Brand add-on",
  BRAND_FORK: "Brand fork",
  CUSTOM: "Custom",
};
