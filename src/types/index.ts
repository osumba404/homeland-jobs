/*
 * Shared TypeScript types — used by both backend API routes and frontend components.
 * Dev B and Dev C: import these rather than re-defining them.
 */

export interface User {
  id: string
  name: string
  email: string
  role: 'freelancer' | 'client' | 'admin'
  status: 'active' | 'suspended'
  joinDate: string
}

export interface Job {
  id: string
  title: string
  description: string
  budget: number
  category: string | null
  status: 'open' | 'paused' | 'closed'
  client_id: string | null
  client_name: string | null
  created_at: string
}

export interface Proposal {
  id: string
  job_id: string
  freelancer_id: string
  cover_letter: string | null
  proposed_amount: number
  status: 'pending' | 'accepted' | 'rejected'
  created_at: string
}

export interface Testimonial {
  id: string
  name: string
  role: string | null
  quote: string
  avatar_url: string | null
  created_at: string
}

export interface Stats {
  totalJobs: number
  totalFreelancers: number
  totalContracts: number
}

export interface AdminOverview {
  totalUsers: number
  roleBreakdown: Record<string, number>
  totalJobs: number
  totalProposals: number
  totalEscrow: number
}

export interface ActivityPoint {
  date: string   // "YYYY-MM-DD"
  count: number
}

/** Standard API response envelope */
export interface ApiResponse<T> {
  success: boolean
  data: T | null
  error: string | null
}
