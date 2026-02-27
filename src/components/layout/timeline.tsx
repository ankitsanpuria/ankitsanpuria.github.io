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

  const isInView = useInView(containerRef, {
    once: true,
    margin: '-80px',
  })

  const progress = useTimelineProgress(containerRef)
  const activeIndex = useActiveMilestone(containerRef, milestones.length)
  const reduced = useReducedMotion()

  return (
    <div ref={containerRef} className="relative pl-8">
      {/* Vertical spine */}
      <div
        className="absolute left-3 top-0 bottom-0 w-px bg-secondary-200"
        aria-hidden
      />

      {/* Progress fill */}
      <motion.div
        className="absolute left-3 top-0 w-px bg-primary-400 origin-top"
        style={{ scaleY: reduced ? 1 : progress }}
        initial={reduced ? undefined : { scaleY: 0 }}
        animate={isInView ? { scaleY: progress } : { scaleY: 0 }}
        transition={{ type: 'spring', damping: 30, stiffness: 200 }}
        aria-hidden
      />

      {/* Milestones */}
      <ul className="space-y-6">
        {milestones.map((m, i) => {
          const isActive = i === activeIndex

          return (
            <li key={m.id} className="relative">
              {/* Node */}
              <motion.span
                className={`
                  absolute left-3 top-6 w-3 h-3 rounded-full -translate-x-1/2
                  ring-4 transition-all duration-300
                  ${isActive ? 'ring-primary-300 bg-primary-500' : 'ring-surface bg-primary-400'}
                `}
                initial={reduced ? undefined : { scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{
                  ...spring.snappy,
                  delay: reduced ? 0 : 0.12 + i * 0.06,
                }}
                aria-hidden
              />

              <MilestoneCard
                milestone={m}
                index={i}
                isActive={isActive}
                seniorityAccent={m.seniority ?? 'mid'}
                onViewArchitecture={onViewArchitecture}
              />
            </li>
          )
        })}
      </ul>
    </div>
  )
}