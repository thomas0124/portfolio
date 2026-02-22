'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="min-h-[calc(100vh-80px)] flex flex-col justify-center items-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center max-w-3xl mx-auto"
      >
        <div className="relative w-40 h-40 mx-auto mb-10">
          <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-border">
            <Image
              src="/profile.jpg"
              width={160}
              height={160}
              alt="Shimizu Toma"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <h1 className="text-4xl font-bold mb-4 text-foreground text-balance md:text-5xl lg:text-6xl">
          Welcome to My Portfolio
        </h1>
        <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed md:text-xl">
          {"I'm a passionate developer specializing in creating beautiful and functional web experiences."}
        </p>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.8 }}>
          <a
            href="#projects"
            className="inline-block px-8 py-3 rounded-full bg-accent text-accent-foreground font-medium text-base transition-all duration-300 hover:opacity-90 hover:shadow-md"
          >
            View My Projects
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ArrowDown className="w-5 h-5 text-muted-foreground" />
      </motion.div>
    </section>
  )
}
