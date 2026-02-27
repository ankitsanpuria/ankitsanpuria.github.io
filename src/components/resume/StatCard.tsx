import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface StatCardProps {
  value: number
  suffix?: string
  prefix?: string
  label: string
  description?: string
  index?: number
}

function useCounter(target: number, duration = 1.4, active: boolean) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    const start = performance.now()
    const raf = requestAnimationFrame(function tick(now) {
      const elapsed = (now - start) / 1000
      const progress = Math.min(elapsed / duration, 1)
      // ease-out-expo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      setCount(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
    })
    return () => cancelAnimationFrame(raf)
  }, [target, duration, active])
  return count
}

export function StatCard({ value, suffix = '', prefix = '', label, description, index = 0 }: StatCardProps) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const count = useCounter(value, 1.4, reduced ? true : inView)

  return (
    <motion.div
      ref={ref}
      initial={reduced ? false : { opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
      whileHover={reduced ? undefined : { y: -4, transition: { duration: 0.2 } }}
      className="group relative overflow-hidden rounded-2xl border border-secondary-200 bg-surface-raised p-5 shadow-sm hover:border-primary-300 hover:shadow-lg hover:shadow-primary-500/10 transition-all duration-300 print:shadow-none print:hover:shadow-none print:break-inside-avoid"
    >
      {/* Gradient accent top bar */}
      <span className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-primary-500 to-tertiary-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

      {/* Subtle glow bg on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-tertiary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 print:hidden" />

      <div className="relative">
        <div className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent tabular-nums">
          {prefix}{count}{suffix}
        </div>
        <div className="mt-1 text-sm font-semibold text-secondary-800">{label}</div>
        {description && (
          <div className="mt-0.5 text-xs text-secondary-500 leading-relaxed">{description}</div>
        )}
      </div>
    </motion.div>
  )
}
