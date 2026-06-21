import { NextRequest } from 'next/server'
import { query, execute } from '@/lib/db'
import { getTokenPayload } from '@/lib/auth'
import { ok, err } from '@/lib/response'

// GET /api/jobs?search=&category=&page=1&limit=10
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const search   = searchParams.get('search')   ?? ''
  const category = searchParams.get('category') ?? ''
  const page     = Math.max(1, Number(searchParams.get('page')  ?? 1))
  const limit    = Math.min(50, Math.max(1, Number(searchParams.get('limit') ?? 10)))
  const offset   = (page - 1) * limit

  const conditions: string[] = ["j.status = 'open'"]
  const params: unknown[]    = []

  if (search) {
    conditions.push('(j.title LIKE ? OR j.description LIKE ?)')
    params.push(`%${search}%`, `%${search}%`)
  }
  if (category) {
    conditions.push('j.category = ?')
    params.push(category)
  }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : ''

  const [countRows, jobs] = await Promise.all([
    query<{ total: number }>(
      `SELECT COUNT(*) AS total FROM jobs j ${where}`,
      params,
    ),
    query(
      `SELECT j.id, j.title, j.description, j.budget, j.category, j.status,
              j.created_at, u.name AS client_name
       FROM jobs j
       LEFT JOIN users u ON u.id = j.client_id
       ${where}
       ORDER BY j.created_at DESC
       LIMIT ? OFFSET ?`,
      [...params, limit, offset],
    ),
  ])

  return ok({ jobs, total: countRows[0]?.total ?? 0, page, limit })
}

// POST /api/jobs  (requires auth — any role can post a job; client/admin makes most sense)
export async function POST(req: NextRequest) {
  const payload = getTokenPayload(req)
  if (!payload) return err('Unauthorized', 401)

  const body = await req.json().catch(() => null)
  if (!body) return err('Invalid JSON body')

  const { title, description, budget, category, deadline } = body
  if (!title || !description || budget === undefined) {
    return err('title, description, and budget are required')
  }

  const id = crypto.randomUUID()
  await execute(
    `INSERT INTO jobs (id, title, description, budget, category, client_id)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [id, title, description, budget, category ?? null, payload.sub],
  )

  const rows = await query('SELECT * FROM jobs WHERE id = ?', [id])
  return ok(rows[0], 201)
}
