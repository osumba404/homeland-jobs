import { NextRequest } from 'next/server'
import { query } from '@/lib/db'
import { ok, err } from '@/lib/response'

// GET /api/jobs/:id
export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  const rows = await query(
    `SELECT j.*, u.name AS client_name
     FROM jobs j
     LEFT JOIN users u ON u.id = j.client_id
     WHERE j.id = ?`,
    [params.id],
  )
  if (!rows.length) return err('Job not found', 404)
  return ok(rows[0])
}
