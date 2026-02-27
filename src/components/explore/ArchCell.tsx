import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { exploreData } from '../../data/content'
import { darkCell, PAD } from './shared'

interface ArchCellProps {
  delay?: number
}

export function ArchCell({ delay = 0.32 }: ArchCellProps) {
  const reduced = useReducedMotion()

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
        Architecture Strengths
      </p>

      <div className="grid grid-cols-2 gap-2">
        {exploreData.archChips.map(chip => (
          <div
            key={chip.label}
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-colors duration-200"
            style={{
              background: 'oklch(1 0 0 / 0.04)',
              border: '1px solid oklch(1 0 0 / 0.06)',
            }}
          >
            <span className="text-base leading-none shrink-0" style={{ color: chip.color }}>
              {chip.icon}
            </span>
            <span className="text-xs font-medium leading-snug" style={{ color: 'oklch(0.65 0 0)' }}>
              {chip.label}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
