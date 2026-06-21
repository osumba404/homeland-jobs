import { NextRequest } from 'next/server'
import { query } from '@/lib/db'
import { requireAdmin } from '@/lib/requireAdmin'
import { ok } from '@/lib/response'

// GET /api/admin/jobs/activity?days=7  (admin only)
// Returns jobs posted per day for the last N days
export async function GET(req: NextRequest) {
  const { error } = requireAdmin(req)
  if (error) return error

  const days = Math.min(90, Math.max(1, Number(new URL(req.url).searchParams.get('days') ?? 7)))

  const rows = await query<{ date: string; count: number }>(
    `SELECT DATE(created_at) AS date, COUNT(*) AS count
     FROM jobs
     WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL ? DAY)
     GROUP BY DATE(created_at)
     ORDER BY date ASC`,
    [days],
  )

  // Fill in days with zero counts so the chart has a continuous x-axis
  const map = new Map(rows.map((r) => [r.date, r.count]))
  const result: { date: string; count: number }[] = []
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const key = d.toISOString().slice(0, 10)
    result.push({ date: key, count: map.get(key) ?? 0 })
  }

  return ok(result)
}
