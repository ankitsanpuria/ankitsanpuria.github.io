import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Section } from '../layout/Section'
import { architectureHighlights } from '../../data/content'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { spring } from '../../lib/animation'

export function Architecture() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-30px' })
  const reduced = useReducedMotion()

  return (
    <Section
      id="architecture"
      title="Architecture Highlights"
      subtitle="Design principles and technical approaches."
    >
      <div
        ref={containerRef}
        className="grid gap-5 md:grid-cols-2"
      >
        {architectureHighlights.map((item, i) => (
          <motion.article
            key={item.title}
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={reduced ? undefined : isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              ...spring.smooth,
              delay: reduced ? 0 : i * 0.08,
            }}
            className="group relative rounded-xl border border-secondary-200 bg-surface-raised/90 p-5 pl-6 border-l-4 border-l-primary-500/70 transition-all duration-300 hover:border-primary-300 hover:shadow-lg hover:shadow-primary-500/5"
            whileHover={
              reduced ? undefined : { y: -2, transition: { duration: 0.2 } }
            }
          >
            <h3 className="text-lg font-semibold text-primary-800">
              {item.title}
            </h3>
            <p className="mt-3 text-secondary-600 leading-relaxed">
              {item.description}
            </p>
          </motion.article>
        ))}
      </div>
    </Section>
  )
}
