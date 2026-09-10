'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ScrollProgress from '@/components/common/ScrollProgress'
import ProjectsSection from '@/components/features/projects/ProjectsSection'

export default function Projects() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-transparent">
      <ScrollProgress />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow pt-32 pb-20">
          <ProjectsSection />
        </main>

        <Footer />
      </div>
    </div>
  )
}
