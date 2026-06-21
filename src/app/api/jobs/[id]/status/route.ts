import { NextRequest } from 'next/server'
import { execute, query } from '@/lib/db'
import { getTokenPayload } from '@/lib/auth'
import { ok, err } from '@/lib/response'

// PATCH /api/jobs/:id/status  (admin only)
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const payload = getTokenPayload(req)
  if (!payload)              return err('Unauthorized', 401)
  if (payload.role !== 'admin') return err('Forbidden — admin only', 403)

  const body = await req.json().catch(() => null)
  if (!body) return err('Invalid JSON body')

  const { status } = body
  const valid = ['open', 'paused', 'closed']
  if (!valid.includes(status)) {
    return err(`status must be one of: ${valid.join(', ')}`)
  }

  const result = await execute(
    'UPDATE jobs SET status = ? WHERE id = ?',
    [status, params.id],
  )
  if (result.affectedRows === 0) return err('Job not found', 404)

  const rows = await query('SELECT * FROM jobs WHERE id = ?', [params.id])
  return ok(rows[0])
}
