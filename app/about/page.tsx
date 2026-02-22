'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import Header from '@/components/layout/Header'
import { experiences } from '@/data/experiences'
import Footer from '@/components/layout/Footer'
import { useInView } from 'react-intersection-observer'
import { useMergeRefs } from '@/hooks/use-merge-refs'
import { motion } from 'framer-motion'

export default function Page() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isUserInteracting, setIsUserInteracting] = useState(false)
  const timelineRef = useRef<HTMLDivElement>(null)
  const interactionTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const { ref: timelineInViewRef, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false
  })
  const mergedRef = useMergeRefs(timelineRef, timelineInViewRef)

  const startUserInteraction = useCallback(() => {
    setIsUserInteracting(true)
    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current)
    }
    interactionTimeoutRef.current = setTimeout(() => {
      setIsUserInteracting(false)
    }, 5000)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (timelineRef.current && !isUserInteracting) {
        const items = timelineRef.current.querySelectorAll('li')
        let newActiveIndex: number | null = null

        items.forEach((item, index) => {
          const itemRect = item.getBoundingClientRect()
          const itemMiddle = itemRect.top + itemRect.height / 2

          if (itemMiddle > window.innerHeight * 0.3 && itemMiddle < window.innerHeight * 0.7) {
            newActiveIndex = index
          }
        })

        setActiveIndex(newActiveIndex)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [isUserInteracting])

  useEffect(() => {
    if (!inView || isUserInteracting || hoveredIndex !== null) return

    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        if (prev === null) return 0
        return (prev + 1) % experiences.length
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [inView, isUserInteracting, hoveredIndex])

  const handleTimelineMouseEnter = useCallback(() => {
    startUserInteraction()
  }, [startUserInteraction])

  const effectiveActiveIndex = hoveredIndex !== null ? hoveredIndex : activeIndex

  return (
    <div className="min-h-screen">
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-8 flex-grow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex flex-col gap-8 lg:flex-row">
              {/* Profile Card */}
              <div className="w-full lg:w-1/3 bg-card p-8 rounded-xl border border-border transition-all duration-300 hover:shadow-md">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-2 border-border sm:w-40 sm:h-40">
                  <Image
                    src="/profile.jpg"
                    alt="Shimizu Toma"
                    width={160}
                    height={160}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-2xl font-bold text-center mb-6 text-foreground sm:text-3xl">
                  Shimizu Toma
                </h2>
                <div className="mb-8">
                  <h3 className="font-bold mb-2 text-lg text-accent">
                    PROFILE
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">名城大学</p>
                  <p className="text-muted-foreground leading-relaxed">理工学研究科 情報工学専攻修士1年</p>
                </div>
                <hr className="border-border mb-8" />
                <div>
                  <h3 className="font-bold mb-4 text-lg text-accent">SNS</h3>
                  <div className="flex justify-center gap-6">
                    <a
                      href="https://github.com/thomas0124"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-transform duration-300 hover:scale-110"
                    >
                      <Image src="/github.svg" alt="GitHub" width={40} height={40} />
                    </a>
                    <a
                      href="https://www.instagram.com/tomas_03124"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-transform duration-300 hover:scale-110"
                    >
                      <Image src="/instagram.svg" alt="Instagram" width={40} height={40} />
                    </a>
                    <a
                      href="https://x.com/Tomas_engineer"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-transform duration-300 hover:scale-110"
                    >
                      <Image src="/twitter.svg" alt="X" width={40} height={40} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Experience Timeline */}
              <div className="w-full lg:w-2/3 bg-card p-8 rounded-xl border border-border">
                <h2 className="text-2xl font-bold mb-2 text-foreground relative inline-block sm:text-3xl">
                  ABOUT ME
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent" />
                </h2>
                <h3 className="text-lg font-bold mb-6 mt-6 text-accent flex items-center sm:text-xl">
                  EXPERIENCE
                </h3>
                <div
                  ref={mergedRef}
                  className={`relative pl-6 mb-6 transition-opacity duration-1000 ${inView ? 'opacity-100' : 'opacity-0'}`}
                  onMouseEnter={handleTimelineMouseEnter}
                >
                  {/* Timeline line */}
                  <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />

                  <ul className="flex flex-col gap-3">
                    {experiences.map((experience, index) => {
                      const isActive = effectiveActiveIndex === index
                      const year = experience.split('\u5E74')[0]
                      const month = experience.split('\u5E74')[1]?.split('\u6708')[0]
                      const content = experience.split(': ')[1]

                      return (
                        <li
                          key={index}
                          className={`relative transition-all duration-500 ${inView ? 'opacity-100' : 'opacity-0'} ${
                            isActive ? 'translate-x-1' : ''
                          }`}
                          style={{ transitionDelay: `${index * 80}ms` }}
                          onMouseEnter={() => {
                            setHoveredIndex(index)
                            startUserInteraction()
                          }}
                          onMouseLeave={() => {
                            setHoveredIndex(null)
                          }}
                        >
                          {/* Timeline dot */}
                          <div
                            className={`absolute -left-4 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 transition-all duration-300 z-10 ${
                              isActive
                                ? 'bg-accent border-accent scale-125'
                                : 'bg-background border-border'
                            }`}
                          />

                          <div
                            className={`ml-4 p-3 rounded-lg transition-all duration-300 ${
                              isActive
                                ? 'bg-secondary shadow-sm'
                                : 'hover:bg-secondary/50'
                            }`}
                          >
                            <div className="flex flex-col gap-1 sm:flex-row sm:items-center">
                              <span
                                className={`text-xs font-mono px-2 py-0.5 rounded-md mr-2 inline-block transition-all duration-300 ${
                                  isActive
                                    ? 'bg-accent text-accent-foreground'
                                    : 'bg-secondary text-muted-foreground'
                                }`}
                              >
                                {year}{'\u5E74'}{month}{'\u6708'}
                              </span>
                              <span
                                className={`text-sm transition-colors duration-300 sm:text-base ${
                                  isActive ? 'text-foreground' : 'text-muted-foreground'
                                }`}
                              >
                                {content}
                              </span>
                            </div>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </main>

        <Footer />
      </div>
    </div>
  )
}
