/**
 * Shared animation configs for Framer Motion.
 * All animations use transform & opacity for GPU acceleration.
 * Reduced motion is handled via useReducedMotion hook.
 */
export const spring = {
  smooth: { type: 'spring' as const, damping: 25, stiffness: 300 },
  snappy: { type: 'spring' as const, damping: 30, stiffness: 400 },
  gentle: { type: 'spring' as const, damping: 20, stiffness: 200 },
}

export const duration = {
  fast: 0.2,
  normal: 0.35,
  slow: 0.5,
}

export const ease = [0.22, 1, 0.36, 1] as const // ease-out-expo

/** Stagger delays for sequential reveals */
export const stagger = (i: number, base = 0.06) => i * base
