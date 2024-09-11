'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Section from '@/components/Section'
import LoadScreen from '@/components/LoadScreen'
import ContactBox from '@/components/ContactBox'

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
      }, 10000) // Show loading screen for 3 seconds on initial load

      return () => clearTimeout(timer)
    }
  }, [])

  if (loading) {
    return <LoadScreen onComplete={() => setLoading(false)} />
  }

  return (
    <div className="bg-gradient-to-r from-[#B6A4FF] to-[#366BF4] h-[1080px] p-2">
      <Header />
      <Section />
      <ContactBox />
    </div>
  )
}
