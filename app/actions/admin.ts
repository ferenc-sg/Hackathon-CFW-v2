"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { getActor } from "@/lib/session";
import { canManageOrg } from "@/lib/permissions";

async function requireOrgAdmin() {
  const actor = await getActor();
  if (!actor || !canManageOrg(actor)) throw new Error("Only HR/Admin can manage the organisation.");
  return actor;
}

// ── Organisation: Brands CRUD (HR/Admin only) ───────────────────────────────

export async function createBrand(formData: FormData) {
  await requireOrgAdmin();
  const name = String(formData.get("name") || "").trim();
  if (!name) throw new Error("Brand name is required.");

  const existing = await prisma.brand.findFirst({ where: { name } });
  if (existing) {
    // Un-archive if it was previously removed, otherwise no-op.
    if (existing.archivedAt) {
      await prisma.brand.update({ where: { id: existing.id }, data: { archivedAt: null } });
    }
  } else {
    await prisma.brand.create({ data: { name } });
  }
  revalidatePath("/admin");
}

export async function renameBrand(formData: FormData) {
  await requireOrgAdmin();
  const id = String(formData.get("brandId"));
  const name = String(formData.get("name") || "").trim();
  if (!name) throw new Error("Brand name is required.");
  await prisma.brand.update({ where: { id }, data: { name } });
  revalidatePath("/admin");
}

export async function archiveBrand(formData: FormData) {
  await requireOrgAdmin();
  const id = String(formData.get("brandId"));

  // Guard: don't remove a brand that still has active users.
  const userCount = await prisma.user.count({ where: { brandId: id, archivedAt: null } });
  if (userCount > 0) {
    throw new Error(`Cannot remove a brand with ${userCount} active user(s). Reassign them first.`);
  }
  await prisma.brand.update({ where: { id }, data: { archivedAt: new Date() } });
  revalidatePath("/admin");
}
