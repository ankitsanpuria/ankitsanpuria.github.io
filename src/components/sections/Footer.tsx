import { motion } from 'framer-motion'
import { siteConfig } from '../../data/content'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { scrollToSection } from '../../hooks/useScrollSpy'

type Route = 'resume' | 'explore'

interface FooterProps {
  route?: Route
  onExplore?: () => void
}

export function Footer({ route = 'resume', onExplore }: FooterProps) {
  const year = new Date().getFullYear()
  const reduced = useReducedMotion()

  const handleBackToTop = () => {
    if (route === 'resume') {
      scrollToSection('resume-hero', 112)
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <motion.footer
      className="border-t border-secondary-200 py-6 px-4 md:px-8 print:hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-sm text-secondary-500">
          © {year} {siteConfig.name}
        </p>

        <div className="flex items-center gap-4">
          {/* Explore portfolio link — only shown on resume page */}
          {route === 'resume' && onExplore && (
            <motion.button
              onClick={onExplore}
              whileHover={reduced ? undefined : { x: 1 }}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-secondary-500 hover:text-primary-600 transition-colors duration-150 cursor-pointer group"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:translate-x-0.5 transition-transform duration-150"
              >
                <circle cx="7" cy="7" r="4" />
                <path d="M12 12l2 2" />
                <path d="M5 7h4M7 5v4" />
              </svg>
              Explore interactive portfolio
            </motion.button>
          )}

          <motion.button
            onClick={handleBackToTop}
            className="text-sm font-medium text-secondary-500 hover:text-secondary-800 transition-colors cursor-pointer"
            whileHover={reduced ? undefined : { y: -1 }}
            whileTap={reduced ? undefined : { scale: 0.98 }}
          >
            ↑ Top
          </motion.button>
        </div>
      </div>
    </motion.footer>
  )
}
