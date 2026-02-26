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
        <div className="absolute left-0 md:left-4 top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800" />

        <ul className="space-y-12">
          {experience.map((exp, i) => (
            <motion.li
              key={exp.id}
              className="relative pl-8 md:pl-12"
              initial={{ opacity: 0, x: -20 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <span className="absolute left-0 md:left-4 w-3 h-3 rounded-full bg-zinc-400 dark:bg-zinc-500 -translate-x-[5px] md:-translate-x-[5px] top-1.5" />
              <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold">{exp.role}</h3>
                  <span className="text-sm text-zinc-500 dark:text-zinc-400">{exp.period}</span>
                </div>
                <p className="mt-1 text-zinc-600 dark:text-zinc-400">{exp.company}</p>
                <p className="mt-3 text-zinc-600 dark:text-zinc-400">{exp.description}</p>
                <ul className="mt-4 space-y-2">
                  {exp.achievements.map((a, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                      <span className="text-zinc-400 dark:text-zinc-500 mt-0.5">•</span>
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
