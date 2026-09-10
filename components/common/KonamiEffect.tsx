'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']

export default function KonamiEffect() {
  const [active, setActive] = useState(false)
  const indexRef = useRef(0)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === KONAMI[indexRef.current]) {
        indexRef.current++
        if (indexRef.current === KONAMI.length) {
          setActive(true)
          indexRef.current = 0
          setTimeout(() => setActive(false), 4000)
        }
      } else {
        indexRef.current = e.key === KONAMI[0] ? 1 : 0
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 z-[1000] flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <motion.div
            className="relative text-center pointer-events-none"
            initial={{ scale: 0, rotate: -12 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0 }}
            transition={{ type: 'spring', bounce: 0.5 }}
          >
            <div className="text-8xl mb-4">🎮</div>
            <h2 className="text-5xl font-extrabold text-white tracking-widest drop-shadow-lg">
              KONAMI CODE!
            </h2>
            <p className="text-2xl text-yellow-400 mt-3 font-bold">+30 Lives 🎊</p>
            <div className="flex gap-3 justify-center mt-6 text-3xl">
              {['✨', '🌟', '💫', '⭐', '✨'].map((emoji, i) => (
                <motion.span
                  key={i}
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                >
                  {emoji}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
