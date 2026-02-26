import { motion } from 'framer-motion'
import { Section } from '../layout/Section'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { aboutContent } from '../../data/content'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { spring } from '../../lib/animation'

export function About() {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>()
  const reduced = useReducedMotion()

  return (
    <Section id="about" title="About" subtitle="A brief overview of my background and focus.">
      <div ref={ref as React.RefObject<HTMLDivElement>}>
        <motion.div
          className="prose prose-lg dark:prose-invert max-w-none"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={reduced ? undefined : isVisible ? { opacity: 1, y: 0 } : {}}
          transition={spring.smooth}
        >
          {aboutContent.summary.split('\n\n').map((para, i) => (
            <p key={i} className="text-secondary-600 leading-relaxed mb-4">
              {para}
            </p>
          ))}
        </motion.div>
      </div>
    </Section>
  )
}
