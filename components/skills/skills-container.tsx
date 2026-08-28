'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { skills } from '@/data/skills'
import { motion } from 'framer-motion'

const SkillsContainer = () => {
  const [activeSkill, setActiveSkill] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setActiveSkill(null)
      }
    }
    document.addEventListener('mousedown', handleMouseDown)
    return () => document.removeEventListener('mousedown', handleMouseDown)
  }, [])

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
    >
      {skills.map((skill, index) => {
        const hasArticles = skill.articles && skill.articles.length > 0
        const isActive = activeSkill === skill.name

        return (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.04 }}
            className="relative flex items-center gap-3 p-3 rounded-lg bg-secondary/50 border border-transparent transition-all duration-300 hover:border-accent/30 hover:shadow-sm hover:bg-secondary"
            onMouseEnter={() => hasArticles && setActiveSkill(skill.name)}
            onMouseLeave={() => setActiveSkill(null)}
            onClick={() => {
              if (hasArticles) {
                setActiveSkill(isActive ? null : skill.name)
              }
            }}
          >
            <Image
              src={`/${skill.icon}`}
              alt={skill.name}
              width={28}
              height={28}
              className="w-7 h-7 flex-shrink-0"
            />
            <span className="text-sm font-medium text-foreground truncate">{skill.name}</span>

            {hasArticles && isActive && (
              <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 bg-card border border-accent/20 rounded-lg shadow-lg p-3">
                <p className="text-xs font-semibold text-muted-foreground mb-2">関連記事</p>
                <ul className="space-y-1">
                  {skill.articles!.map((article) => (
                    <li key={article.url}>
                      <Link
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-accent hover:underline line-clamp-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {article.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        )
      })}
    </div>
  )
}

export default SkillsContainer
