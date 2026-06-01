#!/bin/sh
# Container entrypoint: ensure the schema is applied, seed once if the database
# is empty, then start the Next.js server. Safe to re-run on every restart.
set -e

echo "→ Applying database schema (prisma db push)…"
npx prisma db push --skip-generate

echo "→ Seeding if empty…"
npx tsx prisma/seed-if-empty.ts

echo "→ Backfilling missing passwords…"
npx tsx prisma/backfill-passwords.ts

echo "→ Starting Next.js…"
exec npm run start
