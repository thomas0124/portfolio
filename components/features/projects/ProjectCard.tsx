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
      border border-blue-900/30 shadow-lg p-6 w-full md:w-[calc(100%/3)] h-auto min-h-[28rem] 
      flex flex-col justify-between items-center snap-center mx-2 mt-4 mb-16 flex-shrink-0 
      transition-all duration-500 rounded-xl backdrop-blur-sm
      ${
        isCenter
          ? 'md:scale-110 bg-gradient-to-br from-blue-900/40 to-cyan-900/20 shadow-xl shadow-blue-900/20'
          : 'md:scale-75 md:opacity-70 bg-black/30'
      }
    `}
  >
    <div>
      <h2 className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-200 font-bold text-center mb-3">
        {project.name}
      </h2>
      <p className="text-center text-lg text-gray-300 mb-6">{project.description}</p>
    </div>

    <div className="w-full">
      <p className="text-lg text-blue-400 mb-3 text-center">技術スタック</p>
      <div className="flex justify-center flex-wrap gap-4 mb-6">
        {project.techStack.map((tech) => (
          <div key={tech.name} className="flex flex-col items-center group">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500/30 to-cyan-500/30 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300"></div>
              <div className="relative bg-gray-900/60 p-2 rounded-full transform transition-transform duration-300 group-hover:scale-110">
                <Image
                  src={tech.icon || '/placeholder.svg'}
                  alt={tech.name}
                  width={40}
                  height={40}
                  className="relative z-10"
                />
              </div>
            </div>
            <span className="text-sm text-gray-300 mt-2 group-hover:text-white transition-colors duration-300">
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
      className="mt-4 flex items-center bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-full hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
    >
      <FaGithub className="mr-2" aria-hidden="true" />
      <span>GitHub</span>
    </a>
  </motion.div>
)

export default ProjectCard
