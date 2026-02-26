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
      className={`rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-6 shadow-sm hover:shadow-md transition-shadow ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
      whileHover={onClick ? { y: -4 } : undefined}
      transition={{ duration: 0.2 }}
    >
      {children}
    </Comp>
  )
}
