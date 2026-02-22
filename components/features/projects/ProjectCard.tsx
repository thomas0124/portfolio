'use client'

import type React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { FaGithub } from 'react-icons/fa'
import type { Project } from '@/types/project'

interface ProjectCardProps {
  project: Project
  isCenter: boolean
  index: number
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, isCenter, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className={`
      border border-border shadow-sm p-6 w-full md:w-[calc(100%/3)] h-auto min-h-[28rem]
      flex flex-col justify-between items-center snap-center mx-2 mt-4 mb-16 flex-shrink-0
      transition-all duration-500 rounded-xl bg-card
      ${
        isCenter
          ? 'md:scale-110 shadow-md'
          : 'md:scale-75 md:opacity-60'
      }
    `}
  >
    <div>
      <h2 className="text-2xl text-foreground font-bold text-center mb-3">
        {project.name}
      </h2>
      <p className="text-center text-base text-muted-foreground mb-6 leading-relaxed">{project.description}</p>
    </div>

    <div className="w-full">
      <p className="text-sm text-accent font-medium mb-3 text-center tracking-wide uppercase">Tech Stack</p>
      <div className="flex justify-center flex-wrap gap-4 mb-6">
        {project.techStack.map((tech) => (
          <div key={tech.name} className="flex flex-col items-center group">
            <div className="bg-secondary p-2 rounded-lg transition-transform duration-300 group-hover:scale-110">
              <Image
                src={tech.icon || '/placeholder.svg'}
                alt={tech.name}
                width={36}
                height={36}
              />
            </div>
            <span className="text-xs text-muted-foreground mt-2 group-hover:text-foreground transition-colors duration-300">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </div>

    <a
      href={project.github}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-4 flex items-center bg-accent text-accent-foreground px-6 py-2 rounded-full transition-all duration-300 hover:opacity-90 hover:shadow-md text-sm font-medium"
    >
      <FaGithub className="mr-2" aria-hidden="true" />
      <span>GitHub</span>
    </a>
  </motion.div>
)

export default ProjectCard
