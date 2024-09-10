'use client'

import Link from 'next/link'
import { useState } from 'react'

interface NavLinkProps {
  href: string
  children: React.ReactNode
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      href={href}
      className={`font-bold text-black relative group transition-all duration-300 ease-in-out py-1 ${
        isHovered ? 'scale-125' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      <span className="block h-0.5 w-full bg-white absolute left-0 bottom-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-left" />
    </Link>
  )
}

const Header: React.FC = () => {
  return (
    <header className="flex font-sans justify-between items-start px-4 py-3" role="banner">
      <h1 className="text-4xl font-bold text-black animate-fadeIn">
        Thomas&rsquo;s <br /> Portfolio
      </h1>
      <nav className="flex flex-col items-end space-y-2">
        <NavLink href="/">
          <span className="text-3xl">Home</span>
        </NavLink>
        <NavLink href="/about">
          <span className="text-2xl">About</span>
        </NavLink>
      </nav>
    </header>
  )
}

export default Header
