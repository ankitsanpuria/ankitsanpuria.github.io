import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Section } from '../layout/Section'
import { Card } from '../ui/Card'
import { Modal } from '../ui/Modal'
import { projects } from '../../data/content'
import type { Project } from '../../types'

const categories = ['All', ...new Set(projects.map((p) => p.category))]

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null)
  const [filter, setFilter] = useState('All')

  const filtered = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  )

  return (
    <Section id="projects" title="Projects" subtitle="Selected work and case studies.">
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === cat
                ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <Card onClick={() => setSelected(project)} as="article">
              <div className="h-32 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-4">
                <span className="text-4xl font-bold text-zinc-300 dark:text-zinc-600">
                  {project.title.charAt(0)}
                </span>
              </div>
              <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                {project.category}
              </span>
              <h3 className="mt-1 text-lg font-semibold">{project.title}</h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
                {project.tagline}
              </p>
              <p className="mt-3 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                View details →
              </p>
            </Card>
          </motion.div>
        ))}
      </div>

      <Modal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.title}
      >
        {selected && (
          <div className="space-y-6">
            <p className="text-zinc-600 dark:text-zinc-400">{selected.tagline}</p>

            <div className="h-48 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
              <span className="text-sm text-zinc-400">Screenshot placeholder</span>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 mb-2">
                Problem
              </h4>
              <p className="text-zinc-600 dark:text-zinc-400">{selected.problem}</p>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 mb-2">
                Architecture
              </h4>
              <p className="text-zinc-600 dark:text-zinc-400">{selected.architecture}</p>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 mb-2">
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {selected.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-sm rounded-full bg-zinc-100 dark:bg-zinc-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 mb-2">
                Impact
              </h4>
              <ul className="list-disc list-inside space-y-1 text-zinc-600 dark:text-zinc-400">
                {selected.impact.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Modal>
    </Section>
  )
}
