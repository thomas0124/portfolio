'use client'

import dynamic from 'next/dynamic'

const BackgroundGlobeInner = dynamic(
  () => import('./BackgroundGlobeInner'),
  { ssr: false }
)

export default function BackgroundGlobe() {
  return <BackgroundGlobeInner />
}
