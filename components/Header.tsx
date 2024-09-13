'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

interface NavLinkProps {
  href: string
  children: React.ReactNode
  onClick?: () => void
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, onClick }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      href={href}
      className={`font-bold text-white relative group transition-all duration-300 ease-in-out py-1 ${
        isHovered ? 'scale-110' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {children}
      <span className="block h-0.5 w-full bg-white absolute left-0 bottom-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-left" />
    </Link>
  )
}

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="font-sans p-2" role="banner">
      <div className="mx-4 my-2 flex flex-wrap justify-between items-center">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white animate-fadeIn">
          Thomas&rsquo;s <br className="hidden sm:inline" /> Portfolio
        </h1>
        <nav className="hidden md:flex md:flex-col md:items-end md:space-y-2">
          <NavLink href="/">
            <span className="text-xl text-white lg:text-3xl">Home</span>
          </NavLink>
          <NavLink href="/about">
            <span className="text-lg text-white lg:text-2xl">About</span>
          </NavLink>
        </nav>
        <button className="md:hidden text-white focus:outline-none" onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {isMenuOpen && (
        <nav className="md:hidden mt-4 flex flex-col items-center space-y-4 pb-4">
          <NavLink href="/" onClick={toggleMenu}>
            <span className="text-xl">Home</span>
          </NavLink>
          <NavLink href="/about" onClick={toggleMenu}>
            <span className="text-lg">About</span>
          </NavLink>
        </nav>
      )}
    </header>
  )
}

export default Header
