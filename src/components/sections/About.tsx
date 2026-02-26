import { motion } from 'framer-motion'
import { Section } from '../layout/Section'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { aboutContent } from '../../data/content'

export function About() {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>()

  return (
    <Section id="about" title="About" subtitle="A brief overview of my background and focus.">
      <div ref={ref as React.RefObject<HTMLDivElement>}>
        <motion.div
          className="prose prose-lg dark:prose-invert max-w-none"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {aboutContent.summary.split('\n\n').map((para, i) => (
            <p key={i} className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
              {para}
            </p>
          ))}
        </motion.div>
      </div>
    </Section>
  )
}
