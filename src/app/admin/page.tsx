/*
 * ─── ADMIN ROOT — redirects to /admin/dashboard ───────────────────────────────
 * DEV C: you can turn this into a redirect or leave as-is.
 */

import { redirect } from 'next/navigation'

export default function AdminRootPage() {
  redirect('/admin/dashboard')
}
