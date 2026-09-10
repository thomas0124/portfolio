import { useState, useRef, useEffect, useCallback } from 'react'

export function useProjectCarousel(totalProjects: number) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [centerIndex, setCenterIndex] = useState<number>(0)
  const [isMobile, setIsMobile] = useState<boolean>(false)

  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  const handleScroll = useCallback(() => {
    if (scrollRef.current) {
      const { offsetWidth, scrollLeft } = scrollRef.current
      const itemWidth = isMobile ? offsetWidth : offsetWidth / 3
      const index = Math.round((scrollLeft + itemWidth / 2) / itemWidth) % totalProjects
      setCenterIndex(index)
    }
  }, [isMobile, totalProjects])

  useEffect(() => {
    const scrollElement = scrollRef.current
    if (scrollElement) {
      handleResize()
      window.addEventListener('resize', handleResize)
      scrollElement.addEventListener('scroll', handleScroll)
      handleScroll()
    }

    return () => {
      window.removeEventListener('resize', handleResize)
      scrollElement?.removeEventListener('scroll', handleScroll)
    }
  }, [handleResize, handleScroll])

  return { scrollRef, centerIndex, isMobile }
}
