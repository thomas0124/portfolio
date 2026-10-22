'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

function getGreeting() {
  const h = new Date().getHours()
  if (h >= 5 && h < 12) return { text: 'Good morning', emoji: '☀️' }
  if (h >= 12 && h < 18) return { text: 'Good afternoon', emoji: '✨' }
  if (h >= 18 && h < 23) return { text: 'Good evening', emoji: '🌙' }
  return { text: 'Good night', emoji: '⭐' }
}

const ROLES = ['Software Developer', 'Hackathon Winner', 'Full-Stack Developer', 'AI Engineer']

function useTypewriter(words: string[]) {
  const [displayed, setDisplayed] = useState(words[0])
  const [active, setActive] = useState(false)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let index = 0
    let length = words[0].length
    let deleting = true
    let timer: ReturnType<typeof setTimeout> | undefined

    const tick = () => {
      if (document.hidden || reducedMotion.matches) return
      const current = words[index]
      length += deleting ? -1 : 1
      setDisplayed(current.slice(0, length))
      let delay = deleting ? 38 : 75
      if (length === 0) {
        index = (index + 1) % words.length
        deleting = false
        delay = 75
      } else if (length === current.length) {
        deleting = true
        delay = 2200
      }
      timer = setTimeout(tick, delay)
    }

    const synchronize = () => {
      clearTimeout(timer)
      const shouldAnimate = !document.hidden && !reducedMotion.matches
      setActive(shouldAnimate)
      if (reducedMotion.matches) {
        index = 0
        length = words[0].length
        deleting = true
        setDisplayed(words[0])
      }
      if (shouldAnimate) timer = setTimeout(tick, 2200)
    }

    synchronize()
    document.addEventListener('visibilitychange', synchronize)
    reducedMotion.addEventListener('change', synchronize)
    return () => {
      clearTimeout(timer)
      document.removeEventListener('visibilitychange', synchronize)
      reducedMotion.removeEventListener('change', synchronize)
    }
  }, [words])

  return { displayed, active }
}

const REACTIONS = [
  { threshold: 0, emoji: '✨' },
  { threshold: 1, emoji: '😊' },
  { threshold: 3, emoji: '😄' },
  { threshold: 5, emoji: '🤩' },
  { threshold: 10, emoji: '🎊' }
]

function getReaction(count: number) {
  return [...REACTIONS].reverse().find((r) => count >= r.threshold)!.emoji
}

export default function HeroSection() {
  const [greeting, setGreeting] = useState({ text: 'Good morning', emoji: '☀️' })
  const role = useTypewriter(ROLES)

  const [clickCount, setClickCount] = useState(0)
  const [showReaction, setShowReaction] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setGreeting(getGreeting())
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

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

      <div className="text-center max-w-4xl mx-auto">
        {/* profile image */}
        <div className="relative w-40 h-40 mx-auto mb-8 group">
          <button
            type="button"
            aria-label="React to profile"
            className="relative w-full h-full rounded-[2.5rem] overflow-hidden border-4 border-background shadow-xl rotate-3 group-hover:rotate-0 transition-transform duration-500 cursor-pointer"
            onClick={handleProfileClick}
          >
            <Image
              src="/profile.webp"
              width={160}
              height={160}
              alt="Shimizu Toma"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              priority
              sizes="160px"
            />
          </button>

          <div
            key={getReaction(clickCount)}
            className="absolute -bottom-2 -right-2 w-10 h-10 bg-accent rounded-full border-4 border-background shadow-md flex items-center justify-center text-lg"
          >
            {getReaction(clickCount)}
          </div>

          <>
            {showReaction && (
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-2xl pointer-events-none">
                {getReaction(clickCount)}
              </div>
            )}
          </>
        </div>

        {/* greeting */}
        <h1 className="text-4xl font-extrabold mb-4 text-foreground text-balance md:text-5xl lg:text-6xl tracking-tight">
          {greeting.text}, I&lsquo;m Tomas! {greeting.emoji}
        </h1>

        <h2 className="text-xl md:text-2xl font-bold text-accent mb-6 h-8 flex items-center justify-center gap-1">
          <span className="sr-only">{ROLES.join(', ')}</span>
          <span aria-hidden="true">{role.displayed}</span>
          <span
            aria-hidden="true"
            className="inline-block w-[2px] h-6 bg-accent ml-0.5 align-middle animate-pulse motion-reduce:hidden"
            style={{ animationDuration: '1s', animationPlayState: role.active ? 'running' : 'paused' }}
          />
        </h2>

        <p className="text-base text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed md:text-lg font-medium">
          {"I'm a passionate developer specializing in creating beautiful and functional web experiences."}
        </p>

        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 max-w-3xl mx-auto">
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
        </div>
      </div>
    </section>
  )
}
