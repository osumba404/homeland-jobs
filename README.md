# Homeland Jobs

Africa's freelance marketplace — Day 9 Group Project.

## Team

| Name | Role | Branch |
|---|---|---|
| Evans Osumba | Backend Lead (API, DB, auth, admin endpoints) | `feature/backend-api` |
| Developer B | Landing Page (Q42) | `feature/landing-page` |
| Developer C | Job Board + Admin Panel (Q43, Q44) | `feature/job-board-admin` |

Sprint Plan: _(add Google Doc / Notion link here)_

---

## Live URLs

| Service | URL |
|---|---|
| Frontend (Vercel) | _(add after deploy)_ |
| Backend (Railway / Vercel) | _(add after deploy)_ |

---

## Local Setup

### Prerequisites

- Node.js 20+
- XAMPP with MySQL running (default port 3306, root user, no password)

### 1 — Clone and install

```bash
git clone <repo-url>
cd homeland-jobs
npm install
```

### 2 — Environment

```bash
cp .env.example .env.local
# Edit .env.local if your XAMPP MySQL password is not blank
```

### 3 — Create the database

Open phpMyAdmin (http://localhost/phpmyadmin) and run:

```sql
source /path/to/homeland-jobs/sql/schema.sql
```

Or from the terminal:

```bash
mysql -u root homeland_jobs < sql/schema.sql
```

### 4 — Seed

```bash
npm run seed
```

This inserts 12 jobs, 6 users, 3 proposals, and 4 testimonials.

**Admin login:** `admin@homelandjobs.com` / `Admin@1234`  
**Client login:** `sarah@technairobi.co.ke` / `Password1!`

### 5 — Run dev server

```bash
npm run dev
# → http://localhost:3000
```

---

## API Reference

All responses follow this envelope:

```json
{ "success": true, "data": <payload>, "error": null }
```

### Auth

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | — | Register a new user |
| POST | `/api/auth/login` | — | Login, returns JWT |

### Jobs

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/jobs` | — | List open jobs (search, category, page, limit) |
| GET | `/api/jobs/:id` | — | Single job detail |
| POST | `/api/jobs` | Bearer token | Create a job |
| PATCH | `/api/jobs/:id/status` | Admin token | Change job status |
| POST | `/api/jobs/:id/proposals` | Bearer token | Submit a proposal |

### Public

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/testimonials` | All testimonials |
| GET | `/api/stats` | totalJobs, totalFreelancers, totalContracts |

### Admin (requires `Authorization: Bearer <admin-token>`)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/admin/users` | All users |
| PATCH | `/api/admin/users/:id/status` | Activate / suspend user |
| GET | `/api/admin/overview` | Counts + role breakdown + escrow |
| GET | `/api/admin/jobs` | All jobs (all statuses) |
| GET | `/api/admin/jobs/activity?days=7` | Jobs posted per day |

---

## Git Branching

```
main          ← production only, no direct pushes
dev           ← integration, all PRs merge here first
  feature/backend-api       (Evans)
  feature/landing-page      (Dev B)
  feature/job-board-admin   (Dev C)
```

Commit format: `type(scope): message`  
Examples: `feat(jobs): add search filter endpoint` · `fix(auth): handle expired token`

---

## Definition of Done

- [ ] Landing page loads at Vercel URL with no console errors
- [ ] Hero, Features, Testimonials, Stats sections data-driven (not hardcoded)
- [ ] Graceful fallback when backend is disconnected
- [ ] Job board shows ≥ 10 real seeded jobs
- [ ] Search sends live API requests
- [ ] Job detail loads from `/api/jobs/:id`
- [ ] Proposal form calls API and shows success/error
- [ ] Admin login works; `/admin/*` returns 401/403 without valid admin token
- [ ] Admin dashboard: live counts, user table with toggle, jobs table, 7-day chart
- [ ] All admin endpoints reject non-admin tokens server-side
- [ ] Fully mobile responsive at 375 px
- [ ] Both Vercel and Railway deployed and publicly accessible
- [ ] `npm run seed` runs cleanly
- [ ] README has deployed URLs, local setup steps, team names, Sprint Plan link
