# Homeland Jobs

Africa's freelance marketplace — Day 9 Group Project.

---

## Team

| Name | Role | Branch | Owns |
|---|---|---|---|
| Evans Osumba | Backend Lead | `feature/backend-api` | All `/api/*` routes, DB schema, seed script, auth, admin middleware |
| Developer B | Frontend — Landing Page | `feature/landing-page` | `src/app/page.tsx` and components under `src/components/landing/` |
| Developer C | Frontend — Job Board & Admin | `feature/job-board-admin` | `src/app/jobs/`, `src/app/admin/`, `src/app/login/`, `src/app/register/` |

Sprint Plan: _(add Google Doc / Notion link here)_

---

## Live URLs

| Service | URL |
|---|---|
| Frontend (Vercel) | _(add after deploy)_ |
| Backend / API (same Next.js app on Vercel) | _(add after deploy)_ |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | MySQL 8 via XAMPP (local) |
| Auth | JSON Web Tokens (JWT) + bcrypt |
| DB client | mysql2 |

---

## Project Architecture

```
homeland-jobs/
│
├── sql/
│   └── schema.sql              ← Run this once to create all tables
│
├── scripts/
│   └── seed.ts                 ← Populates DB with demo data (npm run seed)
│
├── src/
│   ├── types/
│   │   └── index.ts            ← Shared TypeScript interfaces (User, Job, Proposal…)
│   │                             Import from here — do not redefine types elsewhere
│   │
│   ├── lib/                    ← Backend utilities (Evans — do not edit)
│   │   ├── db.ts               ← MySQL connection pool + query/execute helpers
│   │   ├── auth.ts             ← signToken(), verifyToken(), getTokenPayload()
│   │   ├── requireAdmin.ts     ← Guard used at the top of every admin route
│   │   └── response.ts         ← ok() and err() — builds the standard JSON envelope
│   │
│   ├── app/
│   │   │
│   │   ├── api/                ← All backend API routes (Evans — do not edit)
│   │   │   ├── auth/
│   │   │   │   ├── login/route.ts
│   │   │   │   └── register/route.ts
│   │   │   ├── jobs/
│   │   │   │   ├── route.ts                  ← GET list / POST create
│   │   │   │   └── [id]/
│   │   │   │       ├── route.ts              ← GET single job
│   │   │   │       ├── status/route.ts       ← PATCH status (admin)
│   │   │   │       └── proposals/route.ts    ← POST proposal
│   │   │   ├── testimonials/route.ts
│   │   │   ├── stats/route.ts
│   │   │   └── admin/
│   │   │       ├── overview/route.ts
│   │   │       ├── jobs/
│   │   │       │   ├── route.ts              ← GET all jobs (all statuses)
│   │   │       │   └── activity/route.ts     ← GET jobs per day (chart data)
│   │   │       └── users/
│   │   │           ├── route.ts              ← GET all users
│   │   │           └── [id]/status/route.ts  ← PATCH activate/suspend
│   │   │
│   │   ├── layout.tsx          ← Root HTML shell — add fonts / global providers here
│   │   ├── globals.css         ← Tailwind base styles
│   │   │
│   │   ├── page.tsx            ← DEV B: Landing page (/)
│   │   │
│   │   ├── jobs/
│   │   │   ├── page.tsx        ← DEV C: Job listing (/jobs)
│   │   │   └── [id]/
│   │   │       └── page.tsx    ← DEV C: Job detail + proposal form (/jobs/:id)
│   │   │
│   │   ├── login/
│   │   │   └── page.tsx        ← DEV C: Login form (/login)
│   │   ├── register/
│   │   │   └── page.tsx        ← DEV C: Register form (/register)
│   │   │
│   │   └── admin/
│   │       ├── page.tsx        ← Redirects to /admin/dashboard
│   │       └── dashboard/
│   │           └── page.tsx    ← DEV C: Admin dashboard (/admin/dashboard)
│   │
│   └── components/             ← Create your UI components here
│       ├── landing/            ← DEV B: HeroSection, FeaturesSection, StatsBar, Testimonials, Footer
│       ├── jobs/               ← DEV C: JobCard, JobFilters, Pagination, ProposalForm
│       └── admin/              ← DEV C: OverviewCards, UsersTable, JobsTable, ActivityChart
```

---

## How the Request Flow Works

```
Browser
  │
  ├── GET /api/jobs             → src/app/api/jobs/route.ts
  │     └── calls query() from lib/db.ts
  │     └── returns ok({ jobs, total }) from lib/response.ts
  │
  ├── POST /api/auth/login      → src/app/api/auth/login/route.ts
  │     └── bcrypt.compare password
  │     └── signToken() from lib/auth.ts
  │     └── returns { token, user }
  │
  └── GET /api/admin/overview   → src/app/api/admin/overview/route.ts
        └── requireAdmin(req)   ← checks Bearer token, verifies role === 'admin'
        └── if not admin → 401 or 403, request stops here
        └── otherwise → query DB and return counts
```

### Standard API response envelope

Every endpoint returns this shape:

