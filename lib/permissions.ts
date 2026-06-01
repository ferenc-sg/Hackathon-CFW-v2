import { Role } from "./enums";

// Permission helpers encoding the PRD permission matrices (§M1.5 + §M2.2).
// `actor` is the acting user; `target` describes the resource being touched.

export type Actor = {
  id: string;
  role: Role;
  brandId: string | null;
};

export type ProfileTarget = {
  userId: string;
  brandId: string | null;
  managerId: string | null;
};

const isHrAdmin = (a: Actor) => a.role === Role.HR_ADMIN;

// ── Module 1: Framework Library ────────────────────────────────────────────

export function canViewDraft(a: Actor, contentBrandId: string | null): boolean {
  if (isHrAdmin(a)) return true;
  if (a.role === Role.BRAND_ADMIN) return contentBrandId === a.brandId;
  return false;
}

export function canEditCompetencyText(a: Actor, contentBrandId: string | null): boolean {
  if (isHrAdmin(a)) return true;
  if (a.role === Role.BRAND_ADMIN) return contentBrandId === a.brandId;
  return false;
}

// The five SHARED_BASELINE general competencies are protected at the model
// level — only HR/Admin may edit them (audited). Hard block for everyone else.
export function canEditSharedBaseline(a: Actor): boolean {
  return isHrAdmin(a);
}

export function canCreateBrandContent(a: Actor, contentBrandId: string | null): boolean {
  if (isHrAdmin(a)) return true;
  if (a.role === Role.BRAND_ADMIN) return contentBrandId === a.brandId;
  return false;
}

export function canManageJobFamily(a: Actor): boolean {
  return isHrAdmin(a);
}

export function canManageLevels(a: Actor): boolean {
  return isHrAdmin(a);
}

export function canPublish(a: Actor, contentBrandId: string | null): boolean {
  if (isHrAdmin(a)) return true;
  if (a.role === Role.BRAND_ADMIN) return contentBrandId === a.brandId;
  return false;
}

// ── Module 2: User Profile ──────────────────────────────────────────────────

export function isOwnProfile(a: Actor, t: ProfileTarget): boolean {
  return a.id === t.userId;
}

export function managesProfile(a: Actor, t: ProfileTarget): boolean {
  return a.role === Role.MANAGER && t.managerId === a.id;
}

export function canViewProfile(a: Actor, t: ProfileTarget): boolean {
  if (isHrAdmin(a)) return true;
  if (a.role === Role.BRAND_ADMIN) return t.brandId === a.brandId;
  if (isOwnProfile(a, t)) return true;
  if (managesProfile(a, t)) return true;
  return false;
}

// Identity / job family / track edits.
export function canEditIdentity(a: Actor, t: ProfileTarget): boolean {
  if (isHrAdmin(a)) return true;
  if (a.role === Role.BRAND_ADMIN) return t.brandId === a.brandId;
  return false;
}

// Setting a level + editing assessed competency levels.
export function canSetLevel(a: Actor, t: ProfileTarget): boolean {
  if (isHrAdmin(a)) return true;
  if (a.role === Role.BRAND_ADMIN) return t.brandId === a.brandId;
  if (managesProfile(a, t)) return true;
  return false;
}

// Growth path: team member (own), manager (reports). HR/Brand admin read-only.
export function canEditGrowthPath(a: Actor, t: ProfileTarget): boolean {
  if (isOwnProfile(a, t) && a.role === Role.TEAM_MEMBER) return true;
  if (isOwnProfile(a, t)) return true; // anyone may set their own growth path direction
  if (managesProfile(a, t)) return true;
  return false;
}

// Development plan: manager (reports) edit; everyone else read-only.
export function canEditDevPlan(a: Actor, t: ProfileTarget): boolean {
  return managesProfile(a, t);
}

// To-dos: HR/Admin + Brand admin (scope) can ADD. Manager + member can COMPLETE.
export function canAddTodo(a: Actor, t: ProfileTarget): boolean {
  if (isHrAdmin(a)) return true;
  if (a.role === Role.BRAND_ADMIN) return t.brandId === a.brandId;
  return false;
}

export function canCompleteTodo(a: Actor, t: ProfileTarget): boolean {
  if (isHrAdmin(a)) return true;
  if (a.role === Role.BRAND_ADMIN) return t.brandId === a.brandId;
  if (managesProfile(a, t)) return true;
  if (isOwnProfile(a, t)) return true;
  return false;
}

export function canEditPermissionLevel(a: Actor): boolean {
  return isHrAdmin(a);
}

export function canCreateUser(a: Actor): boolean {
  return isHrAdmin(a);
}
