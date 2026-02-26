import { motion } from 'framer-motion'
import { useTheme, type ThemeId } from '../../context/ThemeContext'
import { useReducedMotion } from '../../hooks/useReducedMotion'
const GRID_THEMES: ThemeId[] = ['default', 'emerald', 'midnight', 'nightfall']

const SWATCH_COLORS: Record<ThemeId, string> = {
  default: 'bg-blue-500',
  emerald: 'bg-emerald-500',
  rose: 'bg-rose-500',
  midnight: 'bg-blue-900',
  nightfall: 'bg-violet-800',
}

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const reduced = useReducedMotion()

  return (
    <motion.div
      className="inline-flex rounded-lg border border-secondary-200 bg-surface-raised"
      role="group"
      aria-label="Color scheme"
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {GRID_THEMES.map((t) => (
        <motion.button
          key={t}
          onClick={() => setTheme(t)}
          className={`relative w-6 h-6 rounded-md transition-colors duration-300 focus-visible:outline focus-visible:outline-offset-1 focus-visible:outline-primary-500 ${
            theme === t ? 'ring-2 ring-primary-500' : 'hover:opacity-90'
          }`}
          aria-label={`${t} theme`}
          aria-pressed={theme === t}
          whileHover={reduced ? undefined : { scale: 1.1 }}
          whileTap={reduced ? undefined : { scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          <span
            className={`absolute inset-1 rounded transition-colors duration-300 ${SWATCH_COLORS[t]} ${
              t === 'midnight' || t === 'nightfall' ? 'brightness-75' : ''
            }`}
          />
        </motion.button>
      ))}
    </motion.div>
  )
}
