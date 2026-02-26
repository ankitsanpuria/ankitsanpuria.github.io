import { motion } from 'framer-motion'
import { Section } from '../layout/Section'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { skills } from '../../data/content'

export function Skills() {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>()

  return (
    <Section id="skills" title="Skills" subtitle="Technologies and tools I work with.">
      <div ref={ref as React.RefObject<HTMLDivElement>} className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, i) => (
          <motion.div
            key={group.name}
            initial={{ opacity: 0, y: 16 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.35, delay: i * 0.06, ease: 'easeOut' }}
            className="group relative rounded-xl border-l-4 border-primary-500/70 border border-secondary-200 bg-surface-raised/90 p-5 transition-all duration-300 hover:border-primary-400 hover:shadow-lg hover:shadow-primary-500/10"
          >
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-3 text-primary-600">
                {group.name}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <motion.li
                    key={skill}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: i * 0.06 + 0.1, duration: 0.2 }}
                    whileHover={{ scale: 1.03 }}
                    className="inline-block"
                  >
                    <span className="inline-block px-3 py-1.5 text-sm rounded-lg bg-surface-inset text-secondary-700 transition-colors duration-200 hover:bg-primary-100 hover:text-primary-800 border border-transparent hover:border-primary-200/50">
                      {skill}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
