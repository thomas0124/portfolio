import { useState, useEffect } from 'react'

export function useScrollNavigation() {
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress (0 to 1)
      const scrollTop = window.scrollY
      const docHeight = document.body.offsetHeight
      const winHeight = window.innerHeight
      const scrollPercent = scrollTop / (docHeight - winHeight)
      setScrollProgress(Math.min(1, Math.max(0, scrollPercent)))
      const sections = ['projects', 'contact']
      const projectsSection = document.getElementById('projects')
      const contactSection = document.getElementById('contact')

      if (contactSection && window.scrollY + window.innerHeight / 2 > contactSection.offsetTop) {
        setActiveSection('contact')
      } else if (projectsSection && window.scrollY + window.innerHeight / 2 > projectsSection.offsetTop) {
        setActiveSection('projects')
      } else {
        setActiveSection(null)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return { activeSection, scrollProgress }
}
