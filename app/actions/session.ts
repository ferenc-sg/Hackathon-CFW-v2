"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { ACTOR_COOKIE_NAME, getSelf } from "@/lib/session";
import { signOut } from "@/auth";
import { Role } from "@/lib/enums";

// HR/Admin-only impersonation ("act as") for testing the permission matrix.
export async function setActor(formData: FormData) {
  const self = await getSelf();
  if (!self || self.role !== Role.HR_ADMIN) throw new Error("Not permitted to impersonate.");

  const id = String(formData.get("userId") ?? "");
  const store = await cookies();
  if (id && id !== self.id) {
    store.set(ACTOR_COOKIE_NAME, id, { httpOnly: true, sameSite: "lax", path: "/" });
  } else {
    store.delete(ACTOR_COOKIE_NAME);
  }
  revalidatePath("/", "layout");
}

export async function stopImpersonating() {
  const store = await cookies();
  store.delete(ACTOR_COOKIE_NAME);
  revalidatePath("/", "layout");
}

export async function signOutAction() {
  const store = await cookies();
  store.delete(ACTOR_COOKIE_NAME);
  await signOut({ redirectTo: "/login" });
}
