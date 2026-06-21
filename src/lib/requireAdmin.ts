import { NextRequest, NextResponse } from 'next/server'
import { getTokenPayload, JwtPayload } from './auth'
import { err } from './response'

/** Call at the top of every admin route handler.
 *  Returns the JWT payload when the caller is an admin, or a 401/403 Response. */
export function requireAdmin(
  req: NextRequest,
): { payload: JwtPayload; error: null } | { payload: null; error: NextResponse } {
  const payload = getTokenPayload(req)
  if (!payload)              return { payload: null, error: err('Unauthorized', 401) }
  if (payload.role !== 'admin') return { payload: null, error: err('Forbidden — admin only', 403) }
  return { payload, error: null }
}
