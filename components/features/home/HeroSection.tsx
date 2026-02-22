'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <section className="flex flex-col justify-center items-center px-4 relative w-full">
      {/* 背景の可愛いぼかし装飾（デコレーション） */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
        className="text-center max-w-4xl mx-auto"
      >
        <div className="relative w-40 h-40 mx-auto mb-8 group">
          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="relative w-full h-full rounded-[2.5rem] overflow-hidden border-4 border-background shadow-xl rotate-3 group-hover:rotate-0 transition-transform duration-500"
          >
            <Image
              src="/profile.jpg"
              width={160}
              height={160}
              alt="Shimizu Toma"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </motion.div>
          {/* ポップなアクセントドット（キラキラを追加） */}
          <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-accent rounded-full border-4 border-background shadow-md flex items-center justify-center text-lg">
            ✨
          </div>
        </div>

        <h1 className="text-4xl font-extrabold mb-4 text-foreground text-balance md:text-5xl lg:text-6xl tracking-tight">
          Hi, I &lsquo; m Toma! 👋
        </h1>
        <h2 className="text-xl md:text-2xl font-bold text-accent mb-6">Software Developer</h2>

        <p className="text-base text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed md:text-lg font-medium">
          {"I'm a passionate developer specializing in creating beautiful and functional web experiences."}
        </p>

        {/* 3つのボタンを並べる（スマホでは縦積み、PCでは横並びで折り返し許容） */}
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
