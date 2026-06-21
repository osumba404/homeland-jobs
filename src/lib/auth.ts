import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'

const SECRET = process.env.JWT_SECRET!

export interface JwtPayload {
  sub: string   // user id
  email: string
  role: string
  iat?: number
  exp?: number
}

export function signToken(payload: Omit<JwtPayload, 'iat' | 'exp'>): string {
  return jwt.sign(payload, SECRET, { expiresIn: '7d' })
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, SECRET) as JwtPayload
}

/** Extract and verify the Bearer token from a request.
 *  Returns null if the token is missing or invalid. */
export function getTokenPayload(req: NextRequest): JwtPayload | null {
  const auth = req.headers.get('authorization') ?? ''
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : ''
  if (!token) return null
  try {
    return verifyToken(token)
  } catch {
    return null
  }
}
