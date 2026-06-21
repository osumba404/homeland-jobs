'use client'
import { useState } from 'react'
import type { Job } from '@/types'
import { apiFetch } from '@/lib/apiFetch'

interface Props { jobs: Job[]; loading: boolean; onUpdate: (j: Job) => void }

const STATUSES = ['open', 'paused', 'closed'] as const

export default function JobsTable({ jobs, loading, onUpdate }: Props) {
  const [changing, setChanging] = useState<string | null>(null)

  async function changeStatus(job: Job, status: string) {
    setChanging(job.id)
    const res = await apiFetch<Job>(`/api/jobs/${job.id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    })
    setChanging(null)
    if (res.success && res.data) onUpdate(res.data)
  }

  const STATUS_COLOR: Record<string, string> = {
    open:   'bg-emerald-100 text-emerald-700',
    paused: 'bg-yellow-100 text-yellow-700',
    closed: 'bg-gray-100 text-gray-500',
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-50">
        <h3 className="font-semibold text-gray-800">All Jobs</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-400 text-xs uppercase tracking-wide border-b border-gray-50">
              <th className="px-6 py-3 font-medium">Title</th>
              <th className="px-6 py-3 font-medium">Category</th>
              <th className="px-6 py-3 font-medium">Budget</th>
              <th className="px-6 py-3 font-medium">Client</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Change Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading && Array.from({ length: 5 }).map((_, i) => (
              <tr key={i}>
                {Array.from({ length: 6 }).map((__, j) => (
                  <td key={j} className="px-6 py-4">
                    <div className="h-4 bg-gray-100 rounded animate-pulse w-28" />
                  </td>
                ))}
              </tr>
            ))}

            {!loading && jobs.map(j => (
              <tr key={j.id} className="hover:bg-gray-50/50">
                <td className="px-6 py-4 font-medium text-gray-900 max-w-xs truncate">{j.title}</td>
                <td className="px-6 py-4 text-gray-500">{j.category ?? '—'}</td>
                <td className="px-6 py-4 text-gray-700">KES {Number(j.budget).toLocaleString()}</td>
                <td className="px-6 py-4 text-gray-500">{j.client_name ?? '—'}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${STATUS_COLOR[j.status] ?? ''}`}>
                    {j.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <select
                    value={j.status}
                    disabled={changing === j.id}
                    onChange={e => changeStatus(j, e.target.value)}
                    className="text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white disabled:opacity-50"
                  >
                    {STATUSES.map(s => (
                      <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
