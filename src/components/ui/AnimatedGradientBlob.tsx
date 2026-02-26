import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface AnimatedGradientBlobProps {
  className?: string
  /** Blob size (e.g. w-96 h-96) */
  size?: string
}

export function AnimatedGradientBlob({
  className = '',
  size = 'w-96 h-96',
}: AnimatedGradientBlobProps) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      className={`absolute rounded-full blur-3xl pointer-events-none -z-10 ${size} ${className}`}
      animate={
        reduced
          ? undefined
          : {
              x: [0, 20, -10, 0],
              y: [0, -15, 10, 0],
              scale: [1, 1.05, 0.98, 1],
            }
      }
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}
