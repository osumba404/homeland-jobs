import { NextRequest } from 'next/server'
import { query } from '@/lib/db'
import { requireAdmin } from '@/lib/requireAdmin'
import { ok } from '@/lib/response'

// GET /api/admin/overview  (admin only)
export async function GET(req: NextRequest) {
  const { error } = requireAdmin(req)
  if (error) return error

  const [
    userCount,
    roleBreakdown,
    jobCount,
    proposalCount,
    escrow,
  ] = await Promise.all([
    query<{ total: number }>('SELECT COUNT(*) AS total FROM users'),
    query<{ role: string; count: number }>(
      'SELECT role, COUNT(*) AS count FROM users GROUP BY role',
    ),
    query<{ total: number }>('SELECT COUNT(*) AS total FROM jobs'),
    query<{ total: number }>('SELECT COUNT(*) AS total FROM proposals'),
    // Total escrow = sum of accepted proposals' amounts
    query<{ total: number }>(
      "SELECT COALESCE(SUM(proposed_amount), 0) AS total FROM proposals WHERE status = 'accepted'",
    ),
  ])

  return ok({
    totalUsers:    userCount[0]?.total    ?? 0,
    roleBreakdown: Object.fromEntries(roleBreakdown.map((r) => [r.role, r.count])),
    totalJobs:     jobCount[0]?.total     ?? 0,
    totalProposals: proposalCount[0]?.total ?? 0,
    totalEscrow:   escrow[0]?.total       ?? 0,
  })
}
