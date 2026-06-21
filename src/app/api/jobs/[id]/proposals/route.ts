import { NextRequest } from 'next/server'
import { query, execute } from '@/lib/db'
import { getTokenPayload } from '@/lib/auth'
import { ok, err } from '@/lib/response'

// POST /api/jobs/:id/proposals  (requires auth)
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const payload = getTokenPayload(req)
  if (!payload) return err('Unauthorized', 401)

  // confirm job exists and is open
  const jobs = await query<{ status: string }>(
    'SELECT status FROM jobs WHERE id = ?',
    [params.id],
  )
  if (!jobs.length)              return err('Job not found', 404)
  if (jobs[0].status !== 'open') return err('Job is not accepting proposals')

  const body = await req.json().catch(() => null)
  if (!body) return err('Invalid JSON body')

  const { coverLetter, proposedAmount } = body
  if (proposedAmount === undefined) return err('proposedAmount is required')

  // prevent duplicate proposals from same freelancer
  const existing = await query(
    'SELECT id FROM proposals WHERE job_id = ? AND freelancer_id = ?',
    [params.id, payload.sub],
  )
  if (existing.length > 0) return err('You have already submitted a proposal for this job', 409)

  const id = crypto.randomUUID()
  await execute(
    `INSERT INTO proposals (id, job_id, freelancer_id, cover_letter, proposed_amount)
     VALUES (?, ?, ?, ?, ?)`,
    [id, params.id, payload.sub, coverLetter ?? null, proposedAmount],
  )

  const rows = await query('SELECT * FROM proposals WHERE id = ?', [id])
  return ok(rows[0], 201)
}
