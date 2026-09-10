'use client'

import { useEffect, useState } from 'react'
import { ExternalLink } from 'lucide-react'

interface OGData {
  title: string | null
  description: string | null
  image: string | null
  siteName: string | null
}

interface Props {
  url: string
  cardRect: DOMRect
}

export default function OGPreviewCard({ url, cardRect }: Props) {
  const [data, setData] = useState<OGData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    setData(null)
    fetch(`/api/og-preview?url=${encodeURIComponent(url)}`)
      .then((r) => r.json())
      .then((d) => {
        if (!d.error) setData(d)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [url])

  const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 800
  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1200
  const previewHeight = 220
  const previewWidth = 280

  const showAbove = cardRect.bottom + previewHeight + 8 > viewportHeight
  const top = showAbove
    ? cardRect.top - previewHeight - 8
    : cardRect.bottom + 8

  const rawLeft = cardRect.left + cardRect.width / 2 - previewWidth / 2
  const left = Math.max(8, Math.min(rawLeft, viewportWidth - previewWidth - 8))

  return (
    <div
      className="fixed z-[9999] w-[280px] bg-card border border-border rounded-2xl shadow-xl overflow-hidden pointer-events-none"
      style={{ top, left }}
    >
      {loading ? (
        <div className="flex items-center justify-center h-[100px]">
          <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      ) : data ? (
        <>
          {data.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.image}
              alt={data.title ?? ''}
              className="w-full h-[140px] object-cover"
              onError={(e) => { e.currentTarget.style.display = 'none' }}
            />
          )}
          <div className="p-3 space-y-1">
            {data.siteName && (
              <p className="text-[10px] font-semibold text-accent uppercase tracking-widest">
                {data.siteName}
              </p>
            )}
            {data.title && (
              <p className="text-xs font-bold text-foreground line-clamp-2 leading-snug">
                {data.title}
              </p>
            )}
            {data.description && (
              <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
                {data.description}
              </p>
            )}
            <div className="flex items-center gap-1 pt-0.5">
              <ExternalLink className="w-3 h-3 text-muted-foreground/60" />
              <span className="text-[10px] text-muted-foreground/60 truncate">
                {new URL(url).hostname}
              </span>
            </div>
          </div>
        </>
      ) : null}
    </div>
  )
}
