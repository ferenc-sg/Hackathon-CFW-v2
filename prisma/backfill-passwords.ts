import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../lib/password";

// Self-healing step run on container start: any user without a password (e.g.
// rows seeded before email+password login existed) gets the SEED_PASSWORD so
// they can sign in. Non-destructive — users that already have a password keep it.
const prisma = new PrismaClient();

async function run() {
  const missing = await prisma.user.count({ where: { passwordHash: null, archivedAt: null } });
  if (missing === 0) {
    console.log("All users already have a password — nothing to backfill.");
    await prisma.$disconnect();
    return;
  }
  const password = process.env.SEED_PASSWORD || "password123";
  const hash = await hashPassword(password);
  await prisma.user.updateMany({ where: { passwordHash: null }, data: { passwordHash: hash } });
  console.log(`Backfilled passwords for ${missing} user(s) using SEED_PASSWORD.`);
  await prisma.$disconnect();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
