import { useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { siteConfig, contactLinks } from '../../data/content'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { darkCell, DARK_BG, PAD } from './shared'

interface HeroCellProps {
  delay?: number
}

export function HeroCell({ delay = 0.08 }: HeroCellProps) {
  const reduced = useReducedMotion()

  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)
  const springX = useSpring(mouseX, { stiffness: 70, damping: 22 })
  const springY = useSpring(mouseY, { stiffness: 70, damping: 22 })
  const glowX = useTransform(springX, [0, 1], ['5%', '95%'])
  const glowY = useTransform(springY, [0, 1], ['5%', '95%'])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reduced) return
      const r = e.currentTarget.getBoundingClientRect()
      mouseX.set((e.clientX - r.left) / r.width)
      mouseY.set((e.clientY - r.top) / r.height)
    },
    [reduced, mouseX, mouseY],
  )

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`col-span-12 md:col-span-8 relative ${PAD}`}
      style={{ ...darkCell, minHeight: 300 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0.5); mouseY.set(0.5) }}
    >
      {/* Cursor glow */}
      {!reduced && (
        <motion.div
          className="absolute pointer-events-none rounded-full"
          style={{
            left: glowX,
            top: glowY,
            width: 380,
            height: 380,
            translateX: '-50%',
            translateY: '-50%',
            background: 'radial-gradient(circle, oklch(0.65 0.2 250 / 0.22) 0%, transparent 68%)',
          }}
        />
      )}

      {/* Dot-grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(oklch(1 0 0 / 0.04) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Fade at bottom so content bleeds naturally */}
      <div
        className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
        style={{ background: `linear-gradient(to top, ${DARK_BG}, transparent)` }}
      />

      <div className="relative z-10 h-full flex flex-col justify-between">
        <div>
          {/* Status pill */}
          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.22 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{
                background: 'oklch(0.72 0.22 50)',
                boxShadow: '0 0 7px oklch(0.72 0.22 50 / 0.8)',
              }}
            />
            <span className="text-xs font-semibold" style={{ color: 'oklch(0.72 0.18 50)' }}>
              Actively seeking next role · Feb 2026
            </span>
          </motion.div>

          <motion.h1
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + 0.14 }}
            className="text-4xl md:text-5xl font-black tracking-tight leading-[1.08] mb-2"
            style={{ color: 'oklch(0.97 0 0)' }}
          >
            {siteConfig.name}
          </motion.h1>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + 0.22 }}
            className="text-sm font-semibold mb-3"
            style={{ color: 'oklch(0.50 0.1 250)' }}
          >
            {siteConfig.title}
          </motion.p>

          <motion.p
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.32 }}
            className="text-sm leading-relaxed max-w-lg"
            style={{ color: 'oklch(0.50 0 0)' }}
          >
            8+ years architecting and scaling high-performance web and mobile platforms —
            microservices, distributed systems, and zero-downtime releases across YMCA,
            non-profit, edtech, and SaaS products serving 100k+ users.
          </motion.p>
        </div>

        {/* Contact links */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + 0.42 }}
          className="flex gap-2 flex-wrap mt-6"
        >
          {contactLinks.map(link => (
            <a
              key={link.name}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200"
              style={{
                background: 'oklch(1 0 0 / 0.06)',
                color: 'oklch(0.72 0 0)',
                border: '1px solid oklch(1 0 0 / 0.09)',
              }}
            >
              {link.name}
            </a>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}
