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

## Notes on content fidelity

The source spreadsheet (FR9) was not provided to this build, so the seeded
competency text is **representative and structurally faithful** — correct
shapes, ordering, tracks, and per-level bullet arrays. The PRD's re-runnable
importer with naming-mismatch reconciliation (FR17c) is the intended mechanism
to load the authoritative spreadsheet content on top of this structure.

## Out of scope for v1 (per PRD §7)
Levelling Flow execution, onboarding/education UI, performance ratings,
compensation, BambooHR/CultureAmp integration, localisation, hybrid roles,
sub-roles, IC1/IC6 levels (reserved in the data model, not seeded).
