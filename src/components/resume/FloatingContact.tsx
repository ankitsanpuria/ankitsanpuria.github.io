import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { scrollToSection } from '../../hooks/useScrollSpy'

export function FloatingContact() {
  const reduced = useReducedMotion()
  const [visible, setVisible] = useState(false)
  const [expanded, setExpanded] = useState(false)

  // Show after scrolling past the hero (300px)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleContact = () => {
    scrollToSection('resume-contact', 112)
    setExpanded(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={reduced ? false : { opacity: 0, scale: 0.85, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={reduced ? undefined : { opacity: 0, scale: 0.85, y: 12 }}
          transition={{ type: 'spring', damping: 25, stiffness: 400 }}
          className="fixed bottom-6 right-6 z-50 print:hidden"
        >
          <div className="relative flex flex-col items-end gap-2">
            {/* Expanded actions */}
            <AnimatePresence>
              {expanded && (
                <motion.div
                  key="actions"
                  initial={reduced ? false : { opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={reduced ? undefined : { opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-end gap-2"
                >
                  <a
                    href="https://linkedin.com/in/ankitsanpuria"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-raised border border-secondary-200 text-xs font-semibold text-secondary-700 hover:border-primary-300 hover:text-primary-600 shadow-lg transition-all duration-150 whitespace-nowrap"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                    LinkedIn
                  </a>
                  <a
                    href="mailto:ankitsanpuria@hotmail.com"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-raised border border-secondary-200 text-xs font-semibold text-secondary-700 hover:border-primary-300 hover:text-primary-600 shadow-lg transition-all duration-150 whitespace-nowrap"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    Email
                  </a>
                  <button
                    onClick={handleContact}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-600 text-white text-xs font-semibold shadow-lg shadow-primary-500/30 hover:bg-primary-700 transition-colors duration-150 whitespace-nowrap cursor-pointer"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                    </svg>
                    Let's connect
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* FAB toggle button */}
            <motion.button
              onClick={() => setExpanded(!expanded)}
              whileHover={reduced ? undefined : { scale: 1.06 }}
              whileTap={reduced ? undefined : { scale: 0.94 }}
              aria-label={expanded ? 'Close contact menu' : 'Open contact menu'}
              aria-expanded={expanded}
              className="w-12 h-12 rounded-2xl bg-primary-600 text-white shadow-xl shadow-primary-500/30 flex items-center justify-center hover:bg-primary-700 transition-colors duration-150 cursor-pointer"
            >
              <motion.div
                animate={reduced ? undefined : { rotate: expanded ? 45 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {expanded ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                  </svg>
                )}
              </motion.div>
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
