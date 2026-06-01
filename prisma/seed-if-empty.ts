import "dotenv/config";
import { PrismaClient } from "@prisma/client";

// Seed only on first boot (empty database). Safe to run on every deploy/start —
// it will NOT wipe or re-seed an already-populated database.
const prisma = new PrismaClient();

async function run() {
  const tracks = await prisma.track.count().catch(() => 0);
  await prisma.$disconnect();
  if (tracks > 0) {
    console.log(`Database already seeded (${tracks} tracks) — skipping.`);
    return;
  }
  console.log("Empty database detected — running seed…");
  await import("./seed");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
