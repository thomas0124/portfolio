'use client'

import dynamic from 'next/dynamic'

const LoadScreenInner = dynamic(
  () => import('./LoadScreenInner'),
  { ssr: false }
)

export default function LoadScreen(props: any) {
  return <LoadScreenInner {...props} />
}
