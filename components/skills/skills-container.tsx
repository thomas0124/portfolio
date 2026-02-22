'use client'

import Image from 'next/image'
import { skills } from '@/data/skills'
import { motion } from 'framer-motion'

const SkillsContainer = () => {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {skills.map((skill, index) => (
        <motion.div
          key={skill.name}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.04 }}
          className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 border border-transparent transition-all duration-300 hover:border-accent/30 hover:shadow-sm hover:bg-secondary"
        >
          <Image src={`/${skill.icon}`} alt={skill.name} width={28} height={28} className="w-7 h-7 flex-shrink-0" />
          <span className="text-sm font-medium text-foreground truncate">{skill.name}</span>
        </motion.div>
      ))}
    </div>
  )
}

export default SkillsContainer
