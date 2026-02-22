'use client'

import { motion } from 'framer-motion'
import ProjectCarousel from './ProjectCarousel'

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/10 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-200 inline-block relative">
            My Projects
            <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400"></span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Check out some of my recent work and personal projects.
          </p>
        </motion.div>
      </div>

      <ProjectCarousel />
    </section>
  )
}
