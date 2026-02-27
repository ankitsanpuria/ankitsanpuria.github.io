import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeSwitcher } from '../ui/ThemeSwitcher'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useReducedMotion } from '../../hooks/useReducedMotion'

type Route = 'resume' | 'explore'

// Section nav shown only on the explore/portfolio page
const exploreNavLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#architecture', label: 'Architecture' },
  { href: '#contact', label: 'Contact' },
]

function getSectionId(href: string) {
  return href.replace('#', '') || 'hero'
}

interface HeaderProps {
  route?: Route
  onNavigate?: (target: Route) => void
}

export function Header({ route = 'resume', onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const activeId = useActiveSection()
  const reduced = useReducedMotion()

  const isExplore = route === 'explore'

  return (
    <motion.header
      className="sticky top-0 z-40 w-full border-b border-secondary-200/60 bg-surface/70 backdrop-blur-xl supports-[backdrop-filter]:bg-surface/60 print:hidden"
      initial={reduced ? false : { y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav className="max-w-6xl mx-auto px-4 md:px-8 py-3.5 flex items-center justify-between">
        {/* Logo — always navigates home (resume) */}
        <button
          onClick={() => onNavigate?.('resume')}
          className="text-lg font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent hover:from-primary-700 hover:to-primary-600 transition-all duration-300 cursor-pointer"
          aria-label="Go to resume homepage"
        >
          AS
        </button>

        {/* Centre nav — portfolio section links only when on explore page */}
        {isExplore && (
          <ul className="hidden md:flex items-center gap-8">
            {exploreNavLinks.map((link) => {
              const isActive = getSectionId(link.href) === activeId
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group relative inline-block text-sm font-medium text-secondary-600 hover:text-primary-600 transition-colors duration-200 py-2"
                  >
                    <span className={isActive ? 'text-primary-600' : ''}>{link.label}</span>
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 bg-primary-500 rounded-full transition-all duration-300 ease-out origin-left ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </a>
                </li>
              )
            })}
          </ul>
        )}

        {/* Right controls */}
        <div className="flex items-center gap-2">
          <ThemeSwitcher />

          {/* Explore / Back toggle */}
          <motion.button
            onClick={() => onNavigate?.(isExplore ? 'resume' : 'explore')}
            whileHover={reduced ? undefined : { scale: 1.03 }}
            whileTap={reduced ? undefined : { scale: 0.97 }}
            className={`hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200 cursor-pointer ${
              isExplore
                ? 'bg-surface-raised text-secondary-700 border-secondary-200 hover:border-primary-300 hover:text-primary-600'
                : 'bg-surface-raised text-secondary-700 border-secondary-200 hover:border-primary-300 hover:text-primary-600'
            }`}
          >
            {isExplore ? (
              <>
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="12" height="12" rx="1" />
                  <path d="M5 6h6M5 8h6M5 10h4" />
                </svg>
                Resume
              </>
            ) : (
              <>
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="7" cy="7" r="4" />
                  <path d="M12 12l2 2" />
                  <path d="M5 7h4M7 5v4" />
                </svg>
                Explore
              </>
            )}
          </motion.button>

          {/* Mobile hamburger */}
          <motion.button
            className="md:hidden p-2 rounded-lg hover:bg-surface-inset transition-colors cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle menu"
            whileHover={reduced ? undefined : { scale: 1.05 }}
            whileTap={reduced ? undefined : { scale: 0.95 }}
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
          </motion.button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden border-t border-secondary-200/80 overflow-hidden"
          >
            <ul className="py-4 px-4 flex flex-col gap-2">
              {/* Portfolio links only when exploring */}
              {isExplore && exploreNavLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={reduced ? false : { opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <a
                    href={link.href}
                    className={`block py-2 text-sm text-secondary-600 hover:text-primary-600 transition-colors ${
                      getSectionId(link.href) === activeId ? 'text-primary-600 font-medium' : ''
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}

              {/* Explore / Resume toggle */}
              <motion.li
                initial={reduced ? false : { opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (isExplore ? exploreNavLinks.length : 0) * 0.03 }}
              >
                <button
                  onClick={() => {
                    onNavigate?.(isExplore ? 'resume' : 'explore')
                    setMobileMenuOpen(false)
                  }}
                  className="block py-2 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors cursor-pointer"
                >
                  {isExplore ? '← Resume' : 'Explore Portfolio →'}
                </button>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
