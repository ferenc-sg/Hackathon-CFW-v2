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
- **Google SSO** sign-in (Auth.js). Only provisioned users (an email matching a
  non-archived `User`) may sign in; everyone else sees an access-denied message.
- An "Acting as" switcher (bottom of sidebar, **HR/Admin only**) to impersonate
  any user and see the permission matrix in action, plus a **Sign out** button.

---

## Running locally

```bash
npm install
cp .env.example .env   # then set AUTH_DEV_BYPASS="true" for local dev (skips Google SSO)
npm run setup          # prisma generate + db push + seed
npm run dev            # http://localhost:3000
```

> **Local auth:** with `AUTH_DEV_BYPASS="true"` the app skips Google SSO and acts
> as the first HR/Admin — convenient for development. To exercise the real
> sign-in flow locally, set it to `"false"` and provide `AUTH_GOOGLE_ID` /
> `AUTH_GOOGLE_SECRET` / `AUTH_SECRET` (see [Authentication](#authentication--google-sso)).

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

## Authentication — Google SSO

Sign-in uses **Auth.js (NextAuth v5)** with the Google provider.

- **Who can sign in:** only people who have a profile in the system — i.e. a
  Google email that matches a non-archived `User`. Everyone else is rejected with
  an access-denied message. An HR/Admin provisions people via **People → New
  user** (which also seeds their competencies and onboarding to-dos). Optionally
  set `AUTH_ALLOWED_DOMAIN=saas.group` to additionally restrict by email domain.
- **Sessions:** stateless JWT cookies (no session tables). The signed-in email is
  mapped to the `User` record on each request to resolve role + brand.
- **Impersonation:** an HR/Admin can "act as" another user to test the permission
  matrix; everyone else is locked to their own identity. **Sign out** is in the
  sidebar.

### One-time Google Cloud setup
1. [console.cloud.google.com](https://console.cloud.google.com) → create/select a
   project → **APIs & Services → OAuth consent screen** → configure (Internal if
   you have a Google Workspace for saas.group).
2. **APIs & Services → Credentials → Create credentials → OAuth client ID** →
   type **Web application**.
3. **Authorized redirect URI:** add
   `https://<your-domain>/api/auth/callback/google`
   (e.g. `https://your-app.up.railway.app/api/auth/callback/google`; for local
   testing also add `http://localhost:3000/api/auth/callback/google`).
4. Copy the **Client ID** and **Client secret** into `AUTH_GOOGLE_ID` /
   `AUTH_GOOGLE_SECRET`.
5. Generate `AUTH_SECRET` with `openssl rand -base64 32`.

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
   AUTH_GOOGLE_ID=<from Google Cloud>
   AUTH_GOOGLE_SECRET=<from Google Cloud>
   AUTH_TRUST_HOST=true
   # optional: AUTH_ALLOWED_DOMAIN=saas.group
   ```
   Don't set `PORT` (Railway injects it) and **don't** set `AUTH_DEV_BYPASS`
   (leaving it unset keeps SSO enforced).
4. **Expose a public URL.** Service → **Settings → Networking → Generate
   Domain**. This gives you a `*.up.railway.app` URL. Then add
   `https://<that-domain>/api/auth/callback/google` as an authorized redirect URI
   in your Google OAuth client (see [Authentication](#authentication--google-sso)).
5. **Redeploy** (Railway usually does this automatically after the volume + var
   changes). Watch the **Deploy logs** — on first boot you'll see
   `Applying database schema…`, `Empty database detected — running seed…`, then
   `Starting Next.js…`.
6. **Sign in and invite your team.** Sign in with your Google account
   (`ferenc@saas.group` is seeded as HR/Admin). Add teammates via **People → New
   user** with their work email so they can sign in too.

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
- **Access is gated by Google SSO** and limited to provisioned users, so the URL
  is safe to share — only people you've added (and who pass the optional domain
  check) can get in. Make sure `AUTH_DEV_BYPASS` is **unset/false** in the deploy
  (it is by default).
- **Seed data includes demo users** (e.g. `*.example` accounts) used to showcase
  the permission matrix. They can't actually sign in (no real Google account);
  remove them once real users are added if you prefer a clean directory.

## Out of scope for v1 (per PRD §7)
Levelling Flow execution, onboarding/education UI, performance ratings,
compensation, BambooHR/CultureAmp integration, localisation, hybrid roles,
sub-roles, IC1/IC6 levels (reserved in the data model, not seeded).
