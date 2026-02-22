'use client'

import { motion } from 'framer-motion'
import ProjectCarousel from './ProjectCarousel'

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4 text-foreground inline-block relative md:text-4xl">
            My Projects
            <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-accent" />
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
            Check out some of my recent work and personal projects.
          </p>
        </motion.div>
      </div>

      <ProjectCarousel />
    </section>
  )
}
