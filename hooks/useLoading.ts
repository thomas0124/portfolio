import { useState, useEffect } from 'react'

export function useLoading() {
  const [loading, setLoading] = useState(true)

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

  return { loading, setLoading }
}
