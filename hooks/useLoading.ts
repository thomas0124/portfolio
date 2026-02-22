import { useState, useEffect } from 'react'

export function useLoading() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem('hasLoaded')

    if (hasLoaded) {
      setLoading(false)
    } else {
      const timer = setTimeout(() => {
        setLoading(false)
        sessionStorage.setItem('hasLoaded', 'true')
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [])

  return { loading, setLoading }
}
