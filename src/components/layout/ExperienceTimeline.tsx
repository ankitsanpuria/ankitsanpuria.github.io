import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useTimelineProgress } from '../../hooks/useTimelineProgress'
import { useActiveMilestone } from '../../hooks/useActiveMilestone'
import { MilestoneCard } from './MilestoneCard'
import { spring } from '../../lib/animation'
import type { Experience } from '../../types'

interface TimelineProps {
  milestones: Experience[]
  onViewArchitecture?: () => void
}

export function Timeline({ milestones, onViewArchitecture }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-80px' })
  const progress = useTimelineProgress(containerRef)
  const activeIndex = useActiveMilestone(containerRef, milestones.length)
  const reduced = useReducedMotion()

  return (
    <div ref={containerRef} className="relative">
      {/* Vertical spine with scroll progress fill */}
      <div className="absolute left-0 top-0 bottom-0 w-px pointer-events-none overflow-hidden">
        <div className="absolute inset-0 w-full bg-secondary-200" aria-hidden />
        <motion.div
          className="absolute inset-x-0 top-0 w-full bg-primary-400 origin-top"
          initial={reduced ? false : { scaleY: 0 }}
          animate={
            reduced ? undefined : isInView ? { scaleY: progress } : { scaleY: 0 }
          }
          transition={{ type: 'spring', damping: 30, stiffness: 200 }}
          style={{ height: '100%' }}
        />
      </div>

      {/* Milestones */}
      <ul className="relative space-y-8">
        {milestones.map((m, i) => (
          <li key={m.id} className="relative">
            {/* Node */}
            <motion.span
              className={`
                absolute left-0 w-3 h-3 rounded-full -translate-x-[5px] top-6
                ring-4 transition-colors duration-200
                ${i === activeIndex ? 'ring-primary-300' : 'ring-surface'}
              `}
              style={{
                backgroundColor:
                  i === activeIndex ? 'var(--primary-500)' : 'var(--primary-400)',
                boxShadow:
                  i === activeIndex
                    ? '0 0 0 4px var(--primary-200), 0 0 12px var(--primary-400)'
                    : undefined,
              }}
              initial={reduced ? false : { scale: 0 }}
              animate={
                reduced ? undefined : isInView ? { scale: 1 } : { scale: 0 }
              }
              transition={{
                ...spring.snappy,
                delay: reduced ? 0 : 0.15 + i * 0.07,
              }}
              aria-hidden
            />

            <MilestoneCard
              milestone={m}
              index={i}
              isActive={i === activeIndex}
              seniorityAccent={m.seniority ?? 'mid'}
              onViewArchitecture={onViewArchitecture}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
