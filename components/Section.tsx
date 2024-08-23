'use client'

import { useState, useRef, useEffect } from 'react'

const Section = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const [centerIndex, setCenterIndex] = useState<number>(1)
  const projects = ['Project 1', 'Project 2', 'Project 3', 'Project 4', 'Project 5']

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const containerWidth = scrollRef.current.offsetWidth
        const scrollLeft = scrollRef.current.scrollLeft
        const itemWidth = containerWidth / 3
        const index = Math.round((scrollLeft + itemWidth / 2) / itemWidth) % projects.length
        setCenterIndex(index)
      }
    }

    const scrollElement = scrollRef.current
    scrollElement?.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      scrollElement?.removeEventListener('scroll', handleScroll)
    }
  }, [projects.length])

  return (
    <section className="relative w-full  h-auto p-10 overflow-hidden mt-11">
      <div
        ref={scrollRef}
        className="flex overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory hide-scrollbar"
        style={{ scrollSnapType: 'x mandatory', display: 'flex', width: '100%' }}
      >
        {[...projects, ...projects, ...projects].map((project, index) => (
          <div
            key={index}
            className={`bg-white shadow-lg p-5 w-[calc(100%/3)] h-96 flex justify-center items-center snap-center mx-2 mt-4 mb-16 flex-shrink-0 transition-transform duration-300 ${
              index % projects.length === centerIndex ? 'scale-110' : 'scale-75'
            }`}
          >
            <h2 className="text-2xl font-bold">{project}</h2>
          </div>
        ))}
      </div>
      <div className="absolute bottom-5 left-0 right-0 flex justify-center space-x-2">
        {projects.map((_, index) => (
          <div key={index} className={`w-3 h-3 rounded-full ${centerIndex === index ? 'bg-white' : 'bg-gray-300'}`} />
        ))}
      </div>
    </section>
  )
}

export default Section
