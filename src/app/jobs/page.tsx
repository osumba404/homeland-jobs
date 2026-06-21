/*
 * ─── JOB LISTING PAGE — DEV C owns this file ─────────────────────────────────
 *
 * Route: /jobs
 *
 * What to build (see Q43):
 *   • Fetch jobs from GET /api/jobs?search=&category=&page=&limit=
 *   • Render a grid/list of JobCard components (create src/components/jobs/JobCard.tsx)
 *   • Search box: typing triggers a new API call — do NOT do client-side filtering only.
 *     Use a debounce (300 ms) to avoid a request per keystroke.
 *   • Category filter dropdown — populate from unique categories returned by the API,
 *     OR hardcode the list: Web Development, Design, Mobile Development, etc.
 *   • Pagination — use the `total` field from the response envelope.
 *   • Each card links to /jobs/[id]
 *
 * API contract (from Evans / backend):
 *   GET /api/jobs
 *   Query params: search (string), category (string), page (number), limit (number)
 *   Response: { success, data: { jobs: Job[], total: number, page, limit }, error }
 *
 * Suggested structure:
 *   src/components/jobs/
 *     JobCard.tsx
 *     JobFilters.tsx   ← search input + category dropdown
 *     Pagination.tsx
 */

export default function JobsPage() {
  return (
    <main>
      {/* DEV C: replace with real job listing UI */}
      <p className="p-8 text-center text-gray-500">
        Job listing page — to be built by Dev C
      </p>
    </main>
  )
}
