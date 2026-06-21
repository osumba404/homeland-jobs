import { query } from '@/lib/db'
import { ok } from '@/lib/response'

// GET /api/stats
export async function GET() {
  const [jobs, freelancers, contracts] = await Promise.all([
    query<{ total: number }>('SELECT COUNT(*) AS total FROM jobs'),
    query<{ total: number }>("SELECT COUNT(*) AS total FROM users WHERE role = 'freelancer'"),
    // "contracts" = proposals that were accepted
    query<{ total: number }>("SELECT COUNT(*) AS total FROM proposals WHERE status = 'accepted'"),
  ])

  return ok({
    totalJobs:        jobs[0]?.total        ?? 0,
    totalFreelancers: freelancers[0]?.total ?? 0,
    totalContracts:   contracts[0]?.total   ?? 0,
  })
}
