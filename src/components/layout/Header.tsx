import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeSwitcher } from '../ui/ThemeSwitcher'

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#architecture', label: 'Architecture' },
  { href: '#contact', label: 'Contact' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full border-b border-secondary-200/80 bg-surface/80 backdrop-blur-md">
      <nav className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <a
          href="#hero"
          className="text-lg font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent hover:from-primary-700 hover:to-primary-600 transition-all"
        >
          AS
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-secondary-600 hover:text-primary-600 transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          <button
            className="md:hidden p-2 rounded-lg hover:bg-surface-inset"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-secondary-200"
          >
            <ul className="py-4 px-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="block py-2 text-secondary-600 hover:text-secondary-900"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
