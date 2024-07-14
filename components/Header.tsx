'use client'

import Image from 'next/image'
import Link from 'next/link'
import localImage from '@/public/img1.jpg'

const Header = () => {
  return (
    <header className="p-3 flex items-center bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 shadow-lg">
      <Image
        src={localImage}
        alt="Thomas's photo"
        width={70}
        height={35}
        className="rounded-full border-4 border-white shadow-md"
      />
      <h1 className="text-2xl text-white p-5 flex-grow font-bold drop-shadow-lg animate-fadeIn">Thomas’s portfolio</h1>
      <nav className="p-5 ">
        <Link href={'/'} className="text-2xl text-white mx-3 hover:text-gray-400 transition duration-300 ease-in-out ">
          Home
        </Link>
        <Link
          href={'/about'}
          className="text-2xl text-white mx-3 hover:text-gray-400 transition duration-300 ease-in-out "
        >
          About
        </Link>
        <Link
          href={'/contact'}
          className="text-2xl text-white mx-3 hover:text-gray-400 transition duration-300 ease-in-out"
        >
          Contact
        </Link>
      </nav>
    </header>
  )
}

export default Header
