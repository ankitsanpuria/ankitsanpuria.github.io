import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface CardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  as?: 'div' | 'article' | 'button'
}

export function Card({ children, className = '', onClick, as = 'div' }: CardProps) {
  const reduced = useReducedMotion()
  const Comp = motion[as] as typeof motion.div

  return (
    <Comp
      className={`group relative overflow-hidden rounded-xl border border-secondary-200 bg-surface-raised p-6 shadow-sm transition-all duration-300 hover:border-primary-300 hover:shadow-xl hover:shadow-primary-500/10 ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
      onClick={onClick}
      whileHover={
        reduced || !onClick
          ? undefined
          : {
              y: -8,
              transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
            }
      }
      whileTap={onClick && !reduced ? { scale: 0.98 } : undefined}
    >
      {/* Top accent line - animated gradient */}
      <span className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-primary-500 to-tertiary-500 scale-x-0 transition-transform duration-300 group-hover:scale-x-100 origin-left" />
      {children}
    </Comp>
  )
}
