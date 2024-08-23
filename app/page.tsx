'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Section from '@/components/Section'
import LoadScreen from '@/components/LoadScreen'

export default function Home() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000) // ローディング画面を3秒間表示

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <LoadScreen onComplete={() => setLoading(false)} />
  }
  return (
    <div className="bg-gradient-to-r from-[#B6A4FF] to-[#366BF4] h-screen">
      <Header />
      <Section />
    </div>
  )
}
