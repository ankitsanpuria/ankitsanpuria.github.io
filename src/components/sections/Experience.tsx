import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Section } from '../layout/Section'
import { experience } from '../../data/content'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { spring } from '../../lib/animation'

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-50px' })
  const reduced = useReducedMotion()

  return (
    <Section
      id="experience"
      title="Experience"
      subtitle="Professional journey and leadership highlights."
    >
      <div ref={containerRef} className="relative">
        {/* Animated timeline line */}
        <div className="absolute left-0 md:left-4 top-0 bottom-0 w-px pointer-events-none overflow-hidden">
          <motion.div
            className="absolute inset-0 w-full bg-gradient-to-b from-primary-400 via-primary-300 to-transparent origin-top"
            initial={reduced ? false : { scaleY: 0 }}
            animate={reduced ? undefined : { scaleY: isInView ? 1 : 0 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        </div>

        <ul className="space-y-6">
          {experience.map((exp, i) => (
            <motion.li
              key={exp.id}
              className="relative pl-8 md:pl-12"
              initial={reduced ? false : { opacity: 0, x: -20 }}
              animate={
                reduced ? undefined : isInView ? { opacity: 1, x: 0 } : {}
              }
              transition={{
                ...spring.smooth,
                delay: reduced ? 0 : 0.15 + i * 0.08,
              }}
            >
              <motion.span
                className="absolute left-0 md:left-4 w-3 h-3 rounded-full bg-primary-500 ring-4 ring-primary-100 -translate-x-[5px] md:-translate-x-[5px] top-1.5"
                initial={reduced ? false : { scale: 0 }}
                animate={
                  reduced ? undefined : isInView ? { scale: 1 } : { scale: 0 }
                }
                transition={{
                  ...spring.snappy,
                  delay: reduced ? 0 : 0.2 + i * 0.08,
                }}
              />
              <motion.div
                className="rounded-xl border border-secondary-200 bg-surface-raised/90 p-5 transition-all duration-300 hover:border-primary-200 hover:shadow-lg hover:shadow-primary-500/5"
                whileHover={
                  reduced ? undefined : { y: -2, transition: { duration: 0.2 } }
                }
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold text-primary-800">
                    {exp.role}
                  </h3>
                  <span className="text-sm text-secondary-500">{exp.period}</span>
                </div>
                <p className="mt-1 text-secondary-600">{exp.company}</p>
                <p className="mt-3 text-secondary-600">{exp.description}</p>
                <ul className="mt-4 space-y-2">
                  {exp.achievements.map((a, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2 text-sm text-secondary-600"
                    >
                      <span className="text-secondary-500 mt-0.5">•</span>
                      {a}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
