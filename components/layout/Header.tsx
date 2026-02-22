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
      className={`relative py-2 px-5 rounded-full text-base sm:text-lg font-bold transition-all duration-300 ease-out flex items-center justify-center
        ${isActive ? 'bg-accent text-accent-foreground shadow-sm scale-105' : 'text-muted-foreground hover:bg-secondary hover:text-foreground hover:scale-105'}
      `}
      onClick={onClick}
    >
      {children}
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
    <div className="sticky top-4 z-50 px-4 w-full flex justify-center pointer-events-none">
      <header
        className={`
          font-sans transition-all duration-500 w-full max-w-4xl rounded-full pointer-events-auto
          ${scrolled ? 'bg-background/90 backdrop-blur-md shadow-md py-2 px-6' : 'bg-transparent py-3 px-2'}
        `}
        role="banner"
      >
        <div className="flex justify-between items-center">
          <h1
            className={`
              font-bold text-foreground transition-all duration-500 ease-in-out
              ${scrolled ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-3xl lg:text-4xl'}
            `}
          >
            <Link href="/" onClick={() => setIsMenuOpen(false)}>
              {"Thomas's"} <br className={scrolled ? 'hidden' : 'hidden sm:inline'} /> Portfolio
            </Link>
          </h1>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:gap-4">
            <NavLink href="/" isActive={pathname === '/'}>
              Home
            </NavLink>
            <NavLink href="/about" isActive={pathname === '/about'}>
              About
            </NavLink>
            <NavLink href="/projects" isActive={pathname === '/projects'}>
              Projects
            </NavLink>
            <NavLink href="/contact" isActive={pathname === '/contact'}>
              Contact
            </NavLink>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className={`
              md:hidden text-foreground p-3 rounded-full focus:outline-none
              transition-all duration-300 ease-in-out
              ${isMenuOpen ? 'bg-secondary scale-95' : 'hover:bg-secondary hover:scale-105'}
            `}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-5">
              <span
                className={`
                  absolute block w-6 h-0.5 bg-foreground rounded-full transform transition-all duration-300 ease-in-out
                  ${isMenuOpen ? 'rotate-45 top-2.5' : 'top-0'}
                `}
              />
              <span
                className={`
                  absolute block w-6 h-0.5 bg-foreground rounded-full top-2.5 transform transition-all duration-300 ease-in-out
                  ${isMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'}
                `}
              />
              <span
                className={`
                  absolute block w-6 h-0.5 bg-foreground rounded-full transform transition-all duration-300 ease-in-out
                  ${isMenuOpen ? '-rotate-45 top-2.5' : 'top-5'}
                `}
              />
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`
            md:hidden overflow-hidden transition-all duration-300 ease-in-out
            ${isMenuOpen ? 'max-h-[350px] opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}
          `}
        >
          <div className="bg-card/90 backdrop-blur-sm rounded-2xl p-4 shadow-inner flex flex-col gap-2">
            <NavLink href="/" isActive={pathname === '/'} onClick={toggleMenu}>
              Home
            </NavLink>
            <NavLink href="/about" isActive={pathname === '/about'} onClick={toggleMenu}>
              About
            </NavLink>
            <NavLink href="/projects" isActive={pathname === '/projects'} onClick={toggleMenu}>
              Projects
            </NavLink>
            <NavLink href="/contact" isActive={pathname === '/contact'} onClick={toggleMenu}>
              Contact
            </NavLink>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Header
