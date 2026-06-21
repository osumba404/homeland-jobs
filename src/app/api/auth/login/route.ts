import { NextRequest } from 'next/server'
import bcrypt from 'bcryptjs'
import { query } from '@/lib/db'
import { signToken } from '@/lib/auth'
import { ok, err } from '@/lib/response'

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  if (!body) return err('Invalid JSON body')

  const { email, password } = body
  if (!email || !password) return err('email and password are required')

  const rows = await query<{
    id: string; name: string; email: string; password: string; role: string; status: string
  }>('SELECT id, name, email, password, role, status FROM users WHERE email = ?', [email])

  const user = rows[0]
  if (!user) return err('Invalid credentials', 401)
  if (user.status === 'suspended') return err('Account suspended', 403)

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) return err('Invalid credentials', 401)

  const token = signToken({ sub: user.id, email: user.email, role: user.role })

  return ok({
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  })
}
