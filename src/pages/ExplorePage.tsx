import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { exploreData } from '../data/content'
import { HeroCell } from '../components/explore/HeroCell'
import { RoleCell } from '../components/explore/RoleCell'
import { ArchCell } from '../components/explore/ArchCell'
import { FocusCell } from '../components/explore/FocusCell'
import { TickerCell } from '../components/explore/TickerCell'
import { ProjectCarousel } from '../components/explore/ProjectCarousel'
import { ExperienceTimeline } from '../components/explore/ExperienceTimeline'
import { ContactCTA } from '../components/explore/ContactCTA'
import { darkCell, PAGE_BG, PAD } from '../components/explore/shared'

interface ExplorePageProps {
  onBack: () => void
}

function StatCell({ value, label, accent }: { value: string; label: string; accent: string }) {
  return (
    <div className="flex flex-col h-full gap-2 justify-between">
      <span
        className="text-2xl sm:text-3xl font-black tracking-tight leading-none"
        style={{ color: accent }}
      >
        {value}
      </span>
      <span className="text-[11px] font-medium leading-snug" style={{ color: 'oklch(0.50 0 0)' }}>
        {label}
      </span>
    </div>
  )
}

export function ExplorePage({ onBack }: ExplorePageProps) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduced ? undefined : { opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{ background: PAGE_BG, minHeight: '100vh' }}
    >
      {/* ── Minimal top bar ──────────────────────────────────────────────── */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <div
          className="flex items-center justify-between py-4"
          style={{ borderBottom: '1px solid oklch(1 0 0 / 0.06)' }}
        >
          <span
            className="text-lg font-black"
            style={{
              background: 'linear-gradient(to right, oklch(0.68 0.2 250), oklch(0.72 0.18 200))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            AS
          </span>

          <motion.button
            onClick={onBack}
            initial={reduced ? false : { opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={reduced ? undefined : { x: -2 }}
            className="inline-flex items-center gap-1.5 text-xs font-medium transition-colors duration-150 cursor-pointer group"
            style={{ color: 'oklch(0.45 0 0)' }}
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
      </div>

      {/* ── Bento Grid ──────────────────────────────────────────────────── */}
      <div
        className="max-w-[1440px] mx-auto px-4 md:px-8 py-4 grid gap-3"
        style={{ gridTemplateColumns: 'repeat(12, 1fr)' }}
      >
        {/* ── Row 1: Hero + Role ─────────────────────────────────────────── */}
        <HeroCell delay={0.08} />
        <RoleCell delay={0.13} />

        {/* ── Row 2: 4 Stats ─────────────────────────────────────────────── */}
        {exploreData.stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={reduced ? false : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.38, delay: 0.18 + i * 0.04 }}
            className={`col-span-6 md:col-span-3 ${PAD}`}
            style={darkCell}
          >
            <StatCell value={s.value} label={s.label} accent={s.accent} />
          </motion.div>
        ))}

        {/* ── Row 3: Architecture + Focus/Looking-for ────────────────────── */}
        <ArchCell delay={0.32} />
        <FocusCell delay={0.35} />

        {/* ── Row 4: Skills Ticker (full width) ──────────────────────────── */}
        <TickerCell delay={0.38} />

        {/* ── Row 5: Projects + Experience ──────────────────────────────── */}
        <ProjectCarousel delay={0.40} />
        <ExperienceTimeline delay={0.43} />

        {/* ── Row 6: Contact CTA ─────────────────────────────────────────── */}
        <ContactCTA delay={0.46} />
      </div>
    </motion.div>
  )
}
