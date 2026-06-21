import { NextRequest } from 'next/server'
import { execute, query } from '@/lib/db'
import { requireAdmin } from '@/lib/requireAdmin'
import { ok, err } from '@/lib/response'

// PATCH /api/admin/users/:id/status  (admin only)
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { error } = requireAdmin(req)
  if (error) return error

  const body = await req.json().catch(() => null)
  if (!body) return err('Invalid JSON body')

  const { status } = body
  if (!['active', 'suspended'].includes(status)) {
    return err('status must be "active" or "suspended"')
  }

  const result = await execute(
    'UPDATE users SET status = ? WHERE id = ?',
    [status, params.id],
  )
  if (result.affectedRows === 0) return err('User not found', 404)

  const rows = await query(
    'SELECT id, name, email, role, status, created_at AS joinDate FROM users WHERE id = ?',
    [params.id],
  )
  return ok(rows[0])
}
