import HeroSection from '@/components/landing/HeroSection'
import FeaturesSection from '@/components/landing/FeaturesSection'
import StatsBar from '@/components/landing/StatsBar'
import TestimonialsSection from '@/components/landing/TestimonialsSection'
import Footer from '@/components/landing/Footer'
import Navbar from '@/components/Navbar'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <StatsBar />
        <TestimonialsSection />
      </main>
      <Footer />
    </>
  )
}
