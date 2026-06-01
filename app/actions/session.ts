"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { ACTOR_COOKIE_NAME } from "@/lib/session";

// The app is open (no auth). The "act as" switcher selects which user you are
// viewing as, via a cookie.
export async function setActor(formData: FormData) {
  const id = String(formData.get("userId") ?? "");
  const store = await cookies();
  if (id) {
    store.set(ACTOR_COOKIE_NAME, id, { httpOnly: false, sameSite: "lax", path: "/" });
  } else {
    store.delete(ACTOR_COOKIE_NAME);
  }
  revalidatePath("/", "layout");
}
