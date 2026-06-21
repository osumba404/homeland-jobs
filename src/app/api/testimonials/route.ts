import { query } from '@/lib/db'
import { ok } from '@/lib/response'

// GET /api/testimonials
export async function GET() {
  const testimonials = await query(
    'SELECT id, name, role, quote, avatar_url, created_at FROM testimonials ORDER BY created_at DESC',
  )
  return ok(testimonials)
}
