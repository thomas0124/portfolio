'use client'

import type React from 'react'
import { projects } from '@/data/projects'
import ProjectCard from './ProjectCard'
import { useProjectCarousel } from '@/hooks/useProjectCarousel'

export default function ProjectCarousel() {
  const { scrollRef, centerIndex, isMobile } = useProjectCarousel(projects.length)

  return (
    <section className="relative w-full h-auto p-4 md:p-10 overflow-hidden">
      <div
        ref={scrollRef}
        className="flex overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory hide-scrollbar"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {[...projects, ...projects, ...projects].map((project, index) => (
          <ProjectCard
            key={`${project.id}-${Math.floor(index / projects.length)}`}
            project={project}
            isCenter={index % projects.length === centerIndex}
            index={index % projects.length}
          />
        ))}
      </div>
      <div className="absolute bottom-5 left-0 right-0 flex justify-center space-x-3">
        {projects.map((project, index) => (
          <button
            key={`pagination-${project.id}`}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              centerIndex === index
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 scale-125 shadow-md shadow-blue-500/50'
                : 'bg-gray-400 hover:bg-blue-300'
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
