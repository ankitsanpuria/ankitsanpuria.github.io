import { useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, type PanInfo } from 'framer-motion'
import { projects, experience, skills, contactLinks, siteConfig } from '../data/content'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface ExplorePageProps {
  onBack: () => void
}

/* ─── Dark cell base style ──────────────────────────────────────────────────── */
const DARK_BG = 'oklch(0.13 0.018 250)'
const darkCell: React.CSSProperties = {
  background: DARK_BG,
  border: '1px solid oklch(1 0 0 / 0.08)',
  borderRadius: 16,
  overflow: 'hidden',
}

/* ─── Ticker Row ────────────────────────────────────────────────────────────── */
function TickerRow({
  items,
  direction = 1,
  speed = 40,
  reduced,
}: {
  items: string[]
  direction?: 1 | -1
  speed?: number
  reduced: boolean
}) {
  const doubled = [...items, ...items]
  const approxWidth = items.length * 148

  return (
    <div className="overflow-hidden py-1.5">
      <motion.div
        className="flex gap-3"
        style={{ width: 'max-content' }}
        animate={
          reduced
            ? undefined
            : { x: direction === 1 ? [0, -approxWidth] : [-approxWidth, 0] }
        }
        transition={
          reduced
            ? undefined
            : { duration: speed, repeat: Infinity, ease: 'linear' }
        }
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap"
            style={{
              background: 'oklch(1 0 0 / 0.07)',
              color: 'oklch(0.78 0 0)',
              border: '1px solid oklch(1 0 0 / 0.1)',
            }}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

/* ─── Category accent colours ────────────────────────────────────────────────── */
const CATEGORY_COLOR: Record<string, string> = {
  Enterprise: 'oklch(0.68 0.18 250)',
  SaaS: 'oklch(0.70 0.18 160)',
  'E-Commerce': 'oklch(0.72 0.18 50)',
  EdTech: 'oklch(0.70 0.18 310)',
}

/* ─── Project Carousel ──────────────────────────────────────────────────────── */
function ProjectCarousel({ reduced }: { reduced: boolean }) {
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
    <div className="flex flex-col h-full">
      {/* Header row */}
      <div className="flex items-center justify-between mb-4">
        <span
          className="text-[10px] font-semibold uppercase tracking-widest"
          style={{ color: 'oklch(0.45 0 0)' }}
        >
          Projects
        </span>
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
          <div className="flex items-center gap-2 mb-2">
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: accent + '28', color: accent }}
            >
              {p.category}
            </span>
          </div>

          <h3 className="text-base font-bold mb-1" style={{ color: 'oklch(0.95 0 0)' }}>
            {p.title}
          </h3>
          <p className="text-xs mb-3 line-clamp-2" style={{ color: 'oklch(0.58 0 0)' }}>
            {p.tagline}
          </p>

          <div className="flex flex-col gap-1.5 mb-3">
            {p.impact.slice(0, 2).map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-xs mt-0.5 shrink-0" style={{ color: accent }}>✦</span>
                <span className="text-xs leading-relaxed" style={{ color: 'oklch(0.68 0 0)' }}>
                  {item}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-1 mt-auto">
            {p.techStack.slice(0, 5).map(t => (
              <span
                key={t}
                className="text-[10px] px-1.5 py-0.5 rounded"
                style={{ background: 'oklch(1 0 0 / 0.05)', color: 'oklch(0.55 0 0)' }}
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
          style={{ background: 'oklch(1 0 0 / 0.05)', color: 'oklch(0.55 0 0)' }}
        >
          ← Prev
        </button>
        <button
          onClick={next}
          className="flex-1 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors"
          style={{ background: 'oklch(1 0 0 / 0.05)', color: 'oklch(0.55 0 0)' }}
        >
          Next →
        </button>
      </div>
    </div>
  )
}

/* ─── Experience Mini-Timeline ───────────────────────────────────────────────── */
function ExperienceTimeline({ reduced }: { reduced: boolean }) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <div>
      <p
        className="text-[10px] font-semibold uppercase tracking-widest mb-4"
        style={{ color: 'oklch(0.45 0 0)' }}
      >
        Experience
      </p>

      {experience.map((exp, i) => {
        const isExpanded = expandedId === exp.id
        const isLast = i === experience.length - 1

        return (
          <div key={exp.id} className="flex gap-3">
            {/* Spine */}
            <div className="flex flex-col items-center shrink-0">
              <button
                onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                className="w-2.5 h-2.5 rounded-full border-2 transition-all duration-200 cursor-pointer mt-1"
                style={{
                  borderColor: isExpanded
                    ? 'oklch(0.68 0.18 250)'
                    : 'oklch(0.38 0 0)',
                  background: isExpanded ? 'oklch(0.68 0.18 250)' : 'transparent',
                }}
              />
              {!isLast && (
                <div
                  className="w-px flex-1 mt-1 mb-0"
                  style={{ background: 'oklch(1 0 0 / 0.07)', minHeight: 20 }}
                />
              )}
            </div>

            {/* Content */}
            <div className="pb-4 flex-1 min-w-0">
              <button
                onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                className="w-full text-left cursor-pointer"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold leading-snug" style={{ color: 'oklch(0.88 0 0)' }}>
                      {exp.company}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: 'oklch(0.55 0 0)' }}>
                      {exp.role}
                    </p>
                  </div>
                  <span
                    className="text-[10px] shrink-0 mt-0.5"
                    style={{ color: 'oklch(0.42 0 0)' }}
                  >
                    {exp.period.split('–')[0].trim()}
                  </span>
                </div>
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
                    <div className="mt-2.5 flex flex-col gap-1.5">
                      {exp.achievements.slice(0, 3).map((a, j) => (
                        <p
                          key={j}
                          className="text-xs leading-relaxed"
                          style={{ color: 'oklch(0.58 0 0)' }}
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
    </div>
  )
}

/* ─── Stat Cell ─────────────────────────────────────────────────────────────── */
function StatCell({ value, label, accent }: { value: string; label: string; accent: string }) {
  return (
    <div className="flex flex-col h-full gap-2 justify-between">
      <span className="text-2xl sm:text-3xl font-black tracking-tight leading-none" style={{ color: accent }}>
        {value}
      </span>
      <span className="text-[11px] font-medium leading-snug" style={{ color: 'oklch(0.52 0 0)' }}>
        {label}
      </span>
    </div>
  )
}

/* ─── Architecture Highlights mini-grid ──────────────────────────────────────── */
const ARCH_ITEMS = [
  { label: 'Multi-tenant SaaS', icon: '⬡', color: 'oklch(0.68 0.18 250)' },
  { label: 'Microservices', icon: '◈', color: 'oklch(0.70 0.18 160)' },
  { label: 'Performance Eng.', icon: '◎', color: 'oklch(0.70 0.18 50)' },
  { label: 'Cloud & K8s', icon: '⬧', color: 'oklch(0.70 0.18 310)' },
  { label: 'Observability', icon: '◉', color: 'oklch(0.68 0.16 200)' },
  { label: 'Zero-downtime CI/CD', icon: '◇', color: 'oklch(0.70 0.16 280)' },
]

/* ─── ExplorePage ────────────────────────────────────────────────────────────── */
export function ExplorePage({ onBack }: ExplorePageProps) {
  const reduced = useReducedMotion()

  /* Mouse-tracking glow for hero cell */
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)
  const springX = useSpring(mouseX, { stiffness: 70, damping: 22 })
  const springY = useSpring(mouseY, { stiffness: 70, damping: 22 })
  const glowX = useTransform(springX, [0, 1], ['5%', '95%'])
  const glowY = useTransform(springY, [0, 1], ['5%', '95%'])

  const handleHeroMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reduced) return
      const r = e.currentTarget.getBoundingClientRect()
      mouseX.set((e.clientX - r.left) / r.width)
      mouseY.set((e.clientY - r.top) / r.height)
    },
    [reduced, mouseX, mouseY],
  )

  /* Flat skill lists for ticker rows */
  const allSkills = skills.flatMap(g => g.skills)
  const row1 = allSkills.slice(0, 13)
  const row2 = allSkills.slice(13, 26)
  const row3 = allSkills.slice(26)

  const pad = 'p-5'

  return (
    <motion.main
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduced ? undefined : { opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen pb-10"
      style={{ background: 'oklch(0.09 0.015 250)' }}
    >
      {/* ── Back button ──────────────────────────────────────────────────────── */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 pt-5 pb-4">
        <motion.button
          onClick={onBack}
          initial={reduced ? false : { opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.08 }}
          whileHover={reduced ? undefined : { x: -2 }}
          className="inline-flex items-center gap-1.5 text-xs font-medium transition-colors duration-150 cursor-pointer group"
          style={{ color: 'oklch(0.48 0 0)' }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="group-hover:-translate-x-0.5 transition-transform duration-150"
          >
            <path d="M10 12L6 8l4-4" />
          </svg>
          Back to Resume
        </motion.button>
      </div>

      {/* ── Bento Grid ──────────────────────────────────────────────────────── */}
      <div
        className="max-w-[1440px] mx-auto px-4 md:px-8 grid gap-3"
        style={{ gridTemplateColumns: 'repeat(12, 1fr)' }}
      >
        {/* ━━ Row 1 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}

        {/* Hero cell — 8 cols */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className={`col-span-12 md:col-span-8 relative ${pad}`}
          style={{ ...darkCell, minHeight: 300 }}
          onMouseMove={handleHeroMouseMove}
          onMouseLeave={() => { mouseX.set(0.5); mouseY.set(0.5) }}
        >
          {/* Cursor glow */}
          {!reduced && (
            <motion.div
              className="absolute pointer-events-none rounded-full"
              style={{
                left: glowX,
                top: glowY,
                width: 380,
                height: 380,
                translateX: '-50%',
                translateY: '-50%',
                background:
                  'radial-gradient(circle, oklch(0.65 0.2 250 / 0.22) 0%, transparent 68%)',
              }}
            />
          )}

          {/* Subtle dot-grid overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(oklch(1 0 0 / 0.04) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              {/* Status pill */}
              <motion.div
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.28 }}
                className="inline-flex items-center gap-2 mb-6"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: 'oklch(0.72 0.22 160)',
                    boxShadow: '0 0 6px oklch(0.72 0.22 160 / 0.7)',
                    animation: reduced ? 'none' : 'pulse 2s infinite',
                  }}
                />
                <span className="text-xs font-medium" style={{ color: 'oklch(0.68 0.18 160)' }}>
                  Available for opportunities
                </span>
              </motion.div>

              <motion.h1
                initial={reduced ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-5xl font-black tracking-tight leading-[1.08] mb-2"
                style={{ color: 'oklch(0.97 0 0)' }}
              >
                {siteConfig.name}
              </motion.h1>

              <motion.p
                initial={reduced ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28 }}
                className="text-sm font-semibold mb-3"
                style={{ color: 'oklch(0.52 0.1 250)' }}
              >
                {siteConfig.title}
              </motion.p>

              <motion.p
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.38 }}
                className="text-sm leading-relaxed max-w-md"
                style={{ color: 'oklch(0.5 0 0)' }}
              >
                8+ years architecting and scaling high-performance web and mobile platforms.
                Microservices, distributed systems, zero-downtime releases.
              </motion.p>
            </div>

            {/* Contact links */}
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.48 }}
              className="flex gap-2 flex-wrap mt-6"
            >
              {contactLinks.map(link => (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 hover:border-white/20"
                  style={{
                    background: 'oklch(1 0 0 / 0.06)',
                    color: 'oklch(0.7 0 0)',
                    border: '1px solid oklch(1 0 0 / 0.09)',
                  }}
                >
                  {link.name}
                </a>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Current role cell — 4 cols */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.13 }}
          className={`col-span-12 md:col-span-4 ${pad} flex flex-col justify-between`}
          style={darkCell}
        >
          <div>
            <p
              className="text-[10px] font-semibold uppercase tracking-widest mb-3"
              style={{ color: 'oklch(0.42 0 0)' }}
            >
              Currently at
            </p>
            <p className="text-2xl font-black mb-0.5" style={{ color: 'oklch(0.92 0 0)' }}>
              DAXKO
            </p>
            <p className="text-xs mb-5" style={{ color: 'oklch(0.52 0 0)' }}>
              Senior Engineer · Apr 2024 – Present
            </p>

            <div className="flex flex-col gap-2">
              {['Mobile Platforms', 'Multi-tenant SaaS', 'Performance & Reliability', 'Security Hardening'].map(tag => (
                <div key={tag} className="flex items-center gap-2">
                  <div
                    className="w-1 h-1 rounded-full shrink-0"
                    style={{ background: 'oklch(0.65 0.18 250)' }}
                  />
                  <span className="text-xs" style={{ color: 'oklch(0.6 0 0)' }}>
                    {tag}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div
            className="mt-5 pt-4 flex items-center justify-between"
            style={{ borderTop: '1px solid oklch(1 0 0 / 0.07)' }}
          >
            <span className="text-[10px]" style={{ color: 'oklch(0.42 0 0)' }}>
              8+ yrs total exp.
            </span>
            <span
              className="text-[10px] font-bold px-2.5 py-0.5 rounded-full"
              style={{
                background: 'oklch(0.70 0.2 160 / 0.14)',
                color: 'oklch(0.70 0.2 160)',
              }}
            >
              Open to roles
            </span>
          </div>
        </motion.div>

        {/* ━━ Row 2 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}

        {/* Stats — 3 × 2 cols = 6 cols */}
        {[
          { value: '8+', label: 'Years engineering', accent: 'oklch(0.68 0.2 250)', delay: 0.18 },
          { value: '100k+', label: 'Monthly active users', accent: 'oklch(0.70 0.2 160)', delay: 0.22 },
          { value: '99.9%', label: 'Uptime delivered', accent: 'oklch(0.72 0.18 50)', delay: 0.26 },
        ].map(s => (
          <motion.div
            key={s.label}
            initial={reduced ? false : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.38, delay: s.delay }}
            className={`col-span-4 md:col-span-2 ${pad}`}
            style={darkCell}
          >
            <StatCell value={s.value} label={s.label} accent={s.accent} />
          </motion.div>
        ))}

        {/* Architecture highlight chips — 6 cols */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42, delay: 0.3 }}
          className={`col-span-12 md:col-span-6 ${pad}`}
          style={darkCell}
        >
          <p
            className="text-[10px] font-semibold uppercase tracking-widest mb-4"
            style={{ color: 'oklch(0.42 0 0)' }}
          >
            Architecture Strengths
          </p>
          <div className="grid grid-cols-2 gap-2">
            {ARCH_ITEMS.map(item => (
              <div
                key={item.label}
                className="flex items-center gap-2 px-3 py-2 rounded-xl"
                style={{ background: 'oklch(1 0 0 / 0.04)', border: '1px solid oklch(1 0 0 / 0.06)' }}
              >
                <span className="text-base" style={{ color: item.color }}>{item.icon}</span>
                <span className="text-xs font-medium" style={{ color: 'oklch(0.65 0 0)' }}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ━━ Row 3 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}

        {/* Skills ticker — 12 cols full width */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42, delay: 0.35 }}
          className={`col-span-12 ${pad}`}
          style={{ ...darkCell, overflow: 'hidden' }}
        >
          <p
            className="text-[10px] font-semibold uppercase tracking-widest mb-3"
            style={{ color: 'oklch(0.42 0 0)' }}
          >
            Technology Stack
          </p>
          <div className="relative">
            {/* Left/right fade masks */}
            <div
              className="absolute inset-y-0 left-0 w-10 z-10 pointer-events-none"
              style={{ background: `linear-gradient(to right, ${DARK_BG}, transparent)` }}
            />
            <div
              className="absolute inset-y-0 right-0 w-10 z-10 pointer-events-none"
              style={{ background: `linear-gradient(to left, ${DARK_BG}, transparent)` }}
            />
            <TickerRow items={row1} direction={1} speed={32} reduced={reduced} />
            <TickerRow items={row2} direction={-1} speed={40} reduced={reduced} />
            {row3.length > 0 && (
              <TickerRow items={row3} direction={1} speed={28} reduced={reduced} />
            )}
          </div>
        </motion.div>

        {/* ━━ Row 4 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}

        {/* Project carousel — 6 cols */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42, delay: 0.38 }}
          className={`col-span-12 md:col-span-6 ${pad} flex flex-col`}
          style={{ ...darkCell, minHeight: 300 }}
        >
          <ProjectCarousel reduced={reduced} />
        </motion.div>

        {/* Experience timeline — 6 cols */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42, delay: 0.42 }}
          className={`col-span-12 md:col-span-6 ${pad}`}
          style={darkCell}
        >
          <ExperienceTimeline reduced={reduced} />
        </motion.div>

        {/* ━━ Row 5: Contact CTA ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42, delay: 0.46 }}
          className={`col-span-12 ${pad} flex flex-col sm:flex-row items-center justify-between gap-4`}
          style={{
            ...darkCell,
            background:
              'linear-gradient(135deg, oklch(0.22 0.09 250) 0%, oklch(0.17 0.06 280) 55%, oklch(0.20 0.1 220) 100%)',
          }}
        >
          <div>
            <p className="text-lg font-bold mb-1" style={{ color: 'oklch(0.97 0 0)' }}>
              Let's build something exceptional
            </p>
            <p className="text-sm" style={{ color: 'oklch(0.55 0.06 250)' }}>
              Open to senior engineering and technical leadership opportunities.
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <a
              href="mailto:ankitsanpuria@hotmail.com"
              className="px-4 py-2 rounded-lg text-sm font-semibold transition-opacity duration-200 hover:opacity-90"
              style={{ background: 'oklch(0.62 0.2 250)', color: 'oklch(0.97 0 0)' }}
            >
              Email me →
            </a>
            <a
              href="https://linkedin.com/in/ankitsanpuria"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200"
              style={{
                background: 'oklch(1 0 0 / 0.07)',
                color: 'oklch(0.72 0 0)',
                border: '1px solid oklch(1 0 0 / 0.12)',
              }}
            >
              LinkedIn
            </a>
          </div>
        </motion.div>
      </div>
    </motion.main>
  )
}
