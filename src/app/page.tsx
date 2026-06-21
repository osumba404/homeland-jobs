/*
 * ─── LANDING PAGE — DEV B owns this file ─────────────────────────────────────
 *
 * Sections to build (see Q42):
 *   1. Hero        — headline, sub-headline, two CTA buttons:
 *                    "Find Work" → /jobs  |  "Post a Job" → /jobs/post
 *   2. Features    — 3 feature cards with icons (e.g. from lucide-react or heroicons)
 *   3. Stats bar   — fetch from GET /api/stats  → { totalJobs, totalFreelancers, totalContracts }
 *                    Show a graceful skeleton/fallback when the API is unreachable.
 *   4. Testimonials — fetch from GET /api/testimonials → array of { name, role, quote, avatar_url }
 *                    Render as a card grid or carousel. Fallback to empty state if API is down.
 *   5. Footer      — nav links, copyright
 *
 * Suggested component breakdown (create under src/components/landing/):
 *   HeroSection.tsx
 *   FeaturesSection.tsx
 *   StatsBar.tsx        ← calls /api/stats
 *   TestimonialsSection.tsx  ← calls /api/testimonials
 *   Footer.tsx
 *
 * Fetching tip: use React Server Components for initial data + a client fallback,
 * OR mark the page "use client" and use useEffect / SWR / React Query.
 *
 * Mobile: must look great at 375 px — use Tailwind responsive prefixes (sm:, md:, lg:).
 */

export default function HomePage() {
  return (
    <main>
      {/* DEV B: replace this placeholder with the real sections above */}
      <p className="p-8 text-center text-gray-500">
        Landing page — to be built by Dev B
      </p>
    </main>
  )
}
