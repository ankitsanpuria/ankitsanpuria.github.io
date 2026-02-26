import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { spring } from '../../lib/animation'

interface SectionProps {
  id: string
  title?: string
  subtitle?: string
  children: ReactNode
  className?: string
}

export function Section({ id, title, subtitle, children, className = '' }: SectionProps) {
  const reduced = useReducedMotion()

  return (
    <section
      id={id}
      className={`py-12 md:py-16 px-4 md:px-8 max-w-6xl mx-auto relative z-[1] ${className}`}
    >
      {(title || subtitle) && (
        <motion.header
          className="mb-8 md:mb-10"
          initial={reduced ? undefined : { opacity: 0, y: 16 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ ...spring.smooth, duration: 0.4 }}
        >
          {title && (
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-secondary-900">
              <span className="relative inline-block pb-1 border-b-2 border-primary-500/60">
                {title}
              </span>
            </h2>
          )}
          {subtitle && (
            <p className="mt-2 text-base text-secondary-600">{subtitle}</p>
          )}
        </motion.header>
      )}
      {children}
    </section>
  )
}
