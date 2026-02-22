'use client'

import { projects } from '@/data/projects'
import ProjectCard from './ProjectCard'
import { useProjectCarousel } from '@/hooks/useProjectCarousel'

export default function ProjectCarousel() {
  const { scrollRef, centerIndex, isMobile } = useProjectCarousel(projects.length)

  return (
    <section className="relative w-full h-auto p-4 overflow-hidden md:p-10">
      <div
        ref={scrollRef}
        className="flex overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory hide-scrollbar pb-8"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {[...projects, ...projects, ...projects].map((project, index) => (
          <ProjectCard
            key={`${project.id}-${Math.floor(index / projects.length)}`}
            project={project}
            index={index % projects.length}
          />
        ))}
      </div>
      <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-3">
        {projects.map((project, index) => (
          <button
            key={`pagination-${project.id}`}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              centerIndex === index ? 'bg-accent scale-125 shadow-md' : 'bg-border hover:bg-accent/50 hover:scale-110'
            }`}
            aria-label={`Project ${index + 1} of ${projects.length}`}
            onClick={() => {
              if (scrollRef.current) {
                const { offsetWidth } = scrollRef.current
                const itemWidth = isMobile ? offsetWidth : offsetWidth / 3
                scrollRef.current.scrollTo({
                  left: index * itemWidth,
                  behavior: 'smooth'
                })
              }
            }}
          />
        ))}
      </div>
    </section>
  )
}
