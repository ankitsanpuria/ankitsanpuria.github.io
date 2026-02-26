import { motion } from 'framer-motion'
import { Section } from '../layout/Section'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { experience } from '../../data/content'

export function Experience() {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>()

  return (
    <Section
      id="experience"
      title="Experience"
      subtitle="Professional journey and leadership highlights."
    >
      <div ref={ref as React.RefObject<HTMLDivElement>} className="relative">
        <div className="absolute left-0 md:left-4 top-0 bottom-0 w-px bg-gradient-to-b from-primary-400 via-primary-300 to-transparent" />

        <ul className="space-y-6">
          {experience.map((exp, i) => (
            <motion.li
              key={exp.id}
              className="relative pl-8 md:pl-12"
              initial={{ opacity: 0, x: -20 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <span className="absolute left-0 md:left-4 w-3 h-3 rounded-full bg-primary-500 ring-4 ring-primary-100 -translate-x-[5px] md:-translate-x-[5px] top-1.5" />
              <div className="rounded-xl border border-secondary-200 bg-surface-raised/90 p-5 transition-all duration-300 hover:border-primary-200 hover:shadow-md">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold text-primary-800">{exp.role}</h3>
                  <span className="text-sm text-secondary-500">{exp.period}</span>
                </div>
                <p className="mt-1 text-secondary-600">{exp.company}</p>
                <p className="mt-3 text-secondary-600">{exp.description}</p>
                <ul className="mt-4 space-y-2">
                  {exp.achievements.map((a, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-secondary-600">
                      <span className="text-secondary-500 mt-0.5">•</span>
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
