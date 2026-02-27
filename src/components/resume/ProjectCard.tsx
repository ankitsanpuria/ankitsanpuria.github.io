import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import type { Project } from '../../types'

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  Enterprise: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  SaaS: { bg: 'bg-violet-50', text: 'text-violet-700', border: 'border-violet-200' },
  'E-Commerce': { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
  EdTech: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
}

interface ProjectCardProps {
  project: Project
  index?: number
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const reduced = useReducedMotion()
  const catStyle = categoryColors[project.category] ?? { bg: 'bg-surface-inset', text: 'text-secondary-700', border: 'border-secondary-200' }

  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: index * 0.07 }}
      whileHover={reduced ? undefined : { y: -4, transition: { duration: 0.2 } }}
      className="group relative overflow-hidden rounded-2xl border border-secondary-200 bg-surface-raised shadow-sm hover:border-primary-300 hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-300 flex flex-col print:break-inside-avoid"
    >
      {/* Top accent */}
      <span className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-primary-500 to-tertiary-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

      <div className="p-5 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm font-bold text-secondary-900">{project.title}</h3>
              <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full border ${catStyle.bg} ${catStyle.text} ${catStyle.border}`}>
                {project.category}
              </span>
            </div>
            <p className="text-xs text-secondary-500 mt-0.5 leading-relaxed">{project.tagline}</p>
          </div>
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="flex-shrink-0 text-secondary-400 hover:text-primary-600 transition-colors p-1 print:hidden"
              aria-label={`Visit ${project.title}`}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 3H3a1 1 0 00-1 1v9a1 1 0 001 1h9a1 1 0 001-1V9" />
                <path d="M10 2h4v4" />
                <path d="M14 2L7 9" />
              </svg>
            </a>
          )}
        </div>

        {/* Problem / Solution */}
        <div className="space-y-2 flex-1">
          <div className="rounded-lg bg-surface-inset px-3 py-2">
            <span className="text-xs font-bold text-secondary-500 uppercase tracking-wide">Problem</span>
            <p className="text-xs text-secondary-700 mt-0.5 leading-relaxed line-clamp-2">{project.problem}</p>
          </div>
          <div className="rounded-lg bg-primary-50/60 px-3 py-2 border border-primary-100">
            <span className="text-xs font-bold text-primary-600 uppercase tracking-wide">Solution</span>
            <p className="text-xs text-secondary-700 mt-0.5 leading-relaxed line-clamp-3">{project.architecture}</p>
          </div>
        </div>

        {/* Impact */}
        {project.impact.length > 0 && (
          <div className="mt-3">
            <span className="text-xs font-bold text-secondary-500 uppercase tracking-wide">Impact</span>
            <ul className="mt-1 space-y-0.5">
              {project.impact.slice(0, 3).map((imp, i) => (
                <li key={i} className="flex items-start gap-1.5 text-xs text-secondary-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-400 flex-shrink-0 mt-1" />
                  {imp}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tech stack */}
        <div className="mt-3 flex flex-wrap gap-1 pt-3 border-t border-secondary-100">
          {project.techStack.map(t => (
            <span
              key={t}
              className="inline-block px-1.5 py-0.5 text-xs font-mono font-medium bg-surface-inset text-secondary-600 border border-secondary-200 rounded"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  )
}
