'use client'

import type React from 'react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'

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
      // 余白を広めに取り、ゆったりとした印象に
      className={`relative py-3 px-6 rounded-full text-base font-bold tracking-wide transition-all duration-300 ease-out flex items-center justify-center group
        ${isActive ? 'text-accent' : 'text-muted-foreground hover:text-accent'}
      `}
      onClick={onClick}
    >
      {/* アクティブ時に背景をうっすら色付ける */}
      {isActive && <span className="absolute inset-0 bg-accent/10 rounded-full -z-10" />}

      {/* 文字だけが少し跳ねるアニメーション */}
      <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-1 block">
        {children}
      </span>

      {/* ホバー/アクティブ時に下から現れるぽってりした丸いドット */}
      <span
        className={`absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent transition-all duration-300 ease-out
          ${isActive ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-50 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100'}
        `}
      />
    </Link>
  )
}

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  const ThemeToggle = () => {
    if (!mounted) return <div className="p-2 rounded-md w-8 h-8" />
    return (
      <button
        onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
        aria-label="テーマ切り替え"
        className="p-2 rounded-md text-foreground/70 hover:text-foreground hover:bg-muted transition-colors"
      >
        {resolvedTheme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </button>
    )
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 30)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="fixed top-6 z-50 px-4 w-full flex justify-center pointer-events-none">
      <header
        // 全体的に角の取れた柔らかいカプセル型を強調
        className={`
          font-sans transition-[background-color,border-color,box-shadow,padding] duration-200 w-full max-w-4xl rounded-full pointer-events-auto border
          ${
            scrolled
              ? 'bg-background/85 backdrop-blur-md border-accent/20 shadow-lg shadow-accent/5 py-3 px-8'
              : 'bg-transparent border-transparent py-4 px-4'
          }
        `}
        role="banner"
      >
        <div className="flex justify-between items-center relative">
          <h1
            // タイトルもシンプルに。ホバー時に全体が少しだけ持ち上がる
            className={`
              font-extrabold text-foreground transition-[font-size,color] duration-200 ease-out tracking-tight
              ${scrolled ? 'text-xl' : 'text-2xl sm:text-3xl'}
            `}
          >
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className="inline-block transition-transform duration-300 hover:-translate-y-0.5 hover:text-accent"
            >
              {"Thomas's"} <br className={scrolled ? 'hidden' : 'hidden sm:inline'} /> Portfolio
            </Link>
          </h1>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:gap-1">
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
            <ThemeToggle />
          </nav>

          {/* Mobile Menu Button */}
          <button
            className={`
              md:hidden text-foreground p-4 rounded-full focus:outline-none
              transition-all duration-300 ease-in-out bg-background/50 backdrop-blur-md border border-accent/10
              ${
                isMenuOpen
                  ? 'bg-accent/10 text-accent shadow-inner'
                  : 'hover:bg-accent/10 hover:text-accent hover:-translate-y-0.5'
              }
            `}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-5">
              <span
                className={`
                  absolute block w-6 h-0.5 bg-current rounded-full transform transition-all duration-300 ease-in-out
                  ${isMenuOpen ? 'rotate-45 top-2.5' : 'top-0'}
                `}
              />
              <span
                className={`
                  absolute block w-6 h-0.5 bg-current rounded-full top-2.5 transform transition-all duration-300 ease-in-out
                  ${isMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'}
                `}
              />
              <span
                className={`
                  absolute block w-6 h-0.5 bg-current rounded-full transform transition-all duration-300 ease-in-out
                  ${isMenuOpen ? '-rotate-45 top-2.5' : 'top-5'}
                `}
              />
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`
            md:hidden overflow-hidden transition-[max-height,opacity,transform] duration-300 ease-in-out origin-top
            ${isMenuOpen ? 'max-h-[400px] opacity-100 scale-100 mt-4' : 'max-h-0 opacity-0 scale-95 mt-0'}
          `}
        >
          {/* モバイルメニューも絵文字を無くし、シンプルに余白で可愛さを出す */}
          <div className="bg-background/90 backdrop-blur-xl rounded-3xl p-4 shadow-lg shadow-accent/5 border border-accent/20 flex flex-col gap-1">
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
            <div className="flex justify-center pt-1">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Header
