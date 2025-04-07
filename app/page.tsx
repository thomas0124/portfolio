'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Section from '@/components/Section'
import LoadScreen from '@/components/LoadScreen'
import ContactBox from '@/components/ContactBox'
import BackgroundGlobe from '@/components/BackgroundGlobe'
import Footer from '@/components/Footer'

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const hasLoaded = localStorage.getItem('hasLoaded')

    if (hasLoaded) {
      setLoading(false)
    } else {
      const timer = setTimeout(() => {
        setLoading(false)
        localStorage.setItem('hasLoaded', 'true')
      }, 10000)

      return () => clearTimeout(timer)
    }
  }, [])

  // Handle scroll to update progress and active section
  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress (0 to 1)
      const scrollTop = window.scrollY
      const docHeight = document.body.offsetHeight
      const winHeight = window.innerHeight
      const scrollPercent = scrollTop / (docHeight - winHeight)
      setScrollProgress(Math.min(1, Math.max(0, scrollPercent)))

      // Determine active section based on scroll position
      const sections = ['projects', 'contact']
      const projectsSection = document.getElementById('projects')
      const contactSection = document.getElementById('contact')

      if (contactSection && window.scrollY + window.innerHeight / 2 > contactSection.offsetTop) {
        setActiveSection('contact')
      } else if (projectsSection && window.scrollY + window.innerHeight / 2 > projectsSection.offsetTop) {
        setActiveSection('projects')
      } else {
        setActiveSection(null)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial call

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (loading) {
    return <LoadScreen onComplete={() => setLoading(false)} />
  }

  return (
    <div className="relative min-h-screen text-white overflow-hidden perspective-1000">
      <BackgroundGlobe />

      {/* Scroll progress indicator */}
      <div className="fixed top-0 left-0 w-full h-1 z-50">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      <div className="relative z-10">
        <Header />

        {/* Hero Section */}
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

        {/* Projects Section */}
        <section id="projects" className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/10 to-transparent pointer-events-none"></div>

          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: '-100px' }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-200 inline-block relative">
                My Projects
                <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400"></span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Check out some of my recent work and personal projects.
              </p>
            </motion.div>
          </div>

          <Section />
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/10 to-transparent pointer-events-none"></div>

          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: '-100px' }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-200 inline-block relative">
                Get In Touch
                <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400"></span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Have a question or want to work together? Send me a message!
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <div className="max-w-4xl mx-auto bg-black/30 backdrop-blur-sm p-8 rounded-xl border border-blue-900/30 shadow-xl shadow-blue-900/10 transform hover:shadow-blue-500/20 transition-all duration-500">
                <ContactBox />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Navigation dots */}
        <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
          <div className="flex flex-col items-center space-y-6">
            <a
              href="#"
              className={`w-3 h-3 rounded-full transition-all duration-300 ${activeSection === null ? 'bg-blue-400 scale-125 shadow-md shadow-blue-500/50' : 'bg-gray-400 hover:bg-blue-300'}`}
              aria-label="Go to top"
            />
            <a
              href="#projects"
              className={`w-3 h-3 rounded-full transition-all duration-300 ${activeSection === 'projects' ? 'bg-blue-400 scale-125 shadow-md shadow-blue-500/50' : 'bg-gray-400 hover:bg-blue-300'}`}
              aria-label="Go to projects"
            />
            <a
              href="#contact"
              className={`w-3 h-3 rounded-full transition-all duration-300 ${activeSection === 'contact' ? 'bg-blue-400 scale-125 shadow-md shadow-blue-500/50' : 'bg-gray-400 hover:bg-blue-300'}`}
              aria-label="Go to contact"
            />
          </div>
        </div>

        <Footer />
      </div>
    </div>
  )
}
