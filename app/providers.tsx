'use client'

import { ThemeProvider } from 'next-themes'
import SeasonalBackground from '@/components/common/SeasonalBackground'
import KonamiEffect from '@/components/common/KonamiEffect'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SeasonalBackground />
      {children}
      <KonamiEffect />
    </ThemeProvider>
  )
}
