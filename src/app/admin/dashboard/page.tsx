'use client'
import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { getStoredUser, logout, apiFetch } from '@/lib/apiFetch'
import type { AdminOverview, ActivityPoint, User, Job } from '@/types'
import OverviewCards from '@/components/admin/OverviewCards'
import ActivityChart from '@/components/admin/ActivityChart'
import UsersTable from '@/components/admin/UsersTable'
import JobsTable from '@/components/admin/JobsTable'
import Link from 'next/link'

export default function AdminDashboardPage() {
  const router = useRouter()
  const [overview, setOverview]   = useState<AdminOverview | null>(null)
  const [activity, setActivity]   = useState<ActivityPoint[]>([])
  const [users, setUsers]         = useState<User[]>([])
  const [jobs, setJobs]           = useState<Job[]>([])
  const [loadingOv, setLoadingOv] = useState(true)
  const [loadingAc, setLoadingAc] = useState(true)
  const [loadingUs, setLoadingUs] = useState(true)
  const [loadingJo, setLoadingJo] = useState(true)

  // Guard: must be admin
  useEffect(() => {
    const user = getStoredUser()
    if (!user || user.role !== 'admin') router.replace('/login')
  }, [router])

  const fetchAll = useCallback(async () => {
    apiFetch<AdminOverview>('/api/admin/overview')
      .then(r => { if (r.success && r.data) setOverview(r.data) })
      .finally(() => setLoadingOv(false))

    apiFetch<ActivityPoint[]>('/api/admin/jobs/activity?days=7')
      .then(r => { if (r.success && r.data) setActivity(r.data) })
      .finally(() => setLoadingAc(false))

    apiFetch<User[]>('/api/admin/users')
      .then(r => { if (r.success && r.data) setUsers(r.data) })
      .finally(() => setLoadingUs(false))

    apiFetch<Job[]>('/api/admin/jobs')
      .then(r => { if (r.success && r.data) setJobs(r.data) })
      .finally(() => setLoadingJo(false))
  }, [])

  useEffect(() => { fetchAll() }, [fetchAll])

  function handleUserUpdate(updated: User) {
    setUsers(prev => prev.map(u => u.id === updated.id ? updated : u))
  }

  function handleJobUpdate(updated: Job) {
    setJobs(prev => prev.map(j => j.id === updated.id ? updated : j))
  }

  function handleLogout() {
    logout()
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Navbar */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">HJ</span>
              </div>
              <span className="font-bold text-gray-900">Homeland Jobs</span>
            </Link>
            <span className="text-gray-300">|</span>
            <span className="text-sm font-medium text-gray-500">Admin Panel</span>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-500 hover:text-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Page title */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-400 text-sm mt-1">Platform overview and management</p>
        </div>

        {/* Overview cards */}
        <OverviewCards data={overview} loading={loadingOv} />

        {/* Chart */}
        <ActivityChart data={activity} loading={loadingAc} />

        {/* Users table */}
        <UsersTable users={users} loading={loadingUs} onUpdate={handleUserUpdate} />

        {/* Jobs table */}
        <JobsTable jobs={jobs} loading={loadingJo} onUpdate={handleJobUpdate} />
      </div>
    </div>
  )
}
