'use client'

import { motion } from 'framer-motion'
import { projects } from '@/data/projects'
import ProjectCard from './ProjectCard'

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-12"
        >
          <div className="inline-block relative">
            <h2 className="text-3xl font-extrabold text-foreground md:text-5xl relative z-10">My Projects</h2>
            <span className="absolute bottom-1 left-0 w-full h-3 rounded-full bg-accent/40 -z-10 -rotate-1" />
          </div>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mt-4 font-medium">
            Check out some of my recent work and personal projects.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
