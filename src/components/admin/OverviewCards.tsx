import type { AdminOverview } from '@/types'

interface Props { data: AdminOverview | null; loading: boolean }

export default function OverviewCards({ data, loading }: Props) {
  const cards = [
    { label: 'Total Users',     value: data?.totalUsers,     sub: data ? `${data.roleBreakdown.freelancer ?? 0} freelancers · ${data.roleBreakdown.client ?? 0} clients` : '' },
    { label: 'Total Jobs',      value: data?.totalJobs,      sub: '' },
    { label: 'Total Proposals', value: data?.totalProposals, sub: '' },
    { label: 'Escrow Value',    value: data ? `KES ${Number(data.totalEscrow).toLocaleString()}` : undefined, sub: 'accepted proposals' },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(c => (
        <div key={c.label} className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="text-gray-400 text-xs font-medium uppercase tracking-wide mb-2">{c.label}</div>
          {loading || c.value === undefined ? (
            <div className="h-8 w-20 bg-gray-100 rounded animate-pulse" />
          ) : (
            <div className="text-3xl font-bold text-gray-900">{c.value}</div>
          )}
          {c.sub && <div className="text-gray-400 text-xs mt-1">{c.sub}</div>}
        </div>
      ))}
    </div>
  )
}
