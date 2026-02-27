import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { spring } from '../../lib/animation'
import type { Experience } from '../../types'

interface MilestoneCardProps {
  milestone: Experience
  index: number
  isActive: boolean
  seniorityAccent: 'senior' | 'mid' | 'junior'
  onViewArchitecture?: () => void
}

export function MilestoneCard({
  milestone,
  index,
  isActive,
  seniorityAccent,
  onViewArchitecture,
}: MilestoneCardProps) {
  const [expanded, setExpanded] = useState(false)
  const reduced = useReducedMotion()

  const keyAchievements = milestone.achievements.slice(0, 2)
  const additionalAchievements = milestone.achievements.slice(2)
  const hasMore = additionalAchievements.length > 0
  const metrics = milestone.metrics ?? []
  const tags = milestone.architectureTags ?? []

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        if (hasMore) setExpanded((s) => !s)
      }
    },
    [hasMore]
  )

  const accentBorder =
    seniorityAccent === 'senior'
      ? 'border-l-primary-500'
      : seniorityAccent === 'mid'
        ? 'border-l-primary-400'
        : 'border-l-primary-300'

  return (
    <motion.article
      data-milestone-index={index}
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={reduced ? undefined : { opacity: 1, y: 0 }}
      transition={{ ...spring.smooth, delay: reduced ? 0 : 0.05 + index * 0.06 }}
      className="relative pl-8 md:pl-10"
      aria-labelledby={`milestone-${milestone.id}-role`}
    >
      {/* Card */}
      <motion.div
        tabIndex={0}
        role="article"
        className={`
          rounded-xl border border-secondary-200 bg-surface-raised/95
          border-l-4 ${accentBorder}
          p-4 md:p-5
          transition-colors duration-200
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2
          ${isActive ? 'ring-2 ring-primary-400/40 shadow-lg shadow-primary-500/5' : 'hover:border-primary-200'}
        `}
        whileHover={reduced ? undefined : { y: -2, transition: { duration: 0.2 } }}
        onKeyDown={handleKeyDown}
      >
        {/* Header: Role | Company | Date */}
        <header className="flex flex-wrap items-baseline justify-between gap-2">
          <div className="min-w-0">
            <h3
              id={`milestone-${milestone.id}-role`}
              className="text-base font-bold text-primary-800 truncate"
            >
              {milestone.role}
            </h3>
            <p className="text-sm text-secondary-500 mt-0.5">{milestone.company}</p>
          </div>
          <span className="text-xs text-secondary-500 shrink-0 tabular-nums">
            {milestone.period}
          </span>
        </header>

        {/* Metric badges */}
        {metrics.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {metrics.map((m) => (
              <span
                key={m}
                className="text-[11px] px-2 py-0.5 rounded-full bg-primary-100 text-primary-700 font-medium"
              >
                {m}
              </span>
            ))}
          </div>
        )}

        {/* 2 key achievements */}
        <ul className="mt-3 space-y-1.5">
          {keyAchievements.map((a, j) => (
            <li key={j} className="flex items-start gap-2 text-sm text-secondary-600">
              <span className="text-primary-400 mt-0.5 shrink-0" aria-hidden>
                •
              </span>
              <span>{a}</span>
            </li>
          ))}
        </ul>

        {/* Expandable detail */}
        <AnimatePresence initial={false}>
          {expanded && hasMore && (
            <motion.div
              id={`milestone-${milestone.id}-detail`}
              initial={reduced ? false : { height: 0, opacity: 0 }}
              animate={reduced ? undefined : { height: 'auto', opacity: 1 }}
              exit={reduced ? undefined : { height: 0, opacity: 0 }}
              transition={{ ...spring.smooth, duration: 0.3 }}
              className="overflow-hidden"
            >
              <ul className="mt-3 pt-3 border-t border-secondary-100 space-y-1.5">
                {additionalAchievements.map((a, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-secondary-600">
                    <span className="text-primary-400 mt-0.5 shrink-0" aria-hidden>
                      •
                    </span>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
              {tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] px-2 py-0.5 rounded bg-secondary-100 text-secondary-600"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
              {onViewArchitecture && (
                <div className="mt-3">
                  <button
                    type="button"
                    onClick={onViewArchitecture}
                    className="text-xs font-medium text-primary-600 hover:text-primary-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1 rounded"
                  >
                    View architecture →
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expand toggle */}
        {hasMore && (
          <button
            type="button"
            onClick={() => setExpanded((s) => !s)}
            aria-expanded={expanded}
            aria-controls={`milestone-${milestone.id}-detail`}
            className="mt-3 text-xs font-medium text-primary-600 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1 rounded"
          >
            {expanded ? 'Show less' : `More (${additionalAchievements.length})`}
          </button>
        )}
      </motion.div>
    </motion.article>
  )
}
