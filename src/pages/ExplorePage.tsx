import { motion } from 'framer-motion'
import { Hero } from '../components/sections/Hero'
import { About } from '../components/sections/About'
import { Skills } from '../components/sections/Skills'
import { Projects } from '../components/sections/Projects'
import { Experience } from '../components/sections/Experience'
import { Architecture } from '../components/sections/Architecture'
import { Contact } from '../components/sections/Contact'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { spring } from '../lib/animation'

interface ExplorePageProps {
  onBack: () => void
}

export function ExplorePage({ onBack }: ExplorePageProps) {
  const reduced = useReducedMotion()

  return (
    <motion.main
      initial={reduced ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduced ? undefined : { opacity: 0, y: -16 }}
      transition={{ ...spring.smooth, duration: 0.45 }}
    >
      {/* Breadcrumb back link */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 pt-4 pb-0">
        <motion.button
          onClick={onBack}
          initial={reduced ? false : { opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          whileHover={reduced ? undefined : { x: -2 }}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-secondary-500 hover:text-primary-600 transition-colors duration-150 cursor-pointer group"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="group-hover:-translate-x-0.5 transition-transform duration-150"
          >
            <path d="M10 12L6 8l4-4" />
          </svg>
          Back to Resume
        </motion.button>
      </div>

      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Architecture />
      <Contact />
    </motion.main>
  )
}
