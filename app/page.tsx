'use client'

import Header from '@/components/layout/Header'
import LoadScreen from '@/components/common/LoadScreen'
import Footer from '@/components/layout/Footer'
import { useLoading } from '@/hooks/useLoading'
import { useScrollNavigation } from '@/hooks/useScrollNavigation'
import HeroSection from '@/components/features/home/HeroSection'
import ScrollProgress from '@/components/common/ScrollProgress'
import FloatingNav from '@/components/common/FloatingNav'

export default function Home() {
  const { loading, setLoading } = useLoading()
  const { activeSection, scrollProgress } = useScrollNavigation()

  if (loading) {
    return <LoadScreen onComplete={() => setLoading(false)} />
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <ScrollProgress progress={scrollProgress} />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow flex flex-col justify-center pb-10">
          <HeroSection />
        </main>

        <FloatingNav activeSection={activeSection} />
        <Footer />
      </div>
    </div>
  )
}
