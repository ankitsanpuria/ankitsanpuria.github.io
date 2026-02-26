import { motion } from 'framer-motion'
import { Section } from '../layout/Section'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { architectureHighlights } from '../../data/content'

export function Architecture() {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>()

  return (
    <Section
      id="architecture"
      title="Architecture Highlights"
      subtitle="Design principles and technical approaches."
    >
      <div ref={ref as React.RefObject<HTMLDivElement>} className="grid gap-6 md:grid-cols-2">
        {architectureHighlights.map((item, i) => (
          <motion.article
            key={item.title}
            className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              {item.title}
            </h3>
            <p className="mt-3 text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {item.description}
            </p>
          </motion.article>
        ))}
      </div>
    </Section>
  )
}
