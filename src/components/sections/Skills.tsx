import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Section } from '../layout/Section'
import { skills } from '../../data/content'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { spring } from '../../lib/animation'

export function Skills() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-30px' })
  const reduced = useReducedMotion()

  return (
    <Section id="skills" title="Skills" subtitle="Technologies and tools I work with.">
      <div
        ref={containerRef}
        className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
      >
        {skills.map((group, i) => (
          <motion.div
            key={group.name}
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={reduced ? undefined : isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              ...spring.smooth,
              delay: reduced ? 0 : i * 0.06,
            }}
            className="group relative rounded-xl border-l-4 border-primary-500/70 border border-secondary-200 bg-surface-raised/90 p-5 transition-all duration-300 hover:border-primary-400 hover:shadow-lg hover:shadow-primary-500/10 hover:shadow-xl"
          >
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-3 text-primary-600">
                {group.name}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {group.skills.map((skill, j) => (
                  <motion.li
                    key={skill}
                    initial={reduced ? false : { opacity: 0, scale: 0.9 }}
                    animate={
                      reduced ? undefined : isInView ? { opacity: 1, scale: 1 } : {}
                    }
                    transition={{
                      delay: reduced ? 0 : i * 0.06 + 0.05 + j * 0.02,
                      ...spring.snappy,
                    }}
                    whileHover={
                      reduced
                        ? undefined
                        : {
                            scale: 1.05,
                            transition: { duration: 0.2 },
                          }
                    }
                    className="inline-block"
                  >
                    <span className="inline-block px-3 py-1.5 text-sm rounded-lg bg-surface-inset text-secondary-700 transition-all duration-200 hover:bg-primary-100 hover:text-primary-800 hover:border-primary-200/50 hover:shadow-md hover:shadow-primary-400/20 border border-transparent">
                      {skill}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
