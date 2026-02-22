'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <section className="min-h-[calc(100vh-80px)] flex flex-col justify-center items-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center max-w-4xl mx-auto"
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-200">
          Welcome to My Portfolio
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
          I &rsquo; m a passionate developer specializing in creating beautiful and functional web experiences.
        </p>

        <div className="relative w-64 h-64 mx-auto my-12">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 opacity-20 animate-pulse-slow blur-xl"></div>
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 opacity-70 animate-spin-slow blur-sm"></div>
          <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-blue-500/30 z-10">
            <Image
              src="/profile.jpg"
              width={160}
              height={160}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.8 }}>
          <a
            href="#projects"
            className="inline-block mt-8 px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium text-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
          >
            View My Projects
          </a>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-blue-400"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  )
}
