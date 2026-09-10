'use client'

import { ThemeProvider } from 'next-themes'
import ClickEffect from '@/components/common/ClickEffect'
import CursorTrail from '@/components/common/CursorTrail'
import KonamiEffect from '@/components/common/KonamiEffect'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
      <CursorTrail />
      <ClickEffect />
      <KonamiEffect />
    </ThemeProvider>
  )
}
