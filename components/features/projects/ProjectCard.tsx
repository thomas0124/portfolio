'use client'

import type React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { FaGithub } from 'react-icons/fa'
import type { Project } from '@/types/project'

interface ProjectCardProps {
  project: Project
  index: number
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true, margin: '-50px' }}
    className="group flex flex-col justify-between h-full bg-card/60 backdrop-blur-md border-2 border-border/60 p-8 rounded-[2.5rem] shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:border-accent/40 hover:bg-card"
  >
    <div>
      <h3 className="text-2xl text-foreground font-extrabold mb-4 group-hover:text-accent transition-colors duration-300">
        {project.name}
      </h3>
      <p className="text-base text-muted-foreground mb-8 leading-relaxed font-medium">{project.description}</p>
    </div>

    <div className="w-full mt-auto">
      <div className="flex flex-wrap gap-3 mb-8">
        {project.techStack.map((tech) => (
          <div
            key={tech.name}
            className="flex items-center gap-2 bg-background border border-border/50 px-3 py-2 rounded-xl shadow-sm transition-transform duration-300 hover:scale-110"
          >
            <Image
              src={tech.icon || '/placeholder.svg'}
              alt={tech.name}
              width={20}
              height={20}
              className="object-contain"
            />
            <span className="text-xs font-bold text-foreground">{tech.name}</span>
          </div>
        ))}
      </div>

      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex w-full items-center justify-center bg-foreground text-background px-6 py-4 rounded-full transition-all duration-300 hover:bg-accent hover:text-accent-foreground hover:shadow-md text-sm font-bold"
      >
        <FaGithub className="mr-2 text-xl" aria-hidden="true" />
        <span>View Repository</span>
      </a>
    </div>
  </motion.div>
)

export default ProjectCard
