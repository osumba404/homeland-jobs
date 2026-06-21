import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-32">
        <div className="max-w-3xl">
          <span className="inline-block bg-emerald-700/60 text-emerald-200 text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full mb-6">
            Africa&apos;s #1 Freelance Marketplace
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
            Find world-class talent.<br />
            <span className="text-emerald-400">Built for Africa.</span>
          </h1>
          <p className="text-lg sm:text-xl text-emerald-100 mb-10 max-w-xl leading-relaxed">
            Connect with top African freelancers or land your next remote contract.
            Secure escrow, zero hassle, real opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/jobs"
              className="inline-flex items-center justify-center bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-8 py-4 rounded-xl transition-colors text-base"
            >
              Find Work
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-xl border border-white/20 transition-colors text-base"
            >
              Post a Job
            </Link>
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="h-12 bg-gray-50" style={{ clipPath: 'ellipse(100% 100% at 50% 100%)' }} />
    </section>
  )
}
