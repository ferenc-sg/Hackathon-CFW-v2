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
- **Email + password** sign-in (Auth.js Credentials). Only provisioned users
  (an email matching a non-archived `User` with a password set) may sign in.
  Single sign-on (Google) is deferred for later.
- An "Acting as" switcher (bottom of sidebar, **HR/Admin only**) to impersonate
  any user and see the permission matrix in action, plus a **Sign out** button.

---

## Running locally

```bash
npm install
cp .env.example .env   # AUTH_DEV_BYPASS="true" skips login for local dev
npm run setup          # prisma generate + db push + seed
npm run dev            # http://localhost:3000
```

> **Local auth:** with `AUTH_DEV_BYPASS="true"` the app skips login and acts as
> the first HR/Admin — convenient for development. Set it to `"false"` to use the
> real email+password sign-in (any seeded user, password `password123`).

Other scripts:

| Script            | Purpose                                            |
|-------------------|----------------------------------------------------|
| `npm run db:seed` | Re-seed the database                               |
| `npm run db:reset`| Drop the SQLite file, re-push the schema, re-seed  |
| `npm run build`   | Production build (type-checks the whole app)       |

### Try it
- **Framework Library** → browse **General (IC)**, **General (Manager)**, and
  each job family. Expand cells to see the per-level bullets loaded from the
  spreadsheet. Edit a cell → **Save draft** → **Publish** to see the version bump
  and diff preview. Acting as a Brand/Team Admin, try editing a *shared baseline*
  competency — it's blocked.
- Set a **Brand context** and use **Fork for brand** on a functional competency
  to create a brand variant that overrides the baseline for that brand's users.
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

## Authentication — email + password

Sign-in uses **Auth.js (NextAuth v5)** with a Credentials provider. (Google SSO
is deferred; the scaffolding is in place to add it later without re-architecting.)

- **Who can sign in:** users provisioned in the system — an email matching a
  non-archived `User` that has a password set. An HR/Admin creates people via
  **People → New user** (which sets a password and seeds their competencies +
  onboarding to-dos).
- **Demo password:** the seed gives **every seeded user** the password from
  `SEED_PASSWORD` (default `password123`), so you can sign in as any persona
  (e.g. `ferenc@saas.group` = HR/Admin, `sofia@channable.example` = Manager,
  `diego@channable.example` = Team member) to test the permission matrix.
- **Passwords** are stored as bcrypt hashes (`User.passwordHash`); never in plain
  text. Sessions are stateless JWT cookies; the signed-in email is mapped to the
  `User` record each request to resolve role + brand.
- **Impersonation:** an HR/Admin can "act as" another user; everyone else is
  locked to their own identity. **Sign out** is in the sidebar.

### Setup
Just set a strong `AUTH_SECRET` (and `AUTH_TRUST_HOST=true` behind a proxy).
Generate the secret with `openssl rand -base64 32`. Change `SEED_PASSWORD` to a
non-default value for any shared deployment.

## Deploying so your team can test

The app is a standard Next.js server + a **SQLite** file. The only real
constraint is that the database file must live on **persistent, writable
storage** — so prefer a host that runs a long-lived container with a volume
over an ephemeral serverless platform.

### Recommended — Railway (step-by-step runbook)

A `Dockerfile` is included. On start it applies the schema and seeds the
database **once** if it is empty (`scripts/docker-start.sh` →
`prisma/seed-if-empty.ts`), so restarts and redeploys never wipe data.

> Prerequisite: this branch (`claude/wizardly-brown-PwKUL`) is pushed to GitHub.
> For a stable test URL, you may want to merge it to your default branch first,
> or just deploy this branch directly (step 2 lets you pick the branch).

1. **Create the project.** Go to [railway.app](https://railway.app) → sign in
   with GitHub → **New Project** → **Deploy from GitHub repo** → pick
   `ferenc-sg/Hackathon-CFW-v2`. In the service's **Settings → Source**, set the
   deploy branch to the one you want (e.g. `claude/wizardly-brown-PwKUL`).
   Railway auto-detects the `Dockerfile` and starts the first build.
2. **Add a persistent volume.** Open the service → **Variables/Settings →
   Volumes** (or right-click the service → *Attach Volume*) → create a volume
   and set the **mount path** to `/data`. (1 GB is plenty.)
3. **Set the env vars.** Service → **Variables** → add:
   ```
   DATABASE_URL=file:/data/dev.db
   AUTH_SECRET=<openssl rand -base64 32>
   AUTH_TRUST_HOST=true
   SEED_PASSWORD=<a shared password for the seeded test users>
   ```
   Don't set `PORT` (Railway injects it) and **don't** set `AUTH_DEV_BYPASS`
   (leaving it unset keeps login enforced).
4. **Expose a public URL.** Service → **Settings → Networking → Generate
   Domain** — gives you a `*.up.railway.app` URL.
5. **Redeploy** (Railway usually does this automatically after the volume + var
   changes). Watch the **Deploy logs** — on first boot you'll see
   `Applying database schema…`, `Empty database detected — running seed…`, then
   `Starting Next.js…`.
6. **Sign in and invite your team.** Sign in as `ferenc@saas.group` (seeded
   HR/Admin) with your `SEED_PASSWORD`. Add teammates via **People → New user**
   with their email + a password so they can sign in too.

**If a later deploy ever needs a fresh database** (e.g. you re-import the
spreadsheet): open the service shell / one-off command and run
`npm run db:reset`, or delete the volume and redeploy.

#### Other container hosts
The same image works on Render or Fly.io — create a service from the repo, add a
persistent disk mounted at `/data`, and set `DATABASE_URL=file:/data/dev.db`.
_Fly.io:_ `fly launch` → `fly volumes create data -s 1` → mount it at `/data` in
`fly.toml` → `fly deploy`.

### Alternative — Vercel (requires Postgres)
Vercel's filesystem is ephemeral, so **SQLite won't persist**. To use Vercel,
switch the datasource to **Postgres** (Vercel Postgres, Neon, or Supabase):
change `provider = "postgresql"` in `prisma/schema.prisma`, set `DATABASE_URL`
to the Postgres connection string, run `prisma db push` + seed once, then deploy.
I can make this switch for you if you'd like to go this route.

### Before you publish — things to know
- **Access is gated by email + password** and limited to provisioned users, so
  the URL is only usable by people you've given an account. Make sure
  `AUTH_DEV_BYPASS` is **unset/false** in the deploy (it is by default), and set a
  non-default `SEED_PASSWORD`.
- **This is a shared test password setup**, not production-grade auth (no
  password reset, lockout, or MFA). Fine for an internal test; Google SSO is the
  intended longer-term sign-in.
- **Seed data includes demo users** (e.g. `*.example` accounts) used to showcase
  the permission matrix — they all share the `SEED_PASSWORD`. Remove them once
  real users are added if you prefer a clean directory.

## Out of scope for v1 (per PRD §7)
Levelling Flow execution, onboarding/education UI, performance ratings,
compensation, BambooHR/CultureAmp integration, localisation, hybrid roles,
sub-roles, IC1/IC6 levels (reserved in the data model, not seeded).
