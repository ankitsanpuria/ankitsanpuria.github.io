import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { darkCell, PAD } from './shared'

interface ContactCTAProps {
  delay?: number
}

export function ContactCTA({ delay = 0.46 }: ContactCTAProps) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, delay }}
      className={`col-span-12 ${PAD} flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4`}
      style={{
        ...darkCell,
        background:
          'linear-gradient(135deg, oklch(0.22 0.09 250) 0%, oklch(0.17 0.06 280) 55%, oklch(0.20 0.1 220) 100%)',
      }}
    >
      <div>
        <p className="text-lg font-bold mb-1" style={{ color: 'oklch(0.97 0 0)' }}>
          Let's build something exceptional
        </p>
        <p className="text-sm" style={{ color: 'oklch(0.52 0.06 250)' }}>
          Available for senior engineering and technical leadership roles.
          Remote-first or hybrid. Let's talk.
        </p>
      </div>

      <div className="flex gap-2 shrink-0">
        <a
          href="mailto:ankitsanpuria@hotmail.com"
          className="px-4 py-2 rounded-lg text-sm font-semibold transition-opacity duration-200 hover:opacity-90"
          style={{ background: 'oklch(0.62 0.2 250)', color: 'oklch(0.97 0 0)' }}
        >
          Email me →
        </a>
        <a
          href="https://linkedin.com/in/ankitsanpuria"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200"
          style={{
            background: 'oklch(1 0 0 / 0.08)',
            color: 'oklch(0.72 0 0)',
            border: '1px solid oklch(1 0 0 / 0.12)',
          }}
        >
          LinkedIn
        </a>
      </div>
    </motion.div>
  )
}
