import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { skills } from '../../data/content'

const categoryColors: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  Frontend: {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
    dot: 'bg-blue-500',
  },
  Backend: {
    bg: 'bg-violet-50',
    text: 'text-violet-700',
    border: 'border-violet-200',
    dot: 'bg-violet-500',
  },
  'Cloud & DevOps': {
    bg: 'bg-orange-50',
    text: 'text-orange-700',
    border: 'border-orange-200',
    dot: 'bg-orange-500',
  },
  'Databases & Caching': {
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
    dot: 'bg-emerald-500',
  },
  'AI & Engineering': {
    bg: 'bg-rose-50',
    text: 'text-rose-700',
    border: 'border-rose-200',
    dot: 'bg-rose-500',
  },
}

// Dark mode aware colors via CSS vars
const categoryColorsDark: Record<string, { bg: string; text: string; border: string }> = {
  Frontend: { bg: 'dark:bg-blue-950/40', text: 'dark:text-blue-300', border: 'dark:border-blue-800' },
  Backend: { bg: 'dark:bg-violet-950/40', text: 'dark:text-violet-300', border: 'dark:border-violet-800' },
  'Cloud & DevOps': { bg: 'dark:bg-orange-950/40', text: 'dark:text-orange-300', border: 'dark:border-orange-800' },
  'Databases & Caching': { bg: 'dark:bg-emerald-950/40', text: 'dark:text-emerald-300', border: 'dark:border-emerald-800' },
  'AI & Engineering': { bg: 'dark:bg-rose-950/40', text: 'dark:text-rose-300', border: 'dark:border-rose-800' },
}

const categoryIcons: Record<string, string> = {
  Frontend: '⬡',
  Backend: '⬢',
  'Cloud & DevOps': '◈',
  'Databases & Caching': '⬟',
  'AI & Engineering': '◉',
}

export function SkillGrid() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const reduced = useReducedMotion()

  return (
    <div className="space-y-4">
      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2 mb-4 print:hidden">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-3 py-1 rounded-full text-xs font-medium border transition-all duration-200 cursor-pointer ${
            activeCategory === null
              ? 'bg-primary-600 text-white border-primary-600'
              : 'bg-surface-raised text-secondary-600 border-secondary-200 hover:border-primary-300'
          }`}
        >
          All
        </button>
        {skills.map(group => (
          <button
            key={group.name}
            onClick={() => setActiveCategory(activeCategory === group.name ? null : group.name)}
            className={`px-3 py-1 rounded-full text-xs font-medium border transition-all duration-200 cursor-pointer ${
              activeCategory === group.name
                ? 'bg-primary-600 text-white border-primary-600'
                : 'bg-surface-raised text-secondary-600 border-secondary-200 hover:border-primary-300'
            }`}
          >
            {group.name}
          </button>
        ))}
      </div>

      {/* Skill category cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <AnimatePresence mode="popLayout">
          {skills
            .filter(g => activeCategory === null || g.name === activeCategory)
            .map((group, i) => {
              const c = categoryColors[group.name] ?? { bg: 'bg-surface-raised', text: 'text-secondary-700', border: 'border-secondary-200', dot: 'bg-secondary-400' }
              const cd = categoryColorsDark[group.name] ?? { bg: '', text: '', border: '' }
              return (
                <motion.div
                  key={group.name}
                  layout={!reduced}
                  initial={reduced ? false : { opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className={`relative overflow-hidden rounded-xl border p-4 print:break-inside-avoid ${c.bg} ${c.border} ${cd.bg} ${cd.border}`}
                >
                  {/* Header */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-base leading-none ${c.text} ${cd.text}`}>{categoryIcons[group.name] ?? '◆'}</span>
                    <span className={`text-xs font-bold uppercase tracking-wider ${c.text} ${cd.text}`}>
                      {group.name}
                    </span>
                  </div>

                  {/* Skill chips */}
                  <div className="flex flex-wrap gap-1.5">
                    {group.skills.map((skill, si) => (
                      <motion.span
                        key={skill}
                        initial={reduced ? false : { opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: si * 0.03 }}
                        className="inline-flex items-center gap-1 text-xs bg-white/70 text-secondary-700 border border-secondary-200/60 rounded-md px-2 py-0.5 font-medium shadow-sm"
                      >
                        <span className={`w-1 h-1 rounded-full ${c.dot} flex-shrink-0`} />
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )
            })}
        </AnimatePresence>
      </div>
    </div>
  )
}
