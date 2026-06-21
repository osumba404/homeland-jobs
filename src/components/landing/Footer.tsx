import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">HJ</span>
              </div>
              <span className="font-bold text-white text-lg">Homeland Jobs</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Africa&apos;s trusted freelance marketplace. Connecting talent with opportunity across the continent.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">For Freelancers</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/jobs" className="hover:text-emerald-400 transition-colors">Browse Jobs</Link></li>
              <li><Link href="/register" className="hover:text-emerald-400 transition-colors">Create Profile</Link></li>
              <li><Link href="/login" className="hover:text-emerald-400 transition-colors">Log In</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">For Clients</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/register" className="hover:text-emerald-400 transition-colors">Post a Job</Link></li>
              <li><Link href="/jobs" className="hover:text-emerald-400 transition-colors">Find Talent</Link></li>
              <li><Link href="/login" className="hover:text-emerald-400 transition-colors">Log In</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="https://www.homelandhub.org" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">About</a></li>
              <li><span className="cursor-default">Privacy Policy</span></li>
              <li><span className="cursor-default">Terms of Service</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-sm text-center">
          © {new Date().getFullYear()} Homeland Jobs. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
