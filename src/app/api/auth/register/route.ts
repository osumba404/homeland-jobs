import { NextRequest } from 'next/server'
import bcrypt from 'bcryptjs'
import { query, execute } from '@/lib/db'
import { signToken } from '@/lib/auth'
import { ok, err } from '@/lib/response'

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  if (!body) return err('Invalid JSON body')

  const { name, email, password, role = 'freelancer' } = body

  if (!name || !email || !password) {
    return err('name, email, and password are required')
  }

  const validRoles = ['freelancer', 'client', 'admin']
  if (!validRoles.includes(role)) {
    return err(`role must be one of: ${validRoles.join(', ')}`)
  }

  // check duplicate
  const existing = await query('SELECT id FROM users WHERE email = ?', [email])
  if (existing.length > 0) return err('Email already in use', 409)

  const id = crypto.randomUUID()
  const hashed = await bcrypt.hash(password, 12)

  await execute(
    'INSERT INTO users (id, name, email, password, role) VALUES (?, ?, ?, ?, ?)',
    [id, name, email, hashed, role],
  )

  const token = signToken({ sub: id, email, role })
  return ok({ token, user: { id, name, email, role } }, 201)
}
