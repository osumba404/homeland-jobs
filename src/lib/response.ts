import { NextResponse } from 'next/server'

/** Standard response envelope: { success, data, error } */
export function ok(data: unknown, status = 200) {
  return NextResponse.json({ success: true, data, error: null }, { status })
}

export function err(message: string, status = 400) {
  return NextResponse.json({ success: false, data: null, error: message }, { status })
}
