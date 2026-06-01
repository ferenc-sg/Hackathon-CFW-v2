# Career Framework Management System (CFMS)

A web application for managing and operating saas.group's Career Framework —
implementing **Module 1 (Framework Library)** and **Module 2 (User Profile)**
of the [PRD v1.0](#).

Built with **Next.js (App Router) · TypeScript · Prisma · SQLite · Tailwind CSS**.

---

## What's implemented

### Module 1 — Framework Library
- **Data model** for Track, Level, JobFamily, Competency, JobFamilyCompetency,
  CompetencyLevelExpectation (+ version history), and Brand — soft-delete
  (`archivedAt`) and timestamps everywhere (PRD §M1.6).
- **Seeded v1 content**: 5 general competencies (`SHARED_BASELINE`) on both the
  IC and Manager tracks, plus functional competencies for all 8 job families.
  Per-level expectations are stored as **ordered bullet arrays in a JSON column**
  (not text blobs), preserving source order.
- **Read contract** `resolveCompetencies(jobFamilyId, brandId?)` — the single,
  frozen integration seam (`lib/readContract.ts`). Returns general + functional
  competencies with **brand forks** substituted and **brand add-ons** included
  when a brand is supplied.
- **Foundation view** (`/library`): the canonical competency × level grid, with
  views for General (IC), General (Manager), and each job family. Provenance
  markers (`SHARED_BASELINE` locked · `BRAND_ADDON` · `BRAND_FORK` · `CUSTOM`),
  expand/collapse, inline **draft → publish** editing with a diff preview and
  version snapshots, **brand forking**, and **create job family**.
- **Permissions** (§M1.5): the five shared general competencies are a hard block
  for everyone below HR/Admin; Brand/Team Admins are scoped to their own brand.

### Module 2 — User Profile
- **Data model** for User, UserCompetency, LevellingHistoryRecord, TodoItem.
- **Registration** creates a user, auto-assigns competencies via the read
  contract, and creates onboarding to-dos.
- **Profile** (`/people/[id]`): Identity, Role & level, Competencies (general
  and functional visually separated, with assessed levels and dates), Growth
  path, Development plan, Levelling history, and To-do list.
- **Levelling history** is append-only and immutable; setting a level records a
  history entry with the correct method (`MANAGER_MANUAL` / `HR_ADMIN_MANUAL`).
- **Changing job family** re-resolves competencies and **archives** (never
  deletes) ones that no longer apply.
- **Permission matrix** (§M2.2) enforced in every server action and reflected in
  the UI (read-only vs editable per role/scope).

### Navigation & placeholders
- A left sidebar with **Dashboard**, **Framework Library**, **People**, plus
  empty placeholders for **Leveling** (Module 3 — Levelling Flow) and
  **Performance assessment**.
- An "Acting as" switcher (top-left, bottom of sidebar) to impersonate any
  seeded user and see the permission matrix in action (there is no auth module
  in v1 — out of scope per the PRD).

---

## Running locally

```bash
npm install
npm run setup     # prisma generate + db push + seed
npm run dev       # http://localhost:3000
```

Other scripts:

| Script            | Purpose                                            |
|-------------------|----------------------------------------------------|
| `npm run db:seed` | Re-seed the database                               |
| `npm run db:reset`| Drop the SQLite file, re-push the schema, re-seed  |
| `npm run build`   | Production build (type-checks the whole app)       |

### Try it
- **Framework Library** → switch the **Brand context** to *Channable* and open
  the **Engineering** family: "Code Quality & Craft" shows a **brand fork** that
  overrides the baseline, and the general views show Channable's **add-on**
  competency.
- Edit a cell → **Save draft** → **Publish** to see the version bump and diff
  preview. Try editing a *shared baseline* competency while acting as a
  Brand/Team Admin — it's blocked.
- **People** → open a profile, set a level (records immutable history), edit the
  development plan as a manager, complete to-dos.

---

## Content — loaded verbatim from the source spreadsheet

The Framework Library is loaded **strictly from the provided
`CAREER_FRAMEWORK` spreadsheet** — 5 general competencies (defined on both the
IC and Manager tracks) and 54 functional competencies across the 8 job families,
**950 per-level bullets** in total, preserving source order and text exactly.

The extraction is a two-step, re-runnable pipeline:

```bash
# 1. Extract the spreadsheet into structured JSON (per-sheet column mapping)
python3 scripts/extract_framework.py <path-to.xlsx> prisma/framework-content.json
# 2. Load it (the seed reads prisma/framework-content.json)
npm run db:seed
```

`prisma/framework-content.json` is committed, so the seed runs without the
spreadsheet present. Functional competencies are defined on the **IC2–IC5**
levels (as in the source sheets); the general competencies carry IC2–IC5 **and**
M4–M6. Re-running the extractor regenerates the JSON to re-import on demand
(FR17c).

## Deploying so your team can test

The app is a standard Next.js server + a **SQLite** file. The only real
constraint is that the database file must live on **persistent, writable
storage** — so prefer a host that runs a long-lived container with a volume
over an ephemeral serverless platform.

### Option A — container host with a volume (recommended: Railway / Render / Fly.io)
A `Dockerfile` is included. It builds the app and, on start, applies the schema
and seeds **once** if the database is empty (`scripts/docker-start.sh` →
`prisma/seed-if-empty.ts`), so restarts never wipe data.

1. Push this repo to GitHub (already done on your branch).
2. Create a new service from the repo on Railway/Render/Fly — it auto-detects the
   `Dockerfile`.
3. Add a **persistent volume** mounted at `/data`.
4. Set the env var `DATABASE_URL=file:/data/dev.db`.
5. Deploy. Share the public URL with your team.

_Fly.io example:_ `fly launch` (it reads the Dockerfile) → `fly volumes create data -s 1` → set the mount to `/data` in `fly.toml` → `fly deploy`.

### Option B — Vercel (serverless)
Vercel's filesystem is ephemeral, so **SQLite won't persist**. To use Vercel,
switch the datasource to **Postgres** (Vercel Postgres, Neon, or Supabase):
change `provider = "postgresql"` in `prisma/schema.prisma`, set `DATABASE_URL`
to the Postgres connection string, run `prisma db push` + seed once, then deploy.
I can make this switch for you if you'd like to go this route.

### Before you publish — two things to know
- **No authentication in v1** (it's out of scope in the PRD). The "Acting as"
  switcher lets anyone impersonate any role, including HR/Admin. That's ideal for
  a controlled internal test, but **don't expose it publicly without protection**
  — put it behind your VPN/SSO, HTTP basic auth, or the host's password-protect
  feature, or restrict access to your team.
- **Seed data includes demo users.** Real people can be added in-app (People →
  New user) or you can clear the demo users first.

## Out of scope for v1 (per PRD §7)
Levelling Flow execution, onboarding/education UI, performance ratings,
compensation, BambooHR/CultureAmp integration, localisation, hybrid roles,
sub-roles, IC1/IC6 levels (reserved in the data model, not seeded).
