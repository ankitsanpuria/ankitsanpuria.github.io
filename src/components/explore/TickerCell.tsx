import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { skills } from '../../data/content'
import { darkCell, DARK_BG, PAD } from './shared'

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
          reduced ? undefined : { x: direction === 1 ? [0, -approxWidth] : [-approxWidth, 0] }
        }
        transition={
          reduced ? undefined : { duration: speed, repeat: Infinity, ease: 'linear' }
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

interface TickerCellProps {
  delay?: number
}

export function TickerCell({ delay = 0.38 }: TickerCellProps) {
  const reduced = useReducedMotion()
  const allSkills = skills.flatMap(g => g.skills)
  const row1 = allSkills.slice(0, 13)
  const row2 = allSkills.slice(13, 26)
  const row3 = allSkills.slice(26)

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, delay }}
      className={`col-span-12 ${PAD}`}
      style={{ ...darkCell, overflow: 'hidden' }}
    >
      <p
        className="text-[10px] font-semibold uppercase tracking-widest mb-3"
        style={{ color: 'oklch(0.42 0 0)' }}
      >
        Technology Stack
      </p>

      <div className="relative">
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
        {row3.length > 0 && <TickerRow items={row3} direction={1} speed={28} reduced={reduced} />}
      </div>
    </motion.div>
  )
}
