'use client'
import { useEffect, useState, useCallback } from 'react'
import type { Job } from '@/types'
import JobCard from '@/components/jobs/JobCard'
import JobFilters from '@/components/jobs/JobFilters'
import Pagination from '@/components/jobs/Pagination'
import Navbar from '@/components/Navbar'
import Footer from '@/components/landing/Footer'

const LIMIT = 9

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [loading, setLoading] = useState(true)
  const [debouncedSearch, setDebouncedSearch] = useState('')

  // Debounce search input
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 300)
    return () => clearTimeout(t)
  }, [search])

  const fetchJobs = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams({
      page: String(page),
      limit: String(LIMIT),
      ...(debouncedSearch ? { search: debouncedSearch } : {}),
      ...(category ? { category } : {}),
    })
    try {
      const res = await fetch(`/api/jobs?${params}`)
      const json = await res.json()
      if (json.success) {
        setJobs(json.data.jobs)
        setTotal(json.data.total)
      }
    } finally {
      setLoading(false)
    }
  }, [page, debouncedSearch, category])

  useEffect(() => { fetchJobs() }, [fetchJobs])

  // Reset to page 1 when filters change
  useEffect(() => { setPage(1) }, [debouncedSearch, category])

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Jobs</h1>
            <p className="text-gray-500">Find your next freelance contract across Africa.</p>
            <div className="mt-6">
              <JobFilters
                search={search}
                category={category}
                onSearch={setSearch}
                onCategory={setCategory}
              />
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          {/* Result count */}
          {!loading && (
            <p className="text-sm text-gray-400 mb-6">
              {total === 0
                ? 'No jobs found'
                : `Showing ${Math.min((page - 1) * LIMIT + 1, total)}–${Math.min(page * LIMIT, total)} of ${total} job${total !== 1 ? 's' : ''}`}
            </p>
          )}

          {/* Skeleton */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: LIMIT }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl h-52 animate-pulse border border-gray-100" />
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && jobs.length === 0 && (
            <div className="text-center py-24">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold text-gray-700 mb-1">No jobs match your search</h3>
              <p className="text-gray-400 text-sm">Try a different keyword or clear the filters.</p>
            </div>
          )}

          {/* Grid */}
          {!loading && jobs.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map(job => <JobCard key={job.id} job={job} />)}
            </div>
          )}

          <Pagination page={page} total={total} limit={LIMIT} onChange={setPage} />
        </div>
      </main>
      <Footer />
    </>
  )
}
