#!/bin/sh
# Container entrypoint: ensure the schema is applied, seed once if the database
# is empty, then start the Next.js server. Safe to re-run on every restart.
set -e

echo "→ Applying database schema (prisma db push)…"
# --accept-data-loss lets the startup reconcile schema changes such as dropping
# the now-unused passwordHash column. Career-framework data is unaffected.
npx prisma db push --skip-generate --accept-data-loss

echo "→ Seeding if empty…"
npx tsx prisma/seed-if-empty.ts

echo "→ Starting Next.js…"
exec npm run start
