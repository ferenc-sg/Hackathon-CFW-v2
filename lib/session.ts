import { cookies } from "next/headers";
import { prisma } from "./db";
import { Role } from "./enums";
import type { Actor } from "./permissions";

const ACTOR_COOKIE = "cfms_actor";

// The CFMS has no auth module in v1 (out of scope). For demo + permission-matrix
// verification we impersonate a real User via a cookie ("acting as"). Defaults to
// the first HR/Admin so the app is fully usable out of the box.
export async function getActorUser() {
  const store = await cookies();
  const id = store.get(ACTOR_COOKIE)?.value;

  if (id) {
    const u = await prisma.user.findFirst({ where: { id, archivedAt: null } });
    if (u) return u;
  }
  const fallback = await prisma.user.findFirst({
    where: { role: Role.HR_ADMIN, archivedAt: null },
    orderBy: { createdAt: "asc" },
  });
  return fallback ?? prisma.user.findFirst({ where: { archivedAt: null } });
}

export async function getActor(): Promise<Actor | null> {
  const u = await getActorUser();
  if (!u) return null;
  return { id: u.id, role: u.role as Role, brandId: u.brandId };
}

export const ACTOR_COOKIE_NAME = ACTOR_COOKIE;
