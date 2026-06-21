/*
 * ─── JOB DETAIL PAGE — DEV C owns this file ──────────────────────────────────
 *
 * Route: /jobs/[id]
 *
 * What to build (see Q43):
 *   • Fetch a single job:  GET /api/jobs/:id
 *     Response: { success, data: Job, error }
 *   • Display: title, description, budget, category, client name, posted date, status badge
 *   • Proposal form (show only when user is logged in as freelancer):
 *       Fields: coverLetter (textarea), proposedAmount (number input)
 *       On submit: POST /api/jobs/:id/proposals
 *         Headers: Authorization: Bearer <token>
 *         Body: { coverLetter, proposedAmount }
 *       Show success message or API error message to the user.
 *   • If the user is NOT logged in, show a "Log in to apply" CTA.
 *
 * Auth token storage: read from localStorage key "hj_token" (or a cookie — your choice,
 * but be consistent with however the login page stores it).
 *
 * API contract (backend — Evans):
 *   GET  /api/jobs/:id          → { success, data: Job, error }
 *   POST /api/jobs/:id/proposals
 *     Headers: Authorization: Bearer <token>
 *     Body: { coverLetter: string, proposedAmount: number }
 *     → { success, data: Proposal, error }
 */

export default function JobDetailPage({ params }: { params: { id: string } }) {
  return (
    <main>
      {/* DEV C: replace with real job detail UI */}
      <p className="p-8 text-center text-gray-500">
        Job detail page for {params.id} — to be built by Dev C
      </p>
    </main>
  )
}
