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
      <div ref={ref as React.RefObject<HTMLDivElement>} className="grid gap-5 md:grid-cols-2">
        {architectureHighlights.map((item, i) => (
          <motion.article
            key={item.title}
            className="group relative rounded-xl border border-secondary-200 bg-surface-raised/90 p-5 pl-6 border-l-4 border-l-primary-500/70 transition-all duration-300 hover:border-primary-300 hover:shadow-md"
            initial={{ opacity: 0, y: 16 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.35, delay: i * 0.06, ease: 'easeOut' }}
          >
            <h3 className="text-lg font-semibold text-primary-800">
              {item.title}
            </h3>
            <p className="mt-3 text-secondary-600 leading-relaxed">
              {item.description}
            </p>
          </motion.article>
        ))}
      </div>
    </Section>
  )
}
