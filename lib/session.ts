import { cookies } from "next/headers";
import { prisma } from "./db";
import { Role } from "./enums";
import { auth } from "@/auth";
import type { Actor } from "./permissions";

const ACTOR_COOKIE = "cfms_impersonate";

const devBypass = process.env.AUTH_DEV_BYPASS === "true";

// The real, authenticated user (signed-in email → provisioned User record).
// With AUTH_DEV_BYPASS the first HR/Admin is returned (local development only).
export async function getSelfUser() {
  if (devBypass) {
    return prisma.user.findFirst({
      where: { role: Role.HR_ADMIN, archivedAt: null },
      orderBy: { createdAt: "asc" },
    });
  }
  const session = await auth();
  const email = session?.user?.email?.toLowerCase();
  if (!email) return null;
  return prisma.user.findFirst({ where: { email, archivedAt: null } });
}

// The effective actor: normally the authenticated user, but an HR/Admin may
// "act as" another user for testing (impersonation cookie). Non-admins always
// act as themselves.
export async function getActorUser() {
  const self = await getSelfUser();
  if (!self) return null;

  const store = await cookies();
  const impersonateId = store.get(ACTOR_COOKIE)?.value;
  if (impersonateId && self.role === Role.HR_ADMIN && impersonateId !== self.id) {
    const target = await prisma.user.findFirst({
      where: { id: impersonateId, archivedAt: null },
    });
    if (target) return target;
  }
  return self;
}

export async function getActor(): Promise<Actor | null> {
  const u = await getActorUser();
  if (!u) return null;
  return { id: u.id, role: u.role as Role, brandId: u.brandId };
}

export async function getSelf(): Promise<Actor | null> {
  const u = await getSelfUser();
  if (!u) return null;
  return { id: u.id, role: u.role as Role, brandId: u.brandId };
}

export const ACTOR_COOKIE_NAME = ACTOR_COOKIE;
