import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { experience } from '../../data/content'
import { darkCell, PAD } from './shared'

interface ExperienceTimelineProps {
  delay?: number
}

const SENIORITY_COLOR: Record<string, string> = {
  senior: 'oklch(0.68 0.18 250)',
  mid: 'oklch(0.68 0.18 160)',
  junior: 'oklch(0.68 0.18 310)',
}

export function ExperienceTimeline({ delay = 0.43 }: ExperienceTimelineProps) {
  const reduced = useReducedMotion()
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, delay }}
      className={`col-span-12 md:col-span-6 ${PAD}`}
      style={darkCell}
    >
      <p
        className="text-[10px] font-semibold uppercase tracking-widest mb-4"
        style={{ color: 'oklch(0.42 0 0)' }}
      >
        Experience — click to expand
      </p>

      {experience.map((exp, i) => {
        const isExpanded = expandedId === exp.id
        const isLast = i === experience.length - 1
        const dotColor = SENIORITY_COLOR[exp.seniority ?? ''] ?? 'oklch(0.68 0.18 250)'

        return (
          <div key={exp.id} className="flex gap-3">
            {/* Spine */}
            <div className="flex flex-col items-center shrink-0">
              <button
                onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                className="w-2.5 h-2.5 rounded-full border-2 transition-all duration-200 cursor-pointer mt-1 shrink-0"
                style={{
                  borderColor: isExpanded ? dotColor : 'oklch(0.35 0 0)',
                  background: isExpanded ? dotColor : 'transparent',
                  boxShadow: isExpanded ? `0 0 8px ${dotColor}80` : 'none',
                }}
              />
              {!isLast && (
                <div
                  className="w-px flex-1 mt-1"
                  style={{ background: 'oklch(1 0 0 / 0.07)', minHeight: 24 }}
                />
              )}
            </div>

            {/* Content */}
            <div className="pb-4 flex-1 min-w-0">
              <button
                onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                className="w-full text-left cursor-pointer group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p
                      className="text-sm font-semibold leading-snug group-hover:text-white transition-colors duration-150"
                      style={{ color: 'oklch(0.85 0 0)' }}
                    >
                      {exp.company}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: 'oklch(0.52 0 0)' }}>
                      {exp.role}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[10px]" style={{ color: 'oklch(0.40 0 0)' }}>
                      {exp.period}
                    </span>
                  </div>
                </div>

                {/* Metric pills */}
                {!isExpanded && (
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {(exp.metrics ?? []).slice(0, 3).map(m => (
                      <span
                        key={m}
                        className="text-[9px] px-1.5 py-0.5 rounded"
                        style={{
                          background: 'oklch(1 0 0 / 0.04)',
                          color: 'oklch(0.48 0 0)',
                        }}
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                )}
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={reduced ? false : { opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={reduced ? undefined : { opacity: 0, height: 0 }}
                    transition={{ duration: 0.22 }}
                    className="overflow-hidden"
                  >
                    {/* Arch tags */}
                    <div className="flex flex-wrap gap-1 mt-2 mb-2.5">
                      {(exp.architectureTags ?? []).map(t => (
                        <span
                          key={t}
                          className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                          style={{
                            background: dotColor + '1a',
                            color: dotColor,
                            border: `1px solid ${dotColor}30`,
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      {exp.achievements.map((a, j) => (
                        <p
                          key={j}
                          className="text-xs leading-relaxed"
                          style={{ color: 'oklch(0.56 0 0)' }}
                        >
                          · {a}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )
      })}
    </motion.div>
  )
}
