/*
 * ─── LOGIN PAGE — DEV C owns this file ───────────────────────────────────────
 *
 * Route: /login
 * Used by: regular users AND admin (the backend checks role after login).
 *
 * What to build:
 *   • Form: email (input[type=email]) + password (input[type=password])
 *   • On submit: POST /api/auth/login  Body: { email, password }
 *     Response: { success, data: { token, user: { id, name, email, role } }, error }
 *   • On success:
 *       - Store token in localStorage as "hj_token"
 *       - Store user object as "hj_user" (JSON.stringify)
 *       - If user.role === 'admin' → redirect to /admin/dashboard
 *       - Otherwise → redirect to /jobs
 *   • Show the API error message if login fails.
 *   • Link to /register for new users.
 *
 * For admin login the assessor will use:  admin@homelandjobs.com / Admin@1234
 */

export default function LoginPage() {
  return (
    <main>
      {/* DEV C: replace with real login form */}
      <p className="p-8 text-center text-gray-500">
        Login page — to be built by Dev C
      </p>
    </main>
  )
}
