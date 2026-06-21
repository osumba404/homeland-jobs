/*
 * ─── ADMIN DASHBOARD — DEV C owns this file ──────────────────────────────────
 *
 * Route: /admin/dashboard
 * Protection: read hj_user from localStorage; if role !== 'admin', redirect to /login.
 *             The BACKEND also rejects non-admin tokens — so this is defence in depth only.
 *
 * Sections to build (see Q44):
 *
 * 1. OVERVIEW CARDS  — GET /api/admin/overview
 *      Headers: Authorization: Bearer <token>
 *      Response: { totalUsers, roleBreakdown, totalJobs, totalProposals, totalEscrow }
 *      Show 4–5 stat cards (e.g. "Total Users", "Total Jobs", "Proposals", "Escrow Value")
 *      roleBreakdown is { freelancer: N, client: N, admin: N } — can show as a mini table or badges
 *
 * 2. JOBS ACTIVITY CHART  — GET /api/admin/jobs/activity?days=7
 *      Headers: Authorization: Bearer <token>
 *      Response: [{ date: "2025-01-01", count: 3 }, ...]  (7 entries)
 *      Use Recharts or Chart.js — a BarChart or LineChart is fine.
 *      Suggested package: npm install recharts
 *
 * 3. USER MANAGEMENT TABLE  — GET /api/admin/users
 *      Columns: Name | Email | Role | Join Date | Status | Action
 *      "Action" = toggle button: "Suspend" (if active) or "Activate" (if suspended)
 *        → calls PATCH /api/admin/users/:id/status  Body: { status: "active" | "suspended" }
 *      Update the row in-place without a full page reload.
 *
 * 4. JOBS MANAGEMENT TABLE  — GET /api/jobs (no auth needed, but filter to all statuses)
 *      Wait — admin needs to see ALL jobs (including paused/closed), so either:
 *        a) Add an admin-only GET /api/admin/jobs endpoint (ask Evans to add if needed), OR
 *        b) Use GET /api/jobs without the `status=open` filter — Evans removed the open-only
 *           restriction on the admin side, so test what comes back.
 *      Columns: Title | Category | Budget | Status | Client | Actions
 *      "Actions" = dropdown or buttons to change status:
 *        → PATCH /api/jobs/:id/status  Body: { status: "open" | "paused" | "closed" }
 *          Headers: Authorization: Bearer <token>
 *
 * Token retrieval: const token = localStorage.getItem('hj_token')
 * Include in every request: headers: { Authorization: `Bearer ${token}` }
 *
 * IMPORTANT: The backend enforces admin-only access server-side.
 * Even if someone skips the frontend check, the API will return 403.
 */

export default function AdminDashboardPage() {
  return (
    <main>
      {/* DEV C: replace with real admin dashboard UI */}
      <p className="p-8 text-center text-gray-500">
        Admin dashboard — to be built by Dev C
      </p>
    </main>
  )
}