```json
{ "success": true,  "data": <payload>, "error": null }
{ "success": false, "data": null,      "error": "message" }
```

Check `success` first. If `false`, display `error` to the user.

---

## Database Schema

```
users
  id          CHAR(36) PK
  name        VARCHAR(100)
  email       VARCHAR(150) UNIQUE
  password    VARCHAR(255)   ← bcrypt hash, never expose this
  role        VARCHAR(20)    ← 'freelancer' | 'client' | 'admin'
  status      VARCHAR(20)    ← 'active' | 'suspended'
  created_at  TIMESTAMP

jobs
  id          CHAR(36) PK
  title       VARCHAR(200)
  description TEXT
  budget      DECIMAL(10,2)
  category    VARCHAR(100)
  status      VARCHAR(20)    ← 'open' | 'paused' | 'closed'
  client_id   CHAR(36)  FK → users.id
  created_at  TIMESTAMP

proposals
  id               CHAR(36) PK
  job_id           CHAR(36)  FK → jobs.id
  freelancer_id    CHAR(36)  FK → users.id
  cover_letter     TEXT
  proposed_amount  DECIMAL(10,2)
  status           VARCHAR(20)   ← 'pending' | 'accepted' | 'rejected'
  created_at       TIMESTAMP

testimonials
  id          CHAR(36) PK
  name        VARCHAR(100)
  role        VARCHAR(100)
  quote       TEXT
  avatar_url  VARCHAR(300)
  created_at  TIMESTAMP
```

---

## Full API Reference

All responses use the envelope above. Protected routes require `Authorization: Bearer <token>`.

### Auth

| Method | Endpoint | Auth | Body | Returns |
|---|---|---|---|---|
| POST | `/api/auth/register` | — | `{ name, email, password, role }` | `{ token, user }` |
| POST | `/api/auth/login` | — | `{ email, password }` | `{ token, user }` |

### Jobs

| Method | Endpoint | Auth | Notes |
|---|---|---|---|
| GET | `/api/jobs` | — | Query params: `search`, `category`, `page`, `limit` |
| GET | `/api/jobs/:id` | — | Single job with client name |
| POST | `/api/jobs` | Bearer | Body: `{ title, description, budget, category }` |
| PATCH | `/api/jobs/:id/status` | Admin | Body: `{ status: "open"\|"paused"\|"closed" }` |
| POST | `/api/jobs/:id/proposals` | Bearer | Body: `{ coverLetter, proposedAmount }` |

### Public

| Method | Endpoint | Returns |
|---|---|---|
| GET | `/api/testimonials` | Array of testimonials |
| GET | `/api/stats` | `{ totalJobs, totalFreelancers, totalContracts }` |

### Admin (admin token required — 401/403 otherwise)

| Method | Endpoint | Notes |
|---|---|---|
| GET | `/api/admin/users` | All users (id, name, email, role, status, joinDate) |
| PATCH | `/api/admin/users/:id/status` | Body: `{ status: "active"\|"suspended" }` |
| GET | `/api/admin/overview` | Counts + roleBreakdown + totalEscrow |
| GET | `/api/admin/jobs` | All jobs, all statuses |
| PATCH | `/api/jobs/:id/status` | Change job status (shared with admin flow) |
| GET | `/api/admin/jobs/activity?days=7` | `[{ date: "YYYY-MM-DD", count: N }]` (7 entries) |

---

## Local Setup (all developers)

### Prerequisites

