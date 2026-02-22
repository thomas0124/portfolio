'use client'

import type React from 'react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

interface NavLinkProps {
  href: string
  children: React.ReactNode
  isActive?: boolean
  onClick?: () => void
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, isActive = false, onClick }) => {
  return (
    <Link
      href={href}
      className={`relative py-2 px-3 text-lg font-medium transition-colors duration-300
        ${isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}
      `}
      onClick={onClick}
    >
      {children}
      <span
        className={`
          absolute left-3 right-3 bottom-0 h-0.5 bg-accent rounded-full
          transition-transform duration-300 origin-left
          ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
        `}
      />
    </Link>
  )
}

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

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
        ${scrolled ? 'bg-background/80 backdrop-blur-md shadow-sm' : 'bg-transparent'}
      `}
      role="banner"
    >
      <div className="mx-4 my-2 flex flex-wrap justify-between items-center">
        <h1
          className={`
            text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground
            transition-all duration-500 ease-in-out
            ${scrolled ? 'scale-90 origin-left' : ''}
          `}
        >
          {"Thomas's"} <br className="hidden sm:inline" /> Portfolio
        </h1>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:gap-2">
          <NavLink href="/" isActive={pathname === '/'}>
            Home
          </NavLink>
          <NavLink href="/about" isActive={pathname === '/about'}>
            About
          </NavLink>
          <NavLink href="/stack" isActive={pathname === '/stack'}>
            My Stack
          </NavLink>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={`
            md:hidden text-foreground p-2 rounded-lg focus:outline-none
            transition-all duration-300 ease-in-out
            ${isMenuOpen ? 'bg-secondary' : 'hover:bg-secondary'}
          `}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <div className="relative w-6 h-6">
            <span
              className={`
                absolute block w-6 h-0.5 bg-foreground transform transition-all duration-300 ease-in-out
                ${isMenuOpen ? 'rotate-45 top-3' : 'top-1'}
              `}
            />
            <span
              className={`
                absolute block w-6 h-0.5 bg-foreground top-3 transform transition-all duration-300 ease-in-out
                ${isMenuOpen ? 'opacity-0' : 'opacity-100'}
              `}
            />
            <span
              className={`
                absolute block w-6 h-0.5 bg-foreground transform transition-all duration-300 ease-in-out
                ${isMenuOpen ? '-rotate-45 top-3' : 'top-5'}
              `}
            />
          </div>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden mt-2 bg-card rounded-lg p-4 border border-border mx-4 animate-fade-in">
          <nav className="flex flex-col gap-1">
            <NavLink href="/" isActive={pathname === '/'} onClick={toggleMenu}>
              Home
            </NavLink>
            <NavLink href="/about" isActive={pathname === '/about'} onClick={toggleMenu}>
              About
            </NavLink>
            <NavLink href="/stack" isActive={pathname === '/stack'} onClick={toggleMenu}>
              My Stack
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
