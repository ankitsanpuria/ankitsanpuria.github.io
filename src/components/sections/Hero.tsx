import { motion } from 'framer-motion'
import { Button } from '../ui/Button'
import { siteConfig } from '../../data/content'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { AnimatedGradientBlob } from '../ui/AnimatedGradientBlob'
import { spring, ease } from '../../lib/animation'

const container = {
  hidden: { opacity: 0 },
  visible: (reduced: boolean) =>
    reduced
      ? { opacity: 1 }
      : {
          opacity: 1,
          transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1,
          },
        },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: (reduced: boolean) =>
    reduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 },
}

export function Hero() {
  const reduced = useReducedMotion()
  const firstName = siteConfig.name.split(' ')[0]
  const restName = siteConfig.name.split(' ').slice(1).join(' ')

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center px-4 md:px-8 py-20 md:py-24 max-w-6xl mx-auto overflow-hidden"
    >
      {/* Animated gradient blobs */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <AnimatedGradientBlob
          className="top-1/4 -right-32 bg-primary-400/25"
          size="w-[28rem] h-[28rem]"
        />
        <AnimatedGradientBlob
          className="bottom-1/4 -left-32 bg-tertiary-400/20"
          size="w-80 h-80"
        />
        <AnimatedGradientBlob
          className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-300/10"
          size="w-[32rem] h-[32rem]"
        />
      </div>

      <motion.div
        className="relative z-10"
        animate={
          reduced
            ? undefined
            : {
                y: [0, -4, 0],
                transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
              }
        }
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          custom={reduced}
          className="space-y-5"
        >
        <motion.p
          variants={item}
          custom={reduced}
          transition={spring.smooth}
          className="text-sm font-medium text-primary-600 uppercase tracking-widest"
        >
          Senior Full Stack Engineer
        </motion.p>

        <motion.h1
          variants={item}
          custom={reduced}
          transition={spring.smooth}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
        >
          <span className="text-secondary-900">{firstName}</span>
          <br />
          <span className="bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
            {restName}
          </span>
        </motion.h1>

        <motion.p
          variants={item}
          custom={reduced}
          transition={spring.smooth}
          className="text-lg md:text-xl text-secondary-600 max-w-2xl leading-relaxed"
        >
          {siteConfig.tagline}
        </motion.p>

        <motion.div
          variants={item}
          custom={reduced}
          transition={spring.smooth}
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
      </motion.div>

      {/* Scroll cue with subtle floating */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5, ease }}
      >
        <a
          href="#about"
          className="flex flex-col items-center gap-1.5 text-secondary-500 hover:text-primary-600 transition-colors duration-300 group"
          aria-label="Scroll to about"
        >
          <span className="text-xs uppercase tracking-wider">Scroll</span>
          <motion.span
            animate={reduced ? undefined : { y: [0, 6, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
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
