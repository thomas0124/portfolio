'use client'

import type React from 'react'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ChevronRight } from 'lucide-react'
import { usePathname } from 'next/navigation'

interface NavLinkProps {
  href: string
  children: React.ReactNode
  isActive?: boolean
  onClick?: () => void
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, isActive = false, onClick }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  // Trigger animation when active state changes
  useEffect(() => {
    if (isActive) {
      setIsAnimating(true)
      const timer = setTimeout(() => setIsAnimating(false), 1000)
      return () => clearTimeout(timer)
    }
  }, [isActive])

  return (
    <Link
      href={href}
      className={`font-bold relative group transition-all duration-300 ease-in-out py-2 px-3 rounded-lg
        ${isHovered ? 'scale-105' : ''}
        ${isActive ? 'bg-gradient-to-r from-blue-900/40 to-cyan-900/20' : 'hover:bg-blue-900/20'}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="relative z-10">
        <span
          className={`
          text-transparent bg-clip-text bg-gradient-to-r 
          ${
            isActive
              ? 'from-blue-300 to-cyan-200'
              : 'from-white to-gray-200 group-hover:from-blue-300 group-hover:to-cyan-200'
          }
          transition-all duration-300
        `}
        >
          {children}
        </span>

        {/* Active/hover indicator line */}
        <span
          className={`
            block h-0.5 w-full bg-gradient-to-r from-blue-500 to-cyan-400 
            absolute left-0 bottom-0 transform scale-x-0 
            ${isActive ? 'scale-x-100' : 'group-hover:scale-x-100'} 
            transition-transform duration-300 ease-in-out origin-left
          `}
        />
      </div>

      {/* Background glow effect */}
      {(isActive || isHovered) && (
        <div
          className={`
            absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 
            rounded-lg blur-sm -z-10 transform scale-105
            ${isAnimating ? 'animate-pulse-slow' : ''}
          `}
        />
      )}

      {/* Active indicator */}
      {isActive && <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-blue-400 mr-1" />}
    </Link>
  )
}

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header
      className={`
        font-sans p-2 sticky top-0 z-50 transition-all duration-500
        ${scrolled ? 'bg-black/60 backdrop-blur-md shadow-lg shadow-blue-900/20' : 'bg-transparent'}
      `}
      role="banner"
    >
      <div className="mx-4 my-2 flex flex-wrap justify-between items-center">
        <h1
          className={`
            text-2xl sm:text-3xl lg:text-4xl font-bold 
            text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-200
            transition-all duration-500 ease-in-out
            ${scrolled ? 'scale-90 origin-left' : ''}
          `}
        >
          Thomas&rsquo;s <br className="hidden sm:inline" /> Portfolio
        </h1>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:space-x-4">
          <NavLink href="/" isActive={pathname === '/'}>
            <span className="text-lg lg:text-xl">Home</span>
          </NavLink>
          <NavLink href="/about" isActive={pathname === '/about'}>
            <span className="text-lg lg:text-xl">About</span>
          </NavLink>
          <NavLink href="/stack" isActive={pathname === '/stack'}>
            <span className="text-lg lg:text-xl">My Stack</span>
          </NavLink>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={`
            md:hidden text-white p-2 rounded-full focus:outline-none
            transition-all duration-300 ease-in-out
            ${isMenuOpen ? 'bg-gradient-to-r from-blue-600/50 to-cyan-600/50 rotate-90' : 'hover:bg-blue-900/30'}
          `}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <div className="relative w-6 h-6">
            <span
              className={`
                absolute block w-6 h-0.5 bg-gradient-to-r from-blue-300 to-cyan-200 transform transition-all duration-300 ease-in-out
                ${isMenuOpen ? 'rotate-45 top-3' : 'top-1'}
              `}
            />
            <span
              className={`
                absolute block w-6 h-0.5 bg-gradient-to-r from-blue-300 to-cyan-200 top-3 transform transition-all duration-300 ease-in-out
                ${isMenuOpen ? 'opacity-0' : 'opacity-100'}
              `}
            />
            <span
              className={`
                absolute block w-6 h-0.5 bg-gradient-to-r from-blue-300 to-cyan-200 transform transition-all duration-300 ease-in-out
                ${isMenuOpen ? '-rotate-45 top-3' : 'top-5'}
              `}
            />
          </div>
        </button>
      </div>

      {/* Mobile Navigation - Fixed version */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 bg-black/80 backdrop-blur-sm rounded-xl p-4 border border-blue-900/30 animate-fade-in">
          <nav className="flex flex-col space-y-2">
            <NavLink href="/" isActive={pathname === '/'} onClick={toggleMenu}>
              <div className="flex items-center">
                <ChevronRight className="h-4 w-4 mr-2 text-blue-400" />
                <span className="text-lg text-white">Home</span>
              </div>
            </NavLink>
            <NavLink href="/about" isActive={pathname === '/about'} onClick={toggleMenu}>
              <div className="flex items-center">
                <ChevronRight className="h-4 w-4 mr-2 text-blue-400" />
                <span className="text-lg text-white">About</span>
              </div>
            </NavLink>
            <NavLink href="/stack" isActive={pathname === '/stack'} onClick={toggleMenu}>
              <div className="flex items-center">
                <ChevronRight className="h-4 w-4 mr-2 text-blue-400" />
                <span className="text-lg text-white">My Stack</span>
              </div>
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
