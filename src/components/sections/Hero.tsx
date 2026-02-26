import { motion } from 'framer-motion'
import { Button } from '../ui/Button'
import { siteConfig } from '../../data/content'

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center px-4 md:px-8 py-20 md:py-24 max-w-6xl mx-auto overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-32 w-80 h-80 bg-tertiary-400/15 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-5"
      >
        <motion.p
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="text-sm font-medium text-primary-600 uppercase tracking-widest"
        >
          Senior Full Stack Engineer
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
        >
          <span className="text-secondary-900">{siteConfig.name.split(' ')[0]}</span>
          <br />
          <span className="bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
            {siteConfig.name.split(' ').slice(1).join(' ')}
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="text-lg md:text-xl text-secondary-600 max-w-2xl leading-relaxed"
        >
          {siteConfig.tagline}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-wrap gap-3 pt-2"
        >
          <Button as="a" href="#projects" variant="primary" size="lg">
            View Projects
          </Button>
          <Button as="a" href="#contact" variant="outline" size="lg">
            Get in Touch
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
      >
        <a
          href="#about"
          className="flex flex-col items-center gap-1.5 text-secondary-500 hover:text-primary-600 transition-colors group"
          aria-label="Scroll to about"
        >
          <span className="text-xs uppercase tracking-wider">Scroll</span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.span>
        </a>
      </motion.div>
    </section>
  )
}
