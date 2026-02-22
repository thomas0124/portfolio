'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LoadScreenProps {
  onComplete: () => void
}

export default function LoadScreen({ onComplete }: LoadScreenProps) {
  const [displayText, setDisplayText] = useState('')
  const fullText = 'Hello World!'

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      setDisplayText(fullText.slice(0, index + 1))
      index++
      if (index >= fullText.length) {
        clearInterval(interval)
        setTimeout(() => {
          onComplete()
        }, 600)
      }
    }, 80)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="flex flex-col items-center"
        >
          <h1 className="text-3xl font-light tracking-wide text-foreground sm:text-4xl">
            {displayText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
              className="inline-block w-[2px] h-8 bg-accent ml-1 align-middle"
            />
          </h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: 'easeInOut' }}
            className="mt-4 h-px w-24 bg-accent/40 origin-left"
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
