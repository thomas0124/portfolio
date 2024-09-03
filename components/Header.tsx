'use client'

import Link from 'next/link'

const Header = () => {
  return (
    <header className="flex font-sans justify-between items-start px-4 py-3">
      <h1 className="text-4xl font-bold text-black animate-fadeIn">
        Thomas&rsquo;s <br /> Portfolio
      </h1>
      <nav className="flex flex-col items-end space-y-3">
        <Link
          href={'/'}
          className="text-3xl font-bold text-black relative group transition-all duration-300 ease-in-out hover:text-5xl py-1"
        >
          Home
          <span className="block h-0.5 w-full bg-white absolute left-0 bottom-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-left" />
        </Link>
        <Link
          href={'/about'}
          className="text-2xl font-bold text-black relative group transition-all duration-300 ease-in-out hover:text-5xl py-1"
        >
          About
          <span className="block h-0.5 w-full bg-white absolute left-0 bottom-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-left" />
        </Link>
      </nav>
    </header>
  )
}

export default Header
