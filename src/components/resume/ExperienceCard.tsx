import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import type { Experience } from '../../types'

const seniorityStyles = {
  senior: {
    line: 'bg-gradient-to-b from-primary-500 to-primary-400',
    dot: 'bg-primary-500 ring-primary-200',
    badge: 'bg-primary-100 text-primary-700 border-primary-200',
  },
  mid: {
    line: 'bg-gradient-to-b from-tertiary-500 to-tertiary-400',
    dot: 'bg-tertiary-500 ring-tertiary-200',
    badge: 'bg-tertiary-100 text-tertiary-700 border-tertiary-200',
  },
  junior: {
    line: 'bg-gradient-to-b from-secondary-400 to-secondary-300',
    dot: 'bg-secondary-400 ring-secondary-200',
    badge: 'bg-secondary-100 text-secondary-700 border-secondary-200',
  },
}

interface ExperienceCardProps {
  exp: Experience
  index: number
  isLast?: boolean
}

export function ExperienceCard({ exp, index, isLast = false }: ExperienceCardProps) {
  const [expanded, setExpanded] = useState(index === 0)
  const reduced = useReducedMotion()
  const seniority = exp.seniority ?? 'mid'
  const styles = seniorityStyles[seniority]

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
      className="relative flex gap-4 print:break-inside-avoid"
    >
      {/* Timeline spine */}
      <div className="flex flex-col items-center flex-shrink-0 mt-1">
        <div className={`w-3 h-3 rounded-full ring-4 flex-shrink-0 ${styles.dot}`} />
        {!isLast && <div className={`w-0.5 flex-1 mt-1 min-h-8 ${styles.line}`} />}
      </div>

      {/* Content card */}
      <div className="flex-1 pb-6 min-w-0">
        <div
          className="group relative overflow-hidden rounded-xl border border-secondary-200 bg-surface-raised p-5 shadow-sm hover:border-primary-300 hover:shadow-md transition-all duration-300 cursor-pointer print:cursor-auto"
          onClick={() => setExpanded(!expanded)}
          role="button"
          tabIndex={0}
          aria-expanded={expanded}
          onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setExpanded(!expanded)}
        >
          {/* Accent line */}
          <span className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-primary-500 to-tertiary-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

          {/* Header row */}
          <div className="flex items-start justify-between gap-2 flex-wrap">
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base font-bold text-secondary-900">{exp.company}</h3>
                <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full border ${styles.badge}`}>
                  {seniority === 'senior' ? 'Senior' : seniority === 'mid' ? 'Mid-level' : 'Junior'}
                </span>
              </div>
              <div className="text-sm font-medium text-primary-600 mt-0.5">{exp.role}</div>
              <div className="text-xs text-secondary-500 mt-0.5">{exp.period}</div>
            </div>

            {/* Expand toggle */}
            <motion.div
              animate={reduced ? undefined : { rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-secondary-400 flex-shrink-0 mt-1 print:hidden"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          </div>

          {/* Description always visible */}
          <p className="mt-2 text-xs text-secondary-600 leading-relaxed line-clamp-2">{exp.description}</p>

          {/* Metric chips */}
          {exp.metrics && exp.metrics.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {exp.metrics.map(m => (
                <span
                  key={m}
                  className="inline-block px-2.5 py-0.5 text-xs font-semibold bg-primary-50 text-primary-700 border border-primary-200 rounded-full"
                >
                  {m}
                </span>
              ))}
            </div>
          )}

          {/* Expandable achievements */}
          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                key="achievements"
                initial={reduced ? false : { opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={reduced ? undefined : { opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <ul className="mt-3 space-y-1.5 border-t border-secondary-100 pt-3">
                  {exp.achievements.map((a, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-secondary-700 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-400 flex-shrink-0 mt-1.5" />
                      {a}
                    </li>
                  ))}
                </ul>

                {/* Architecture tags */}
                {exp.architectureTags && exp.architectureTags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5 border-t border-secondary-100 pt-3">
                    {exp.architectureTags.map(tag => (
                      <span
                        key={tag}
                        className="inline-block px-2 py-0.5 text-xs font-mono font-medium bg-surface-inset text-secondary-600 border border-secondary-200 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}
