'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import Header from '@/components/Header'
import BackgroundGlobe from '@/components/BackgroundGlobe'
import { experiences } from '@/data/experiences'
import Footer from '@/components/Footer'
import { useInView } from 'react-intersection-observer'
import { useMergeRefs } from '@/hooks/use-merge-refs'

export default function Page() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isUserInteracting, setIsUserInteracting] = useState(false)
  const timelineRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const interactionTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Use Intersection Observer to detect when timeline is in view
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
      if (timelineRef.current) {
        const rect = timelineRef.current.getBoundingClientRect()
        const windowHeight = window.innerHeight
        const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0)
        const percentVisible = visibleHeight / rect.height

        setScrollProgress(Math.max(0, Math.min(1, percentVisible)))
        if (!isUserInteracting) {
          const items = timelineRef.current.querySelectorAll('li')
          let newActiveIndex = null

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
    <div className="min-h-screen text-white perspective-1000">
      <BackgroundGlobe />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-8 flex-grow">
          <div className="bg-opacity-70 rounded-lg mb-12">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full lg:w-1/3 bg-black bg-opacity-30 backdrop-blur-sm p-6 rounded-xl transform transition-all duration-700 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-6 rounded-full overflow-hidden ring-4 ring-blue-500 shadow-lg relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-30 transition-opacity duration-700 z-10"></div>
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-70 group-hover:opacity-100 animate-spin-slow blur-sm"></div>
                  <Image
                    src="/profile.jpg"
                    alt="Profile illustration"
                    width={160}
                    height={160}
                    className="w-full h-full object-cover relative z-0 transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-200">
                  Shimizu Toma
                </div>
                <div className="mb-8 transform transition-all duration-500 hover:translate-x-1">
                  <h3 className="font-bold mb-2 text-xl sm:text-2xl text-blue-400 relative inline-block">
                    PROFILE
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-700 group-hover:w-full"></span>
                  </h3>
                  <p className="text-gray-300">名城大学</p>
                  <p className="text-gray-300">理工学部 情報工学科4年</p>
                </div>
                <hr className="border-gray-600 mb-8 opacity-50" />
                <div>
                  <h3 className="font-bold mb-4 text-xl sm:text-2xl text-blue-400">SNS</h3>
                  <div className="flex justify-center space-x-6">
                    <a
                      href="https://github.com/thomas0124"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative group"
                    >
                      <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-70 blur-md transition-all duration-500 group-hover:duration-200 animate-pulse-slow"></div>
                      <Image
                        src="/github.jpeg"
                        alt="GitHub"
                        width={48}
                        height={48}
                        className="rounded-full relative transform transition-all duration-500 group-hover:scale-110 z-10"
                      />
                    </a>
                    <a
                      href="https://www.instagram.com/tomas_03124"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative group"
                    >
                      <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-70 blur-md transition-all duration-500 group-hover:duration-200 animate-pulse-slow"></div>
                      <Image
                        src="/instagram.jpg"
                        alt="Instagram"
                        width={48}
                        height={48}
                        className="rounded-full relative transform transition-all duration-500 group-hover:scale-110 z-10"
                      />
                    </a>
                    <a
                      href="https://x.com/Tomas_engineer"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative group"
                    >
                      <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-gray-500 to-blue-500 opacity-0 group-hover:opacity-70 blur-md transition-all duration-500 group-hover:duration-200 animate-pulse-slow"></div>
                      <Image
                        src="/X.jpg"
                        alt="X"
                        width={48}
                        height={48}
                        className="rounded-full relative transform transition-all duration-500 group-hover:scale-110 z-10"
                      />
                    </a>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-2/3 bg-black bg-opacity-30 backdrop-blur-sm p-6 rounded-xl transform transition-all duration-700 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-200 relative inline-block">
                  ABOUT ME
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400"></span>
                </h2>
                <h3 className="text-xl sm:text-2xl font-bold mb-6 text-blue-400 flex items-center">
                  <span className="mr-2">EXPERIENCE</span>
                  <div className="h-1 flex-grow rounded-full bg-gray-700 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${scrollProgress * 100}%` }}
                    ></div>
                  </div>
                </h3>
                <div
                  ref={mergedRef}
                  className={`relative pl-6 mb-6 transition-opacity duration-1000 ${inView ? 'opacity-100' : 'opacity-0'}`}
                  onMouseEnter={handleTimelineMouseEnter}
                >
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 via-blue-500 to-cyan-400">
                    <div
                      className="absolute top-0 left-0 w-full bg-gradient-to-b from-blue-400 via-blue-500 to-cyan-400 transition-all duration-1000 ease-out"
                      style={{
                        height: `${scrollProgress * 100}%`,
                        boxShadow: '0 0 10px rgba(59, 130, 246, 0.5), 0 0 20px rgba(59, 130, 246, 0.3)'
                      }}
                    ></div>
                  </div>
                  <ul className="space-y-4 sm:space-y-6">
                    {experiences.map((experience, index) => {
                      const isActive = effectiveActiveIndex === index
                      const year = experience.split('年')[0]
                      const month = experience.split('年')[1]?.split('月')[0]
                      const content = experience.split(': ')[1]

                      return (
                        <li
                          key={index}
                          className={`relative transition-all duration-700 ${inView ? 'opacity-100' : 'opacity-0'} ${
                            isActive ? 'translate-x-2 scale-105' : ''
                          }`}
                          style={{
                            transitionDelay: `${index * 100}ms`
                          }}
                          onMouseEnter={() => {
                            setHoveredIndex(index)
                            startUserInteraction()
                          }}
                          onMouseLeave={() => {
                            setHoveredIndex(null)
                          }}
                        >
                          <div
                            className={`absolute -left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 rounded-full border-4 border-gray-800 transition-all duration-500 z-10 ${
                              isActive ? 'scale-125' : ''
                            }`}
                            style={{
                              background: isActive ? 'linear-gradient(to right, #3b82f6, #06b6d4)' : '#3b82f6',
                              boxShadow: isActive
                                ? '0 0 15px rgba(59, 130, 246, 0.8), 0 0 30px rgba(59, 130, 246, 0.4)'
                                : 'none'
                            }}
                          >
                            {isActive && (
                              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full bg-blue-400 animate-ping-fast opacity-75"></span>
                            )}
                          </div>

                          <div
                            className={`ml-4 p-3 rounded-lg transition-all duration-500 transform ${
                              isActive
                                ? 'bg-gradient-to-r from-blue-900/40 to-cyan-900/20 scale-105 -rotate-1 shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                                : 'hover:bg-blue-900/20'
                            }`}
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center mb-1">
                              <div
                                className={`text-xs font-mono px-2 py-0.5 rounded-md mr-2 mb-1 sm:mb-0 inline-block transition-all duration-500 ${
                                  isActive
                                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                                    : 'bg-blue-900/40 text-blue-300'
                                }`}
                              >
                                {year}年{month}月
                              </div>
                              <span
                                className={`text-sm sm:text-base transition-all duration-500 ${
                                  isActive ? 'text-white' : 'text-gray-300'
                                }`}
                              >
                                {content}
                              </span>
                            </div>

                            {isActive && (
                              <div className="h-0.5 w-0 bg-gradient-to-r from-blue-500 to-cyan-400 mt-1 animate-expand-width"></div>
                            )}
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  )
}
