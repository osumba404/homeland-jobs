import Link from 'next/link'
import type { Job } from '@/types'

const STATUS_COLORS: Record<string, string> = {
  open:   'bg-emerald-100 text-emerald-700',
  paused: 'bg-yellow-100 text-yellow-700',
  closed: 'bg-gray-100 text-gray-500',
}

export default function JobCard({ job }: { job: Job }) {
  return (
    <Link href={`/jobs/${job.id}`} className="block group">
      <div className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-md hover:border-emerald-200 transition-all h-full flex flex-col">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-semibold text-gray-900 text-base group-hover:text-emerald-700 transition-colors leading-snug">
            {job.title}
          </h3>
          <span className={`flex-shrink-0 text-xs font-medium px-2.5 py-1 rounded-full capitalize ${STATUS_COLORS[job.status] ?? 'bg-gray-100 text-gray-500'}`}>
            {job.status}
          </span>
        </div>

        {job.category && (
          <span className="inline-block text-xs text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full mb-3">
            {job.category}
          </span>
        )}

        <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-4 line-clamp-3">
          {job.description}
        </p>

        <div className="flex items-center justify-between text-sm border-t border-gray-50 pt-4">
          <span className="font-bold text-gray-900">
            KES {Number(job.budget).toLocaleString()}
          </span>
          <span className="text-gray-400 text-xs">
            {job.client_name ?? 'Anonymous'}
          </span>
        </div>
      </div>
    </Link>
  )
}
