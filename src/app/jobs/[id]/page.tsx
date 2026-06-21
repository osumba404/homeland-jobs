'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import type { Job } from '@/types'
import { apiFetch, getStoredUser } from '@/lib/apiFetch'
import Navbar from '@/components/Navbar'
import Footer from '@/components/landing/Footer'
import Link from 'next/link'

export default function JobDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const user = getStoredUser()

  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  // Proposal form state
  const [coverLetter, setCoverLetter] = useState('')
  const [amount, setAmount] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formError, setFormError] = useState('')

  useEffect(() => {
    fetch(`/api/jobs/${id}`)
      .then(r => r.json())
      .then(res => {
        if (res.success) setJob(res.data)
        else setNotFound(true)
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [id])

  async function submitProposal(e: React.FormEvent) {
    e.preventDefault()
    if (!user) { router.push('/login'); return }
    setSubmitting(true)
    setFormError('')
    const res = await apiFetch(`/api/jobs/${id}/proposals`, {
      method: 'POST',
      body: JSON.stringify({ coverLetter, proposedAmount: Number(amount) }),
    })
    setSubmitting(false)
    if (res.success) {
      setSubmitted(true)
    } else {
      setFormError(res.error ?? 'Something went wrong. Please try again.')
    }
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 py-20">
          <div className="space-y-4">
            <div className="h-8 bg-gray-100 rounded-xl animate-pulse w-3/4" />
            <div className="h-4 bg-gray-100 rounded animate-pulse w-1/3" />
            <div className="h-48 bg-gray-100 rounded-xl animate-pulse mt-6" />
          </div>
        </div>
      </>
    )
  }

  if (notFound || !job) {
    return (
      <>
        <Navbar />
        <div className="text-center py-32">
          <div className="text-5xl mb-4">🤔</div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Job not found</h2>
          <Link href="/jobs" className="text-emerald-600 hover:underline text-sm">← Back to jobs</Link>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
          <Link href="/jobs" className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-emerald-600 mb-6 transition-colors">
            ← Back to jobs
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl p-8 border border-gray-100">
                <div className="flex items-start gap-3 mb-4">
                  <h1 className="text-2xl font-bold text-gray-900 flex-1">{job.title}</h1>
                  <span className={`flex-shrink-0 text-xs font-medium px-3 py-1 rounded-full capitalize ${
                    job.status === 'open' ? 'bg-emerald-100 text-emerald-700' :
                    job.status === 'paused' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-500'
                  }`}>
                    {job.status}
                  </span>
                </div>

                {job.category && (
                  <span className="inline-block text-xs text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full mb-6">
                    {job.category}
                  </span>
                )}

                <h2 className="text-sm font-semibold text-gray-700 mb-2">Job Description</h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{job.description}</p>
              </div>

              {/* Proposal form */}
              {job.status === 'open' && (
                <div className="bg-white rounded-2xl p-8 border border-gray-100">
                  <h2 className="text-lg font-bold text-gray-900 mb-1">Submit a Proposal</h2>
                  <p className="text-gray-400 text-sm mb-6">Tell the client why you&apos;re the right fit.</p>

                  {!user && (
                    <div className="text-center py-8 bg-gray-50 rounded-xl">
                      <p className="text-gray-500 text-sm mb-4">You need to be logged in to apply.</p>
                      <Link href="/login" className="inline-block bg-emerald-600 text-white text-sm font-medium px-6 py-2.5 rounded-xl hover:bg-emerald-700 transition-colors">
                        Log in to apply
                      </Link>
                    </div>
                  )}

                  {user && submitted && (
                    <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl px-5 py-4 text-sm">
                      ✅ Your proposal was submitted successfully! The client will be in touch.
                    </div>
                  )}

                  {user && !submitted && (
                    <form onSubmit={submitProposal} className="space-y-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Cover Letter</label>
                        <textarea
                          value={coverLetter}
                          onChange={e => setCoverLetter(e.target.value)}
                          rows={5}
                          placeholder="Describe your experience, approach, and why you're the right choice..."
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Your Proposed Amount (KES)
                        </label>
                        <input
                          type="number"
                          value={amount}
                          onChange={e => setAmount(e.target.value)}
                          required
                          min={1}
                          placeholder="e.g. 1200"
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                      {formError && (
                        <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                          {formError}
                        </div>
                      )}
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-60"
                      >
                        {submitting ? 'Submitting…' : 'Submit Proposal'}
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <h3 className="text-sm font-semibold text-gray-700 mb-4">Job Details</h3>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Budget</dt>
                    <dd className="font-bold text-gray-900">KES {Number(job.budget).toLocaleString()}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Category</dt>
                    <dd className="text-gray-700">{job.category ?? '—'}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Posted by</dt>
                    <dd className="text-gray-700">{job.client_name ?? 'Anonymous'}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Posted</dt>
                    <dd className="text-gray-700">
                      {new Date(job.created_at).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
