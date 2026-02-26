import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface SectionProps {
  id: string
  title?: string
  subtitle?: string
  children: ReactNode
  className?: string
}

export function Section({ id, title, subtitle, children, className = '' }: SectionProps) {
  return (
    <section
      id={id}
      className={`py-20 md:py-28 px-4 md:px-8 max-w-6xl mx-auto ${className}`}
    >
      {(title || subtitle) && (
        <motion.header
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
        >
          {title && (
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">{subtitle}</p>
          )}
        </motion.header>
      )}
      {children}
    </section>
  )
}
