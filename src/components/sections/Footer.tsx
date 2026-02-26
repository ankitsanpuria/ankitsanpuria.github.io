import { motion } from 'framer-motion'
import { siteConfig } from '../../data/content'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export function Footer() {
  const year = new Date().getFullYear()
  const reduced = useReducedMotion()

  return (
    <motion.footer
      className="border-t border-secondary-200 py-6 px-4 md:px-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-secondary-500">
          © {year} {siteConfig.name}
        </p>
        <motion.a
          href="#hero"
          className="text-sm font-medium text-secondary-600 hover:text-secondary-900 transition-colors"
          whileHover={reduced ? undefined : { y: -1 }}
          whileTap={reduced ? undefined : { scale: 0.98 }}
        >
          Back to top
        </motion.a>
      </div>
    </motion.footer>
  )
}
