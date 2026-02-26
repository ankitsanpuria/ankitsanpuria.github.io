import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { spring } from '../../lib/animation'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  /** Fade + slide direction: 'up' | 'down' | 'left' | 'right' */
  direction?: 'up' | 'down' | 'left' | 'right'
  /** Stagger index for sequential delay */
  index?: number
  /** Base delay in seconds before stagger */
  delay?: number
  /** Only animate once when in view */
  once?: boolean
  /** Viewport margin */
  margin?: string
}

const directions = {
  up: { y: 24 },
  down: { y: -24 },
  left: { x: 24 },
  right: { x: -24 },
}

export function ScrollReveal({
  children,
  className = '',
  direction = 'up',
  index = 0,
  delay = 0,
  once = true,
  margin = '-30px',
}: ScrollRevealProps) {
  const reduced = useReducedMotion()

  const offset = directions[direction]
  const axis = direction === 'up' || direction === 'down' ? 'y' : 'x'
  const value = offset[axis as keyof typeof offset]

  const initial = reduced
    ? undefined
    : ({ opacity: 0, [axis]: value } as Record<string, number>)
  const animate = reduced ? undefined : ({ opacity: 1, [axis]: 0 } as Record<string, number>)

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={animate}
      viewport={{ once, margin }}
      transition={{
        ...spring.smooth,
        delay: reduced ? 0 : delay + index * 0.06,
      }}
    >
      {children}
    </motion.div>
  )
}
