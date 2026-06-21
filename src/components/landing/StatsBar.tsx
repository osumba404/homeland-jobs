'use client'
import { useEffect, useState } from 'react'
import type { Stats } from '@/types'

export default function StatsBar() {
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    fetch('/api/stats')
      .then(r => r.json())
      .then(res => { if (res.success) setStats(res.data) })
      .catch(() => {})
  }, [])

  const items = [
    { label: 'Jobs Posted', value: stats?.totalJobs },
    { label: 'Freelancers', value: stats?.totalFreelancers },
    { label: 'Contracts Completed', value: stats?.totalContracts },
  ]

  return (
    <section className="bg-emerald-600 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {items.map((item) => (
            <div key={item.label}>
              <div className="text-4xl font-bold text-white mb-1">
                {item.value !== undefined
                  ? item.value.toLocaleString()
                  : <span className="inline-block w-16 h-8 bg-emerald-500 rounded animate-pulse" />}
              </div>
              <div className="text-emerald-200 text-sm font-medium uppercase tracking-wide">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
