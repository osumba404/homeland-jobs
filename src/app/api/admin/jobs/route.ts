import { NextRequest } from 'next/server'
import { query } from '@/lib/db'
import { requireAdmin } from '@/lib/requireAdmin'
import { ok } from '@/lib/response'

// GET /api/admin/jobs  — all jobs regardless of status (admin only)
export async function GET(req: NextRequest) {
  const { error } = requireAdmin(req)
  if (error) return error

  const jobs = await query(
    `SELECT j.id, j.title, j.category, j.budget, j.status, j.created_at,
            u.name AS client_name
     FROM jobs j
     LEFT JOIN users u ON u.id = j.client_id
     ORDER BY j.created_at DESC`,
  )
  return ok(jobs)
}
