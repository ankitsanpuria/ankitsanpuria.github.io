import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { darkCell, PAD } from './shared'

interface RoleCellProps {
  delay?: number
}

export function RoleCell({ delay = 0.13 }: RoleCellProps) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`col-span-12 md:col-span-4 ${PAD} flex flex-col justify-between`}
      style={darkCell}
    >
      <div>
        <p
          className="text-[10px] font-semibold uppercase tracking-widest mb-3"
          style={{ color: 'oklch(0.42 0 0)' }}
        >
          Most recently at
        </p>

        <p className="text-2xl font-black mb-0.5" style={{ color: 'oklch(0.92 0 0)' }}>
          DAXKO
        </p>
        <p className="text-xs mb-5" style={{ color: 'oklch(0.52 0 0)' }}>
          Senior Engineer · Apr 2024 – Jan 2026
        </p>

        <div className="flex flex-col gap-2.5">
          {[
            { label: 'White-label Mobile Platform', sub: 'React Native + Expo, 100+ orgs' },
            { label: 'Performance Engineering', sub: '40%+ DB read latency reduction' },
            { label: 'Security Hardening', sub: 'SQL injection, npm CVEs, logging' },
            { label: 'Multi-tenant Architecture', sub: 'Per-client theming & onboarding' },
          ].map(item => (
            <div key={item.label}>
              <div className="flex items-start gap-2">
                <div
                  className="w-1 h-1 rounded-full shrink-0 mt-1.5"
                  style={{ background: 'oklch(0.65 0.18 250)' }}
                />
                <div>
                  <p className="text-xs font-medium leading-snug" style={{ color: 'oklch(0.72 0 0)' }}>
                    {item.label}
                  </p>
                  <p className="text-[10px]" style={{ color: 'oklch(0.45 0 0)' }}>
                    {item.sub}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="mt-5 pt-4 flex items-center justify-between"
        style={{ borderTop: '1px solid oklch(1 0 0 / 0.07)' }}
      >
        <span className="text-[10px]" style={{ color: 'oklch(0.42 0 0)' }}>
          3 companies · 8+ years
        </span>
        <span
          className="text-[10px] font-bold px-2.5 py-0.5 rounded-full"
          style={{
            background: 'oklch(0.72 0.22 50 / 0.14)',
            color: 'oklch(0.72 0.2 50)',
          }}
        >
          Open to work
        </span>
      </div>
    </motion.div>
  )
}
