import type { ReactElement } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const archIcons: Record<string, ReactElement> = {
  'Multi-tenant SaaS Architecture': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
      <path d="M7 8h10M7 12h6" />
    </svg>
  ),
  'Microservices & Event-driven Design': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="6" r="2" />
      <circle cx="18" cy="6" r="2" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="18" r="2" />
      <circle cx="12" cy="12" r="2" />
      <path d="M8 6h4M14 6h2M8 12h2M14 12h2M6 8v4M18 8v4M6 14v2M18 14v2" />
    </svg>
  ),
  'Performance Optimization': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  'Cloud & Infrastructure': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.5 19H9a7 7 0 117-7c0 .34-.02.67-.06 1H17.5a3.5 3.5 0 010 7z" />
    </svg>
  ),
  'Observability & Reliability': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
}

interface ArchCardProps {
  title: string
  description: string
  index?: number
}

export function ArchCard({ title, description, index = 0 }: ArchCardProps) {
  const reduced = useReducedMotion()
  const icon = archIcons[title]

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: index * 0.07 }}
      whileHover={reduced ? undefined : { y: -3, transition: { duration: 0.2 } }}
      className="group relative overflow-hidden rounded-xl border border-secondary-200 bg-surface-raised p-5 shadow-sm hover:border-primary-300 hover:shadow-lg hover:shadow-primary-500/10 transition-all duration-300 print:break-inside-avoid"
    >
      <span className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-primary-500 to-tertiary-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

      <div className="flex items-start gap-3">
        {icon && (
          <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary-50 border border-primary-100 flex items-center justify-center text-primary-600">
            {icon}
          </div>
        )}
        <div className="min-w-0">
          <h3 className="text-sm font-bold text-secondary-900 leading-tight">{title}</h3>
          <p className="mt-1.5 text-xs text-secondary-600 leading-relaxed">{description}</p>
        </div>
      </div>
    </motion.div>
  )
}
