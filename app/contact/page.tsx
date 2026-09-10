'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ScrollProgress from '@/components/common/ScrollProgress'
import { useScrollNavigation } from '@/hooks/useScrollNavigation'
import ContactSection from '@/components/features/contact/ContactSection'

export default function Contact() {
  const { scrollProgress } = useScrollNavigation()

  return (
    <div className="relative min-h-screen overflow-hidden bg-transparent">
      <ScrollProgress progress={scrollProgress} />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow pt-32 pb-20 flex flex-col justify-center">
          <ContactSection />
        </main>

        <Footer />
      </div>
    </div>
  )
}
