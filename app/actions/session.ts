"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { ACTOR_COOKIE_NAME } from "@/lib/session";

// Switch the "acting as" user (no auth in v1 — see lib/session.ts).
export async function setActor(formData: FormData) {
  const id = String(formData.get("userId") ?? "");
  const store = await cookies();
  if (id) store.set(ACTOR_COOKIE_NAME, id, { httpOnly: false, sameSite: "lax", path: "/" });
  revalidatePath("/", "layout");
}
