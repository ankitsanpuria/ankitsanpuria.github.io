import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { exploreData } from '../../data/content'
import { darkCell, PAD } from './shared'

interface FocusCellProps {
  delay?: number
}

export function FocusCell({ delay = 0.35 }: FocusCellProps) {
  const reduced = useReducedMotion()
  const { lookingFor, principles } = exploreData

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, delay }}
      className={`col-span-12 md:col-span-6 ${PAD} flex flex-col gap-5`}
      style={darkCell}
    >
      {/* Looking for section */}
      <div>
        <p
          className="text-[10px] font-semibold uppercase tracking-widest mb-3"
          style={{ color: 'oklch(0.42 0 0)' }}
        >
          Open to
        </p>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {lookingFor.roles.map(r => (
            <span
              key={r}
              className="text-[11px] font-medium px-2.5 py-1 rounded-full"
              style={{
                background: 'oklch(0.68 0.2 250 / 0.14)',
                color: 'oklch(0.68 0.2 250)',
                border: '1px solid oklch(0.68 0.2 250 / 0.22)',
              }}
            >
              {r}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {lookingFor.environments.map(e => (
            <span
              key={e}
              className="text-[10px] px-2 py-0.5 rounded-full"
              style={{
                background: 'oklch(1 0 0 / 0.05)',
                color: 'oklch(0.55 0 0)',
                border: '1px solid oklch(1 0 0 / 0.07)',
              }}
            >
              {e}
            </span>
          ))}
        </div>

        <p className="text-xs leading-relaxed mt-3" style={{ color: 'oklch(0.48 0 0)' }}>
          {lookingFor.note}
        </p>
      </div>

      {/* Divider */}
      <div style={{ borderTop: '1px solid oklch(1 0 0 / 0.07)' }} />

      {/* Engineering principles */}
      <div>
        <p
          className="text-[10px] font-semibold uppercase tracking-widest mb-3"
          style={{ color: 'oklch(0.42 0 0)' }}
        >
          Engineering Principles
        </p>

        <div className="flex flex-col gap-2">
          {principles.map((p, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <span
                className="text-sm leading-none mt-0.5 shrink-0 w-4 text-center"
                style={{ color: 'oklch(0.58 0.16 250)' }}
              >
                {p.icon}
              </span>
              <span className="text-xs leading-relaxed" style={{ color: 'oklch(0.58 0 0)' }}>
                {p.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
