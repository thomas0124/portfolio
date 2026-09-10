'use client'

import { useEffect, useRef } from 'react'

type Season = 'spring' | 'summer' | 'autumn' | 'winter'

function getSeason(): Season {
  const m = new Date().getMonth() + 1
  if (m >= 3 && m <= 5) return 'spring'
  if (m >= 6 && m <= 8) return 'summer'
  if (m >= 9 && m <= 11) return 'autumn'
  return 'winter'
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  angle: number
  angleSpeed: number
  size: number
  opacity: number
  color: string
  t: number
}

const CONFIGS = {
  spring: {
    colors: ['#FFB7C5', '#FF91AB', '#FFC8D8', '#FFD1E0', '#FF69B4'],
    count: 28,
    minSize: 5,
    maxSize: 11,
    minSpeed: 0.4,
    maxSpeed: 1.1,
  },
  summer: {
    colors: ['#FFE878', '#BEFF78', '#78FFB4', '#A8FF78'],
    count: 20,
    minSize: 2,
    maxSize: 5,
    minSpeed: 0.1,
    maxSpeed: 0.4,
  },
  autumn: {
    colors: ['#C84820', '#E07828', '#D4A830', '#A83818', '#E85830', '#C87820'],
    count: 24,
    minSize: 7,
    maxSize: 16,
    minSpeed: 0.5,
    maxSpeed: 1.8,
  },
  winter: {
    colors: ['#FFFFFF', '#E8F4FF', '#D0E8FF', '#C0D8F0'],
    count: 38,
    minSize: 2,
    maxSize: 6,
    minSpeed: 0.25,
    maxSpeed: 0.8,
  },
}

function rand(min: number, max: number) {
  return min + Math.random() * (max - min)
}

function makeParticle(season: Season, w: number, h: number, scattered = false): Particle {
  const cfg = CONFIGS[season]
  return {
    x: rand(0, w),
    y: scattered ? rand(-h, h) : rand(-120, -10),
    vx: rand(-0.4, 0.4),
    vy: rand(cfg.minSpeed, cfg.maxSpeed),
    angle: rand(0, Math.PI * 2),
    angleSpeed: rand(-0.025, 0.025),
    size: rand(cfg.minSize, cfg.maxSize),
    opacity: rand(0.25, 0.55),
    color: cfg.colors[Math.floor(Math.random() * cfg.colors.length)],
    t: rand(0, Math.PI * 2),
  }
}

function draw(ctx: CanvasRenderingContext2D, p: Particle, season: Season) {
  ctx.save()
  ctx.globalAlpha = p.opacity
  ctx.translate(p.x, p.y)
  ctx.rotate(p.angle)

  if (season === 'spring') {
    ctx.fillStyle = p.color
    ctx.beginPath()
    ctx.ellipse(0, 0, p.size * 0.45, p.size, 0, 0, Math.PI * 2)
    ctx.fill()

  } else if (season === 'summer') {
    const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size * 3)
    grad.addColorStop(0, p.color)
    grad.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.beginPath()
    ctx.arc(0, 0, p.size * 3, 0, Math.PI * 2)
    ctx.fillStyle = grad
    ctx.fill()

  } else if (season === 'autumn') {
    const s = p.size
    ctx.fillStyle = p.color
    ctx.beginPath()
    ctx.moveTo(0, -s)
    ctx.bezierCurveTo(s * 0.65, -s * 0.5, s * 0.65, s * 0.45, 0, s * 0.85)
    ctx.bezierCurveTo(-s * 0.65, s * 0.45, -s * 0.65, -s * 0.5, 0, -s)
    ctx.fill()
    ctx.beginPath()
    ctx.moveTo(0, s * 0.85)
    ctx.lineTo(s * 0.15, s * 1.4)
    ctx.strokeStyle = p.color
    ctx.lineWidth = 1
    ctx.globalAlpha = p.opacity * 0.6
    ctx.stroke()

  } else {
    // winter: simple circle
    ctx.fillStyle = p.color
    ctx.beginPath()
    ctx.arc(0, 0, p.size, 0, Math.PI * 2)
    ctx.fill()
  }

  ctx.restore()
}

export default function SeasonalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const season = getSeason()
    const cfg = CONFIGS[season]
    let w = 0
    let h = 0
    let animId: number

    const resize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const particles: Particle[] = Array.from({ length: cfg.count }, () =>
      makeParticle(season, w, h, true)
    )

    const tick = () => {
      ctx.clearRect(0, 0, w, h)

      for (const p of particles) {
        p.t += 0.018
        p.x += p.vx + Math.sin(p.t) * 0.5
        p.y += p.vy
        p.angle += p.angleSpeed

        if (season === 'summer') {
          p.vx += rand(-0.015, 0.015)
          p.vx = Math.max(-0.8, Math.min(0.8, p.vx))
          p.opacity = 0.2 + Math.abs(Math.sin(p.t * 1.8)) * 0.45
        }

        if (p.y > h + 40 || p.x < -60 || p.x > w + 60) {
          Object.assign(p, makeParticle(season, w, h, false))
        }

        draw(ctx, p, season)
      }

      animId = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  )
}
