'use client'

const CATEGORIES = [
  'Web Development', 'Mobile Development', 'Design', 'Backend Development',
  'Data Engineering', 'DevOps', 'Content Writing', 'Marketing',
  'Video Production', 'Translation',
]

interface Props {
  search: string
  category: string
  onSearch: (v: string) => void
  onCategory: (v: string) => void
}

export default function JobFilters({ search, category, onSearch, onCategory }: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Search */}
      <div className="relative flex-1">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search jobs..."
          value={search}
          onChange={e => onSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
        />
      </div>

      {/* Category */}
      <select
        value={category}
        onChange={e => onCategory(e.target.value)}
        className="sm:w-52 px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-gray-600"
      >
        <option value="">All categories</option>
        {CATEGORIES.map(c => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
    </div>
  )
}
