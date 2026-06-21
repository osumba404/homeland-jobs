/*
 * ─── REGISTER PAGE — DEV C owns this file ────────────────────────────────────
 *
 * Route: /register
 *
 * What to build:
 *   • Form: name, email, password, role (select: freelancer | client)
 *   • On submit: POST /api/auth/register  Body: { name, email, password, role }
 *     Response: { success, data: { token, user }, error }
 *   • On success: store token + user (same as login), redirect to /jobs
 *   • Show validation errors from the API.
 *   • Link to /login for returning users.
 */

export default function RegisterPage() {
  return (
    <main>
      {/* DEV C: replace with real registration form */}
      <p className="p-8 text-center text-gray-500">
        Register page — to be built by Dev C
      </p>
    </main>
  )
}
