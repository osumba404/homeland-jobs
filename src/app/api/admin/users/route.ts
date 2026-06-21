import { NextRequest } from 'next/server'
import { query } from '@/lib/db'
import { requireAdmin } from '@/lib/requireAdmin'
import { ok } from '@/lib/response'

// GET /api/admin/users  — list all users (admin only)
export async function GET(req: NextRequest) {
  const { error } = requireAdmin(req)
  if (error) return error

  const users = await query(
    `SELECT id, name, email, role, status, created_at AS joinDate
     FROM users
     ORDER BY created_at DESC`,
  )
  return ok(users)
}
