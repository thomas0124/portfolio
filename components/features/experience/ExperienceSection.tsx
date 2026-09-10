'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { experiences } from '@/data/experiences'
import OGPreviewCard from './OGPreviewCard'

export default function ExperienceSection() {
  const [hovered, setHovered] = useState<{ url: string; rect: DOMRect } | null>(null)
  const sortedExperiences = [...experiences].reverse()

  const getCategoryStyle = (category?: string) => {
    switch (category) {
      case 'event':
        return 'bg-rose-100 text-rose-600 border-rose-200'
      case 'internship':
        return 'bg-sky-100 text-sky-600 border-sky-200'
      case 'community':
        return 'bg-indigo-100 text-indigo-600 border-indigo-200'
      default:
        return 'bg-slate-100 text-slate-500 border-slate-200'
    }
  }

  return (
    <section id="experience" className="relative px-4 w-full">
      <div className="container mx-auto max-w-6xl">
        <div className="relative w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-0 gap-y-12">
            {sortedExperiences.map((item, index) => {
              const categoryStyle = getCategoryStyle(item.category)
              const CardWrapper = item.url
                ? ({ children }: { children: React.ReactNode }) => (
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="block h-full">
                      {children}
                    </a>
                  )
                : ({ children }: { children: React.ReactNode }) => <div className="h-full">{children}</div>

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28, delay: (index % 3) * 0.05 }}
                  viewport={{ once: true, margin: '0px' }}
                  className="relative group px-4 md:px-6"
                  onMouseEnter={item.url ? (e) => setHovered({ url: item.url!, rect: e.currentTarget.getBoundingClientRect() }) : undefined}
                  onMouseLeave={item.url ? () => setHovered(null) : undefined}
                >
                  <div className="absolute top-0 left-0 w-full h-0 border-t-[3px] border-dashed border-accent/30 -z-10" />
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-accent rounded-full border-4 border-background shadow-sm transition-transform duration-300 group-hover:scale-150 z-10" />
                  <CardWrapper>
                    <div className="mt-8 h-full bg-card/60 backdrop-blur-sm border border-border/60 p-5 rounded-[1.5rem] shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:border-accent/40 flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        {item.category ? (
                          <span
                            className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border ${categoryStyle}`}
                          >
                            {item.category}
                          </span>
                        ) : (
                          <div />
                        )}
                        <div className="flex items-center gap-1.5">
                          {item.url && (
                            <ExternalLink className="w-3 h-3 text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          )}
                          <span className="text-[11px] font-bold text-muted-foreground/80 bg-secondary/30 px-2 py-0.5 rounded-md">
                            {item.date}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-sm md:text-[15px] font-bold text-foreground leading-snug group-hover:text-accent transition-colors duration-300">
                          {item.content}
                        </h3>

                        {item.description && (
                          <p className="text-xs md:text-[13px] text-muted-foreground leading-relaxed pt-1 border-t border-border/40">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardWrapper>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
      {hovered && <OGPreviewCard url={hovered.url} cardRect={hovered.rect} />}
    </section>
  )
}
