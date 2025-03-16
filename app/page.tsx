'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Section from '@/components/Section'
import LoadScreen from '@/components/LoadScreen'
import ContactBox from '@/components/ContactBox'
import BackgroundGlobe from '@/components/BackgroundGlobe'
import Footer from '@/components/Footer'

export default function Home() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const hasLoaded = localStorage.getItem('hasLoaded')

    if (hasLoaded) {
      setLoading(false)
    } else {
      const timer = setTimeout(() => {
        setLoading(false)
        localStorage.setItem('hasLoaded', 'true')
      }, 10000) // loading screen for 10 seconds

      return () => clearTimeout(timer)
    }
  }, [])

  if (loading) {
    return <LoadScreen onComplete={() => setLoading(false)} />
  }

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <BackgroundGlobe />
      <div className="relative z-10">
        <Header />
        <Section />
        <ContactBox />
        <Footer />
      </div>
    </div>
  )
}
