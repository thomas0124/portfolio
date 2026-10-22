'use client'

import { useEffect, useRef } from 'react'

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let frame: number | null = null
    const onScroll = () => {
      if (frame !== null) return
      frame = requestAnimationFrame(() => {
        const scrollTop = window.scrollY
        const docHeight = document.body.offsetHeight - window.innerHeight
        const pct = docHeight > 0 ? Math.min(1, scrollTop / docHeight) : 0
        if (barRef.current) barRef.current.style.transform = `scaleX(${pct})`
        frame = null
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame !== null) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-0.5 z-50 pointer-events-none">
      <div ref={barRef} className="h-full bg-accent origin-left" style={{ transform: 'scaleX(0)' }} />
    </div>
  )
}
