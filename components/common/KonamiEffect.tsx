'use client'

import { useEffect, useRef, useState } from 'react'

const KONAMI = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a'
]

export default function KonamiEffect() {
  const [active, setActive] = useState(false)
  const indexRef = useRef(0)

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(false)
      if (
        e.target instanceof HTMLElement &&
        (e.target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName))
      )
        return
      if (e.key === KONAMI[indexRef.current]) {
        indexRef.current++
        if (indexRef.current === KONAMI.length) {
          setActive(true)
          indexRef.current = 0
          clearTimeout(timeout)
          timeout = setTimeout(() => setActive(false), 4000)
        }
      } else {
        indexRef.current = e.key === KONAMI[0] ? 1 : 0
      }
    }
    window.addEventListener('keydown', handler)
    return () => {
      window.removeEventListener('keydown', handler)
      clearTimeout(timeout)
    }
  }, [])

  return (
    <>
      {active && (
        <div
          role="status"
          onClick={() => setActive(false)}
          className="fixed inset-0 z-[1000] flex flex-col items-center justify-center"
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div className="relative text-center pointer-events-none">
            <div className="text-8xl mb-4">🎮</div>
            <h2 className="text-5xl font-extrabold text-white tracking-widest drop-shadow-lg">KONAMI CODE!</h2>
            <p className="text-2xl text-yellow-400 mt-3 font-bold">+30 Lives 🎊</p>
            <div className="flex gap-3 justify-center mt-6 text-3xl">
              {['✨', '🌟', '💫', '⭐', '✨'].map((emoji, i) => (
                <span key={i}>{emoji}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
