import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  as?: 'div' | 'article' | 'button'
}

export function Card({ children, className = '', onClick, as = 'div' }: CardProps) {
  const Comp = motion[as]
  return (
    <Comp
      className={`group relative overflow-hidden rounded-xl border border-secondary-200 bg-surface-raised p-6 shadow-sm transition-all duration-300 hover:border-primary-300 hover:shadow-lg hover:shadow-primary-500/10 ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
      whileHover={onClick ? { y: -6, transition: { duration: 0.25 } } : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
    >
      <span className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-primary-500 to-tertiary-500 scale-x-0 transition-transform duration-300 group-hover:scale-x-100 origin-left" />
      {children}
    </Comp>
  )
}
