'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getStoredUser, logout } from '@/lib/apiFetch'
import { useRouter, usePathname } from 'next/navigation'

export default function Navbar() {
  const [user, setUser] = useState<{ name: string; role: string } | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    setUser(getStoredUser())
  }, [pathname])

  function handleLogout() {
    logout()
    setUser(null)
    router.push('/')
  }

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">HJ</span>
            </div>
            <span className="font-bold text-gray-900 text-lg">Homeland Jobs</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/jobs" className="text-gray-600 hover:text-emerald-600 text-sm font-medium transition-colors">
              Browse Jobs
            </Link>
            {user?.role === 'admin' && (
              <Link href="/admin/dashboard" className="text-gray-600 hover:text-emerald-600 text-sm font-medium transition-colors">
                Admin
              </Link>
            )}
          </div>

          {/* Auth buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">Hi, {user.name.split(' ')[0]}</span>
                <button
                  onClick={handleLogout}
                  className="text-sm text-gray-600 hover:text-red-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors">
                  Log in
                </Link>
                <Link href="/register" className="text-sm font-medium bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
                  Sign up
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="w-5 h-0.5 bg-current mb-1" />
            <div className="w-5 h-0.5 bg-current mb-1" />
            <div className="w-5 h-0.5 bg-current" />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4 space-y-3">
            <Link href="/jobs" className="block text-gray-700 text-sm py-1" onClick={() => setMenuOpen(false)}>Browse Jobs</Link>
            {user?.role === 'admin' && (
              <Link href="/admin/dashboard" className="block text-gray-700 text-sm py-1" onClick={() => setMenuOpen(false)}>Admin</Link>
            )}
            {user ? (
              <button onClick={handleLogout} className="block text-red-600 text-sm py-1">Logout</button>
            ) : (
              <>
                <Link href="/login" className="block text-gray-700 text-sm py-1" onClick={() => setMenuOpen(false)}>Log in</Link>
                <Link href="/register" className="block text-emerald-600 font-medium text-sm py-1" onClick={() => setMenuOpen(false)}>Sign up</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
