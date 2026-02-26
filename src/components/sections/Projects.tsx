import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Section } from '../layout/Section'
import { Card } from '../ui/Card'
import { Modal } from '../ui/Modal'
import { projects } from '../../data/content'
import type { Project } from '../../types'
import { LazyImage } from '../ui/LazyImage'

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
      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <motion.button
            key={cat}
            onClick={() => setFilter(cat)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              filter === cat
                ? 'bg-primary-600 text-primary-50 shadow-md shadow-primary-500/25'
                : 'bg-surface-inset text-secondary-600 hover:bg-primary-100 hover:text-primary-700 hover:border-primary-200'
            } border border-transparent`}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.35, delay: i * 0.06, ease: 'easeOut' }}
          >
            <Card onClick={() => setSelected(project)} as="article">
              <div className="h-28 rounded-lg bg-gradient-to-br from-primary-100/50 to-tertiary-100/50 border border-primary-200/30 flex items-center justify-center mb-4">
                  {project.image ? <LazyImage src={project.image} alt={project.title} className="w-full h-full object-contain" /> : (
                    <span className="text-4xl font-bold text-secondary-400">
                      {project.title.charAt(0)}
                    </span>
                  )}
              </div>
              <span className="text-xs font-medium text-secondary-500">
                {project.category}
              </span>
              <h3 className="mt-1 text-lg font-semibold">{project.title}</h3>
              <p className="mt-2 text-sm text-secondary-600 line-clamp-2">
                {project.tagline}
              </p>
              <p className="mt-3 text-sm font-medium text-primary-600 group-hover:text-primary-700 transition-colors">
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
            <p className="text-secondary-600">{selected.tagline}</p>

            <div className="h-48 rounded-lg bg-surface-inset flex items-center justify-center">
              <img src={selected.image} alt={selected.title} className="w-full h-full object-contain" />
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-secondary-500 mb-2">
                Problem
              </h4>
              <p className="text-secondary-600">{selected.problem}</p>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-secondary-500 mb-2">
                Architecture
              </h4>
              <p className="text-secondary-600">{selected.architecture}</p>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-secondary-500 mb-2">
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {selected.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-sm rounded-full bg-primary-100/80 text-primary-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-secondary-500 mb-2">
                Impact
              </h4>
              <ul className="list-disc list-inside space-y-1 text-secondary-600">
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
