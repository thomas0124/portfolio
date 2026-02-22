'use client'

import Header from '@/components/layout/Header'
import LoadScreen from '@/components/common/LoadScreen'
import BackgroundGlobe from '@/components/common/BackgroundGlobe'
import Footer from '@/components/layout/Footer'
import { useLoading } from '@/hooks/useLoading'
import { useScrollNavigation } from '@/hooks/useScrollNavigation'
import HeroSection from '@/components/features/home/HeroSection'
import ProjectsSection from '@/components/features/projects/ProjectsSection'
import ContactSection from '@/components/features/contact/ContactSection'
import ScrollProgress from '@/components/common/ScrollProgress'
import FloatingNav from '@/components/common/FloatingNav'

export default function Home() {
  const { loading, setLoading } = useLoading()
  const { activeSection, scrollProgress } = useScrollNavigation()

  if (loading) {
    return <LoadScreen onComplete={() => setLoading(false)} />
  }

  return (
    <div className="relative min-h-screen text-white overflow-hidden perspective-1000">
      <BackgroundGlobe />
      <ScrollProgress progress={scrollProgress} />

      <div className="relative z-10">
        <Header />
        <HeroSection />
        <ProjectsSection />
        <ContactSection />
        <FloatingNav activeSection={activeSection} />
        <Footer />
      </div>
    </div>
  )
}
