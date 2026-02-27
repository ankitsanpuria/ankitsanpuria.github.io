import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollSpy, scrollToSection } from '../../hooks/useScrollSpy'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export const RESUME_SECTIONS = [
  { id: 'resume-hero', label: 'Overview' },
  { id: 'resume-stats', label: 'Impact' },
  { id: 'resume-skills', label: 'Skills' },
  { id: 'resume-experience', label: 'Experience' },
  { id: 'resume-projects', label: 'Projects' },
  { id: 'resume-architecture', label: 'Architecture' },
  { id: 'resume-leadership', label: 'Leadership' },
  { id: 'resume-contact', label: 'Contact' },
] as const

const SECTION_IDS = RESUME_SECTIONS.map((s) => s.id)

export function ResumeNav() {
  const reduced = useReducedMotion()
  const activeId = useScrollSpy(SECTION_IDS, '-10% 0px -80% 0px')
  const [mobileOpen, setMobileOpen] = useState(false)

  const active = RESUME_SECTIONS.find((s) => s.id === activeId) ?? RESUME_SECTIONS[0]

  const handleClick = (id: string) => {
    scrollToSection(id, 112) // header (~56px) + this nav (~56px)
    setMobileOpen(false)
  }

  return (
    <nav
      aria-label="Resume sections"
      className="sticky top-14 z-30 w-full border-b border-secondary-200/60 bg-surface/80 backdrop-blur-xl supports-[backdrop-filter]:bg-surface/70 print:hidden"
    >
      {/* ── Desktop: horizontal pill row ── */}
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <ul className="hidden md:flex items-center gap-1 h-11 overflow-x-auto scrollbar-none">
          {RESUME_SECTIONS.map((section) => {
            const isActive = section.id === activeId
            return (
              <li key={section.id}>
                <button
                  onClick={() => handleClick(section.id)}
                  aria-current={isActive ? 'location' : undefined}
                  className={`relative px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-primary-500 ${
                    isActive
                      ? 'text-primary-600'
                      : 'text-secondary-500 hover:text-secondary-800'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="resume-nav-pill"
                      className="absolute inset-0 rounded-md bg-primary-50 border border-primary-200"
                      transition={reduced ? { duration: 0 } : { type: 'spring', damping: 30, stiffness: 400 }}
                    />
                  )}
                  <span className="relative">{section.label}</span>
                </button>
              </li>
            )
          })}
        </ul>

        {/* ── Mobile: current section + dropdown ── */}
        <div className="md:hidden flex items-center justify-between h-11">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label="Toggle section navigation"
            className="flex items-center gap-2 text-xs font-semibold text-secondary-800 cursor-pointer"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
            {active.label}
            <motion.svg
              animate={reduced ? undefined : { rotate: mobileOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              width="12"
              height="12"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 6l4 4 4-4" />
            </motion.svg>
          </button>
          {/* Progress dots */}
          <div className="flex items-center gap-1">
            {RESUME_SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => handleClick(s.id)}
                aria-label={`Jump to ${s.label}`}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                  s.id === activeId ? 'bg-primary-500 w-3' : 'bg-secondary-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Mobile dropdown ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-nav"
            initial={reduced ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={reduced ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden border-t border-secondary-200/60 bg-surface/95 backdrop-blur-xl overflow-hidden"
          >
            <ul className="max-w-5xl mx-auto px-4 py-2 grid grid-cols-2 gap-1">
              {RESUME_SECTIONS.map((section, i) => {
                const isActive = section.id === activeId
                return (
                  <motion.li
                    key={section.id}
                    initial={reduced ? false : { opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.025 }}
                  >
                    <button
                      onClick={() => handleClick(section.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-primary-50 text-primary-600 border border-primary-200'
                          : 'text-secondary-600 hover:bg-surface-inset'
                      }`}
                    >
                      {section.label}
                    </button>
                  </motion.li>
                )
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
