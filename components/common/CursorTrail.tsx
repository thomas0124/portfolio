'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface Dot {
  id: number
  x: number
  y: number
}

const COLORS = ['#FFB800', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#DDA0DD']

export default function CursorTrail() {
  const [dots, setDots] = useState<Dot[]>([])
  const counterRef = useRef(0)
  const lastTimeRef = useRef(0)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const now = Date.now()
      if (now - lastTimeRef.current < 50) return
      lastTimeRef.current = now

      const id = counterRef.current++
      setDots(prev => [...prev.slice(-14), { id, x: e.clientX, y: e.clientY }])
      setTimeout(() => setDots(prev => prev.filter(d => d.id !== id)), 700)
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-[999]">
      {dots.map(dot => (
        <motion.div
          key={dot.id}
          className="absolute rounded-full"
          style={{
            left: dot.x,
            top: dot.y,
            width: 8,
            height: 8,
            backgroundColor: COLORS[dot.id % COLORS.length],
            translateX: '-50%',
            translateY: '-50%'
          }}
          initial={{ opacity: 0.75, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.7 }}
        />
      ))}
    </div>
  )
}