- **Node.js 20+** — check with `node -v`
- **XAMPP** — download from [apachefriends.org](https://www.apachefriends.org/)
- **Git**

### Step 1 — Clone the repo

```bash
git clone <repo-url>
cd homeland-jobs
```

### Step 2 — Install dependencies

```bash
npm install
```

### Step 3 — Environment file

```bash
copy .env.example .env.local
```

Open `.env.local`. If your XAMPP MySQL has no password (default), leave `DB_PASSWORD=` blank. Otherwise fill it in.

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=homeland_jobs
JWT_SECRET=homeland_jobs_dev_secret_change_in_production
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Step 4 — Start XAMPP MySQL

Open XAMPP Control Panel → click **Start** next to **MySQL**.

### Step 5 — Create the database

Open your browser → `http://localhost/phpmyadmin` → click **SQL** tab → paste and run:

```sql
CREATE DATABASE IF NOT EXISTS homeland_jobs CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Then import the schema — click the **Import** tab, choose `sql/schema.sql`, click **Go**.

Or from a terminal:

```bash
mysql -u root homeland_jobs < sql/schema.sql
```

### Step 6 — Seed demo data

```bash
npm run seed
```

Expected output:
```
✅ Seeded:
   12 jobs
   6 users (1 admin, 2 clients, 3 freelancers)
   3 proposals
   4 testimonials

Admin login:  admin@homelandjobs.com / Admin@1234
Client login: sarah@technairobi.co.ke / Password1!
```

### Step 7 — Run the dev server

```bash
npm run dev
```

App is live at `http://localhost:3000`

---

## Git Workflow

```
main          ← production only — no direct pushes
dev           ← integration branch — all feature branches merge here first
  │
  ├── feature/backend-api       (Evans)
  ├── feature/landing-page      (Dev B)
  └── feature/job-board-admin   (Dev C)
```

**Commit format:** `type(scope): message`

| Type | When to use |
|---|---|
| `feat` | New feature |
| `fix` | Bug fix |
| `style` | UI / CSS only |
| `refactor` | Code restructure, no behaviour change |
| `chore` | Config, deps, tooling |

Examples:
```
feat(jobs): add search filter to job listing page
fix(auth): redirect to login when token expires
style(landing): make hero section mobile responsive
```

**Merge plan:**
1. Evans merges `feature/backend-api` → `dev` first (API must be live before frontend connects)
2. Dev B and Dev C merge their branches → `dev` after confirming API calls work
3. Full integration test on `dev`
4. `dev` → `main` via PR, tag `v1.0.0-day9`

**Conflict rule:** if two people touch the same file, the second person to merge calls the other before resolving — no silent overwrites.

---

## Guide for Dev B — Landing Page

Your file: `src/app/page.tsx`  
Your components folder: `src/components/landing/`

**Suggested components to create:**

| File | What it does |
|---|---|
| `HeroSection.tsx` | Headline, sub-headline, "Find Work" and "Post a Job" buttons |
| `FeaturesSection.tsx` | 3 feature cards with icons |
| `StatsBar.tsx` | Fetches `GET /api/stats` → displays totalJobs, totalFreelancers, totalContracts |
| `TestimonialsSection.tsx` | Fetches `GET /api/testimonials` → renders quote cards |
| `Footer.tsx` | Nav links, copyright |

**Fetching data example:**

```tsx
// In a client component
'use client'
import { useEffect, useState } from 'react'
import type { Stats } from '@/types'

export default function StatsBar() {
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    fetch('/api/stats')
      .then(r => r.json())
      .then(res => { if (res.success) setStats(res.data) })
      .catch(() => {}) // graceful fallback — show skeleton if null
  }, [])

  if (!stats) return <div>Loading stats...</div>

  return (
    <div>
      <span>{stats.totalJobs} Jobs Posted</span>
      <span>{stats.totalFreelancers} Freelancers</span>
      <span>{stats.totalContracts} Contracts Completed</span>
    </div>
  )
}
```

**Important:** assessor will disconnect the backend — always show a skeleton or fallback `0` when `stats` is null, never crash.

---

## Guide for Dev C — Job Board & Admin Panel

### Token storage convention

After login, store token and user like this (be consistent across all pages):

```ts
localStorage.setItem('hj_token', data.token)
localStorage.setItem('hj_user', JSON.stringify(data.user))
```

Read them back:

```ts
const token = localStorage.getItem('hj_token')
const user  = JSON.parse(localStorage.getItem('hj_user') ?? 'null')
```

### Authenticated fetch helper (create once, reuse everywhere)

Create `src/lib/apiFetch.ts`:

```ts
export async function apiFetch(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem('hj_token')
  const res = await fetch(path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  })
  return res.json()
}
```

### Admin dashboard data sources

| Section | Endpoint |
|---|---|
| Overview cards | `GET /api/admin/overview` |
| 7-day chart | `GET /api/admin/jobs/activity?days=7` |
| Users table | `GET /api/admin/users` |
| Toggle user status | `PATCH /api/admin/users/:id/status` body: `{ status }` |
| Jobs table | `GET /api/admin/jobs` |
| Change job status | `PATCH /api/jobs/:id/status` body: `{ status }` |

### Protecting the admin page

```tsx
'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminDashboardPage() {
  const router = useRouter()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('hj_user') ?? 'null')
    if (!user || user.role !== 'admin') router.replace('/login')
  }, [router])

  // ... rest of your dashboard
}
```

Remember: this is a frontend-only check. The backend **always** enforces admin role independently — even if someone bypasses the frontend redirect, the API will return 403.

### Recommended chart library

```bash
npm install recharts
```

Feed it the `/api/admin/jobs/activity` response directly — it returns `[{ date, count }]` which maps straight onto Recharts `<BarChart dataKey="count" />`.

---

## Definition of Done

- [ ] Landing page loads at Vercel URL with no console errors
- [ ] Hero, Features, Testimonials, Stats sections are data-driven (not hardcoded)
- [ ] Graceful fallback when backend is disconnected
- [ ] Job board lists real jobs from the database (minimum 10 seeded)
- [ ] Search box sends a live API request; results update without full page reload
- [ ] Job detail page loads from `/api/jobs/:id`
- [ ] Proposal form submits to the API and shows success or error response
- [ ] Admin login works; unauthenticated access to `/admin/*` returns 401/403 from API
- [ ] Admin dashboard shows live counts, user table with Active/Suspend toggle, jobs table with status control, 7-day chart
- [ ] All admin endpoints reject non-admin tokens server-side
- [ ] Fully mobile responsive at 375 px viewport
- [ ] Both frontend (Vercel) and backend are deployed and publicly accessible
- [ ] `npm run seed` runs cleanly
- [ ] README contains deployed URLs, local setup steps, team names, Sprint Plan link
