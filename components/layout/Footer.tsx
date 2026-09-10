'use client'

import Link from 'next/link'
import { PenLine } from 'lucide-react'
import { FaGithub, FaXTwitter } from 'react-icons/fa6'

const LINKS = [
  { href: 'https://github.com/thomas0124', label: 'GitHub', Icon: FaGithub },
  { href: 'https://twitter.com/Tomas_engineer', label: 'X (Twitter)', Icon: FaXTwitter },
  { href: 'https://note.com/tomas_0124', label: 'note', Icon: PenLine },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="container mx-auto px-4 py-10 text-center text-muted-foreground text-sm">
      <div className="flex items-center justify-center gap-5 mb-4">
        {LINKS.map(({ href, label, Icon }) => (
          <Link
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="text-muted-foreground hover:text-accent transition-colors duration-300 hover:-translate-y-1 inline-block"
          >
            <Icon className="w-5 h-5" />
          </Link>
        ))}
      </div>
      <p className="font-medium">&copy; {currentYear} Shimizu Toma. All rights reserved.</p>
    </footer>
  )
}
