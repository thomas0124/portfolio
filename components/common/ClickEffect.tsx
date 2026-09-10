'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface Particle {
  id: number
  x: number
  y: number
  emoji: string
  dx: number
  dy: number
}

const EMOJIS = ['✨', '⭐', '🌟', '💫', '🎉', '🎊', '💥', '🌈']

export default function ClickEffect() {
  const [particles, setParticles] = useState<Particle[]>([])
  const counterRef = useRef(0)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const base = counterRef.current++ * 8
      const newParticles: Particle[] = Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2
        const dist = 60 + Math.random() * 40
        return {
          id: base + i,
          x: e.clientX,
          y: e.clientY,
          emoji: EMOJIS[i % EMOJIS.length],
          dx: Math.cos(angle) * dist,
          dy: Math.sin(angle) * dist - 20
        }
      })

      setParticles(prev => [...prev, ...newParticles])
      setTimeout(() => {
        setParticles(prev => prev.filter(p => !newParticles.some(np => np.id === p.id)))
      }, 900)
    }

    window.addEventListener('click', handler)
    return () => window.removeEventListener('click', handler)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-[998]">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute text-lg select-none"
          style={{ left: p.x, top: p.y }}
          initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          animate={{ opacity: 0, x: p.dx, y: p.dy, scale: 0.4 }}
          transition={{ duration: 0.85, ease: 'easeOut' }}
        >
          {p.emoji}
        </motion.div>
      ))}
    </div>
  )
}
