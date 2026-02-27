import { useState } from 'react'
import { motion, AnimatePresence, type PanInfo } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { projects } from '../../data/content'
import { darkCell, CATEGORY_COLOR, PAD } from './shared'

interface ProjectCarouselProps {
  delay?: number
}

export function ProjectCarousel({ delay = 0.40 }: ProjectCarouselProps) {
  const reduced = useReducedMotion()
  const [active, setActive] = useState(0)

  const prev = () => setActive(i => (i - 1 + projects.length) % projects.length)
  const next = () => setActive(i => (i + 1) % projects.length)

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -50) next()
    else if (info.offset.x > 50) prev()
  }

  const p = projects[active]
  const accent = CATEGORY_COLOR[p.category] ?? 'oklch(0.68 0.18 250)'

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, delay }}
      className={`col-span-12 md:col-span-6 ${PAD} flex flex-col`}
      style={{ ...darkCell, minHeight: 320 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <p
          className="text-[10px] font-semibold uppercase tracking-widest"
          style={{ color: 'oklch(0.42 0 0)' }}
        >
          Projects — {active + 1} / {projects.length}
        </p>
        <div className="flex items-center gap-1.5">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="rounded-full transition-all duration-300 cursor-pointer"
              style={{
                width: i === active ? 18 : 6,
                height: 6,
                background: i === active ? accent : 'oklch(1 0 0 / 0.18)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Slide */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          drag={reduced ? false : 'x'}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={reduced ? undefined : handleDragEnd}
          initial={reduced ? false : { opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduced ? undefined : { opacity: 0, x: -24 }}
          transition={{ duration: 0.22 }}
          className="flex-1 flex flex-col select-none cursor-grab active:cursor-grabbing"
        >
          {/* Category + URL */}
          <div className="flex items-center gap-2 mb-2">
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: accent + '28', color: accent }}
            >
              {p.category}
            </span>
            {p.url && (
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] transition-colors duration-150"
                style={{ color: 'oklch(0.45 0 0)' }}
                onClick={e => e.stopPropagation()}
              >
                ↗ {p.url.replace('https://', '')}
              </a>
            )}
          </div>

          <h3 className="text-base font-bold mb-1" style={{ color: 'oklch(0.95 0 0)' }}>
            {p.title}
          </h3>
          <p className="text-xs mb-3" style={{ color: 'oklch(0.55 0 0)' }}>
            {p.tagline}
          </p>

          {/* Impact */}
          <div className="flex flex-col gap-1.5 mb-4">
            {p.impact.map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-xs mt-0.5 shrink-0" style={{ color: accent }}>✦</span>
                <span className="text-xs leading-relaxed" style={{ color: 'oklch(0.62 0 0)' }}>
                  {item}
                </span>
              </div>
            ))}
          </div>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-1 mt-auto">
            {p.techStack.map(t => (
              <span
                key={t}
                className="text-[10px] px-1.5 py-0.5 rounded"
                style={{ background: 'oklch(1 0 0 / 0.05)', color: 'oklch(0.50 0 0)' }}
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Nav */}
      <div
        className="flex gap-2 mt-4 pt-3"
        style={{ borderTop: '1px solid oklch(1 0 0 / 0.08)' }}
      >
        <button
          onClick={prev}
          className="flex-1 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors"
          style={{ background: 'oklch(1 0 0 / 0.05)', color: 'oklch(0.52 0 0)' }}
        >
          ← Prev
        </button>
        <button
          onClick={next}
          className="flex-1 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors"
          style={{ background: 'oklch(1 0 0 / 0.05)', color: 'oklch(0.52 0 0)' }}
        >
          Next →
        </button>
      </div>
    </motion.div>
  )
}
