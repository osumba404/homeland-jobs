/*
 * ROOT LAYOUT — shared by every page.
 *
 * DEV B & DEV C: You can customise the <html> lang, add Google Fonts here,
 * and add any global providers (e.g. an AuthContext or QueryClientProvider).
 *
 * Add your Navbar/Header component here so it appears on all pages,
 * OR add it only to the (marketing) and (app) route-group layouts if you
 * prefer to keep the admin panel header separate.
 */

import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "Homeland Jobs — Africa's Freelance Marketplace",
  description: 'Find top African freelance talent or land your next remote contract.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
