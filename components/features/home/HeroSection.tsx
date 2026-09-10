'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// --- time-based greeting ---
function getGreeting() {
  const h = new Date().getHours()
  if (h >= 5 && h < 12) return { text: 'Good morning', emoji: '☀️' }
  if (h >= 12 && h < 18) return { text: 'Good afternoon', emoji: '✨' }
  if (h >= 18 && h < 23) return { text: 'Good evening', emoji: '🌙' }
  return { text: 'Good night', emoji: '⭐' }
}

// --- typewriter roles ---
const ROLES = [
  'Software Developer',
  'Hackathon Winner',
  'Full-Stack Developer',
  'Unity Developer',
]

function useTypewriter(words: string[]) {
  const [index, setIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [typing, setTyping] = useState(true)

  useEffect(() => {
    const current = words[index]
    if (typing) {
      if (displayed.length < current.length) {
        const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 75)
        return () => clearTimeout(t)
      }
      const t = setTimeout(() => setTyping(false), 2200)
      return () => clearTimeout(t)
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(d => d.slice(0, -1)), 38)
        return () => clearTimeout(t)
      }
      setIndex(i => (i + 1) % words.length)
      setTyping(true)
    }
  }, [displayed, typing, index, words])

  return displayed
}

// --- profile click reactions ---
const REACTIONS = [
  { threshold: 0,  emoji: '✨' },
  { threshold: 1,  emoji: '😊' },
  { threshold: 3,  emoji: '😄' },
  { threshold: 5,  emoji: '🤩' },
  { threshold: 10, emoji: '🎊' },
]

function getReaction(count: number) {
  return [...REACTIONS].reverse().find(r => count >= r.threshold)!.emoji
}

export default function HeroSection() {
  const greeting = getGreeting()
  const role = useTypewriter(ROLES)

  const [clickCount, setClickCount] = useState(0)
  const [showReaction, setShowReaction] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleProfileClick = () => {
    const next = clickCount + 1
    setClickCount(next)
    setShowReaction(true)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setShowReaction(false), 1200)
  }

  return (
    <section className="flex flex-col justify-center items-center px-4 relative w-full">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
        className="text-center max-w-4xl mx-auto"
      >
        {/* profile image */}
        <div className="relative w-40 h-40 mx-auto mb-8 group">
          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="relative w-full h-full rounded-[2.5rem] overflow-hidden border-4 border-background shadow-xl rotate-3 group-hover:rotate-0 transition-transform duration-500 cursor-pointer"
            onClick={handleProfileClick}
          >
            <Image
              src="/profile.png"
              width={160}
              height={160}
              alt="Shimizu Toma"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </motion.div>

          <motion.div
            key={getReaction(clickCount)}
            className="absolute -bottom-2 -right-2 w-10 h-10 bg-accent rounded-full border-4 border-background shadow-md flex items-center justify-center text-lg"
            initial={{ scale: 1.5 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', bounce: 0.6, duration: 0.4 }}
          >
            {getReaction(clickCount)}
          </motion.div>

          <AnimatePresence>
            {showReaction && (
              <motion.div
                className="absolute -top-10 left-1/2 -translate-x-1/2 text-2xl pointer-events-none"
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 0, y: -24 }}
                exit={{}}
                transition={{ duration: 1.1, ease: 'easeOut' }}
              >
                {getReaction(clickCount)}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* greeting */}
        <h1 className="text-4xl font-extrabold mb-4 text-foreground text-balance md:text-5xl lg:text-6xl tracking-tight">
          {greeting.text}, I&lsquo;m Toma! {greeting.emoji}
        </h1>

        {/* typewriter role */}
        <h2 className="text-xl md:text-2xl font-bold text-accent mb-6 h-8 flex items-center justify-center gap-1">
          {role}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
            className="inline-block w-[2px] h-6 bg-accent ml-0.5 align-middle"
          />
        </h2>

        <p className="text-base text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed md:text-lg font-medium">
          {"I'm a passionate developer specializing in creating beautiful and functional web experiences."}
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 max-w-3xl mx-auto"
        >
          <Link
            href="/about"
            className="inline-flex w-full sm:w-auto items-center justify-center px-8 py-4 rounded-full bg-foreground text-background font-bold text-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-foreground/90"
          >
            About Me
          </Link>
          <Link
            href="/projects"
            className="inline-flex w-full sm:w-auto items-center justify-center px-8 py-4 rounded-full bg-accent text-accent-foreground font-bold text-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:opacity-95"
          >
            View Projects
          </Link>
          <Link
            href="/contact"
            className="inline-flex w-full sm:w-auto items-center justify-center px-8 py-4 rounded-full bg-background text-foreground border-2 border-border font-bold text-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-accent hover:text-accent"
          >
            Contact Me
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
