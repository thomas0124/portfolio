'use client'

import { useState } from 'react'
import Image from 'next/image'
import SkillsGlobe from './skills-globe'
import { skills } from '@/data/skills'

const SkillsContainer = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      <div className="relative w-full lg:w-1/2 h-[350px] sm:h-[450px] lg:h-[500px]">
        <SkillsGlobe onHoverSkill={setHoveredSkill} />
        {hoveredSkill && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gray-800 bg-opacity-90 px-4 py-2 rounded-lg shadow-lg z-10 border border-blue-500">
            <p className="text-blue-300 font-bold text-lg">{hoveredSkill}</p>
          </div>
        )}
      </div>

      <div className="w-full lg:w-1/2">
        <div className="bg-gray-900 bg-opacity-80 p-4 sm:p-6 rounded-xl border border-gray-800 shadow-xl">
          <h4 className="text-lg sm:text-xl font-bold mb-4 text-blue-300">技術スタック</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className={`p-2 sm:p-3 rounded-lg flex items-center space-x-2 sm:space-x-3 transition-all duration-200 ${
                  hoveredSkill === skill.name
                    ? 'bg-blue-900 bg-opacity-70 scale-105 shadow-lg border border-blue-500'
                    : 'bg-gray-800 bg-opacity-70 hover:bg-gray-700'
                }`}
              >
                <Image
                  src={`/${skill.icon}`}
                  alt={skill.name}
                  width={24}
                  height={24}
                  className="w-5 h-5 sm:w-6 sm:h-6"
                />

                <span className="text-xs sm:text-sm font-medium text-gray-200 truncate">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkillsContainer
