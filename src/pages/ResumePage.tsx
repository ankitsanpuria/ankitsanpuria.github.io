import type { ReactElement } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { spring } from '../lib/animation'
import {
  siteConfig,
  experience,
  projects,
  architectureHighlights,
  contactLinks,
} from '../data/content'
import { StatCard } from '../components/resume/StatCard'
import { SkillGrid } from '../components/resume/SkillGrid'
import { ExperienceCard } from '../components/resume/ExperienceCard'
import { ProjectCard } from '../components/resume/ProjectCard'
import { ArchCard } from '../components/resume/ArchCard'
import { ScrollReveal } from '../components/ui/ScrollReveal'

/* ─── Section wrapper ─────────────────────────────────────────────────── */
function ResumeSection({
  id,
  title,
  subtitle,
  children,
  className = '',
}: {
  id?: string
  title: string
  subtitle?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section id={id} className={`py-10 print:py-4 ${className}`}>
      <ScrollReveal>
        <div className="flex items-baseline gap-3 mb-1">
          <h2 className="text-xl font-bold text-secondary-900 tracking-tight">{title}</h2>
          <span className="h-px flex-1 bg-secondary-200 max-w-xs" />
        </div>
        {subtitle && <p className="text-sm text-secondary-500 mb-5">{subtitle}</p>}
      </ScrollReveal>
      <div className="mt-4">{children}</div>
    </section>
  )
}

/* ─── Leadership items ───────────────────────────────────────────────── */
const leadershipItems = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    title: 'Technical Mentoring',
    points: ['Guided junior and mid-level engineers on architecture, code quality, and best practices', 'Conducted PR reviews and paired on complex feature implementation'],
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: 'Code Quality & Standards',
    points: ['Established Zustand + React Query patterns, ESLint configs, and testing conventions', 'Reduced critical bug backlog ~60% through systematic monitoring and triage'],
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
    title: 'System Design',
    points: ['End-to-end architecture for multi-tenant platforms, microservices, and distributed systems', 'Designed domain boundaries, API contracts, and data consistency strategies'],
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
    title: 'CI/CD & Automation',
    points: ['Built GitHub Actions pipelines for automated testing, builds, and deployments', 'Automated client onboarding workflows—dramatically reducing setup time per tenant'],
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    title: 'Product Collaboration',
    points: ['Collaborated with product, design, and QA to align technical delivery with business objectives', 'Translated ambiguous requirements into concrete architecture and sprint deliverables'],
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12l2 2 4-4" />
        <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c1.51 0 2.93.37 4.18 1.03" />
        <path d="M22 4L12 14.01l-3-3" />
      </svg>
    ),
    title: 'Security & Reliability',
    points: ['Remediated SQL injection vectors, removed sensitive logging, patched high-severity npm vulnerabilities', 'Kubernetes health checks, HPA, heap tuning, Instana/Sentry observability for ~99.9% uptime'],
  },
]

/* ─── Education & Certifications ────────────────────────────────────── */
const education = [
  {
    icon: '🎓',
    degree: 'B.E. Information Technology',
    institution: 'University of Pune',
    year: '2018',
    note: 'Computer Science & Engineering',
  },
]

const certifications = [
  {
    icon: '🤖',
    name: 'AI-Assisted Engineering',
    issuer: 'GitHub Copilot · Cursor IDE · Prompt Engineering',
    note: 'Applied LLM workflows in production development',
  },
  {
    icon: '☁️',
    name: 'Cloud Architecture',
    issuer: 'AWS (Lambda, ECS, S3, RDS) · Kubernetes · Serverless',
    note: 'Production deployments & infrastructure automation',
  },
]

/* ─── Stats ────────────────────────────────────────────────────────── */
const stats = [
  { value: 8, suffix: '+', label: 'Years Experience', description: 'Building production software' },
  { value: 100, suffix: 'k+', label: 'Monthly Active Users', description: 'Served across platforms' },
  { value: 100, suffix: '+', label: 'Organizations', description: 'On multi-tenant platform' },
  { value: 40, suffix: '%+', label: 'DB Latency Reduction', description: 'Via query & replica optimization' },
  { value: 250, suffix: '+', label: 'Production Commits', description: 'At DAXKO alone' },
  { value: 60, suffix: '%', label: 'Bug Backlog Cut', description: 'Via monitoring & triage' },
]

/* ─── Contact icon components ────────────────────────────────────────── */
function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}
function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function EmailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}
function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}

const iconMap: Record<string, ReactElement> = {
  linkedin: <LinkedInIcon />,
  github: <GitHubIcon />,
  email: <EmailIcon />,
}

/* ─── Main component ───────────────────────────────────────────────── */
export function ResumePage() {
  const reduced = useReducedMotion()

  const handlePrint = () => window.print()

  return (
    <div className="min-h-screen bg-surface relative">
      {/* Animated background gradient - hidden on print */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0 print:hidden"
        animate={
          reduced
            ? undefined
            : {
                background: [
                  'radial-gradient(ellipse 80% 50% at 20% 0%, var(--primary-200) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 100%, var(--tertiary-200) 0%, transparent 60%)',
                  'radial-gradient(ellipse 80% 50% at 80% 0%, var(--tertiary-200) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 20% 100%, var(--primary-200) 0%, transparent 60%)',
                  'radial-gradient(ellipse 80% 50% at 20% 0%, var(--primary-200) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 100%, var(--tertiary-200) 0%, transparent 60%)',
                ],
              }
        }
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        style={{ opacity: 0.3 }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 py-6 print:px-0 print:py-0 print:max-w-none">

        {/* ── HERO ──────────────────────────────────────────────────── */}
        <motion.header
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring.smooth, delay: 0.1 }}
          className="pt-4 pb-8 border-b border-secondary-200 print:pb-4 print:border-secondary-300"
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            {/* Name + title */}
            <div className="flex-1 min-w-0">
              {/* Available badge */}
              <motion.div
                initial={reduced ? false : { opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ ...spring.snappy, delay: 0.2 }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold mb-4 print:hidden"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Open to opportunities
              </motion.div>

              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-secondary-900 leading-none print:text-3xl">
                {siteConfig.name}
              </h1>
              <div className="mt-2 text-lg md:text-xl font-semibold bg-gradient-to-r from-primary-600 to-tertiary-600 bg-clip-text text-transparent leading-tight print:text-base print:text-secondary-700">
                {siteConfig.title}
              </div>
              <p className="mt-3 text-sm text-secondary-600 max-w-xl leading-relaxed print:text-xs">
                {siteConfig.tagline}
              </p>

              {/* Contact links */}
              <div className="mt-4 flex flex-wrap items-center gap-3 print:gap-4">
                {contactLinks.map(link => (
                  <a
                    key={link.name}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-secondary-600 hover:text-primary-600 transition-colors duration-200 print:text-secondary-800"
                  >
                    <span className="text-secondary-400">{iconMap[link.icon]}</span>
                    {link.name}
                  </a>
                ))}
                <span className="text-secondary-300 hidden md:inline">·</span>
                <span className="text-xs text-secondary-500 print:block">ankitsanpuria@hotmail.com</span>
              </div>
            </div>

            {/* Download button */}
            <div className="flex flex-col gap-2 flex-shrink-0 print:hidden">
              <motion.button
                onClick={handlePrint}
                whileHover={reduced ? undefined : { scale: 1.02 }}
                whileTap={reduced ? undefined : { scale: 0.97 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-600 text-white text-sm font-semibold shadow-lg shadow-primary-500/25 hover:bg-primary-700 transition-colors duration-200 cursor-pointer"
              >
                <DownloadIcon />
                Download PDF
              </motion.button>
              <a
                href="/Resume_Ankit_Sanpuria.pdf"
                download
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-surface-raised border border-secondary-200 text-secondary-700 text-sm font-medium hover:border-primary-300 hover:text-primary-600 transition-all duration-200"
              >
                <DownloadIcon />
                Direct download
              </a>
            </div>
          </div>
        </motion.header>

        {/* ── IMPACT METRICS ────────────────────────────────────────── */}
        <ResumeSection id="stats" title="Impact at a Glance" subtitle="Measurable outcomes across 8+ years of production engineering.">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {stats.map((s, i) => (
              <StatCard key={s.label} {...s} index={i} />
            ))}
          </div>
        </ResumeSection>

        {/* ── SKILLS ────────────────────────────────────────────────── */}
        <ResumeSection id="skills" title="Technical Skills" subtitle="Full-stack capabilities across frontend, backend, cloud, and AI tooling.">
          <SkillGrid />
        </ResumeSection>

        {/* ── EXPERIENCE ────────────────────────────────────────────── */}
        <ResumeSection id="experience" title="Experience" subtitle="Click any role to expand achievements and architecture details.">
          <div className="space-y-0">
            {experience.map((exp, i) => (
              <ExperienceCard
                key={exp.id}
                exp={exp}
                index={i}
                isLast={i === experience.length - 1}
              />
            ))}
          </div>
        </ResumeSection>

        {/* ── PROJECTS ────────────────────────────────────────────── */}
        <ResumeSection id="projects" title="Project Highlights" subtitle="Production systems designed, built, and scaled from scratch.">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
          </div>
        </ResumeSection>

        {/* ── ARCHITECTURE ──────────────────────────────────────────── */}
        <ResumeSection id="architecture" title="Architecture Expertise" subtitle="Patterns and systems I've designed and owned in production.">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {architectureHighlights.map((a, i) => (
              <ArchCard key={a.title} title={a.title} description={a.description} index={i} />
            ))}
          </div>
        </ResumeSection>

        {/* ── LEADERSHIP ───────────────────────────────────────────── */}
        <ResumeSection id="leadership" title="Leadership & Engineering Practices" subtitle="How I operate as a senior engineer and technical lead.">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {leadershipItems.map((item, i) => (
              <ScrollReveal key={item.title} index={i} delay={0.05}>
                <div className="group relative overflow-hidden rounded-xl border border-secondary-200 bg-surface-raised p-4 shadow-sm hover:border-primary-300 hover:shadow-md transition-all duration-300 h-full print:break-inside-avoid">
                  <span className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-primary-500 to-tertiary-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-primary-50 border border-primary-100 flex items-center justify-center text-primary-600 flex-shrink-0">
                      {item.icon}
                    </div>
                    <h3 className="text-xs font-bold text-secondary-900">{item.title}</h3>
                  </div>
                  <ul className="space-y-1.5">
                    {item.points.map((pt, pi) => (
                      <li key={pi} className="flex items-start gap-1.5 text-xs text-secondary-600 leading-relaxed">
                        <span className="w-1 h-1 rounded-full bg-primary-400 flex-shrink-0 mt-1.5" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </ResumeSection>

        {/* ── EDUCATION & CERTIFICATIONS ────────────────────────────── */}
        <ResumeSection id="education" title="Education & Certifications" subtitle="Academic background and applied technical expertise.">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {education.map((edu, i) => (
              <ScrollReveal key={edu.degree} index={i}>
                <div className="group relative overflow-hidden rounded-xl border border-secondary-200 bg-surface-raised p-4 shadow-sm hover:border-primary-300 transition-all duration-300 print:break-inside-avoid">
                  <span className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-primary-500 to-tertiary-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  <div className="text-2xl mb-2">{edu.icon}</div>
                  <div className="text-sm font-bold text-secondary-900">{edu.degree}</div>
                  <div className="text-xs font-medium text-primary-600 mt-0.5">{edu.institution}</div>
                  <div className="text-xs text-secondary-500 mt-0.5">{edu.note} · {edu.year}</div>
                </div>
              </ScrollReveal>
            ))}
            {certifications.map((cert, i) => (
              <ScrollReveal key={cert.name} index={i + education.length}>
                <div className="group relative overflow-hidden rounded-xl border border-secondary-200 bg-surface-raised p-4 shadow-sm hover:border-primary-300 transition-all duration-300 print:break-inside-avoid">
                  <span className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-primary-500 to-tertiary-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  <div className="text-2xl mb-2">{cert.icon}</div>
                  <div className="text-sm font-bold text-secondary-900">{cert.name}</div>
                  <div className="text-xs font-medium text-secondary-600 mt-0.5">{cert.issuer}</div>
                  <div className="text-xs text-secondary-500 mt-0.5 italic">{cert.note}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </ResumeSection>

        {/* ── CONTACT CTA ────────────────────────────────────────────── */}
        <section className="py-10 print:hidden">
          <ScrollReveal>
            <motion.div
              whileHover={reduced ? undefined : { scale: 1.005 }}
              className="relative overflow-hidden rounded-2xl border border-secondary-200 bg-surface-raised p-8 shadow-sm text-center"
            >
              {/* Gradient bg */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-tertiary-500/5 pointer-events-none" />

              <div className="relative">
                {/* Available dot */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Available for new opportunities
                </div>

                <h2 className="text-2xl font-black text-secondary-900 tracking-tight">Let's build something great</h2>
                <p className="mt-2 text-sm text-secondary-600 max-w-md mx-auto leading-relaxed">
                  Senior Full Stack Engineer with 8+ years of experience. Open to senior IC, tech lead, and staff engineer roles.
                </p>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  {contactLinks.map(link => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      whileHover={reduced ? undefined : { scale: 1.03 }}
                      whileTap={reduced ? undefined : { scale: 0.97 }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface border border-secondary-200 text-sm font-medium text-secondary-700 hover:border-primary-300 hover:text-primary-600 shadow-sm transition-all duration-200"
                    >
                      <span className="text-secondary-500">{iconMap[link.icon]}</span>
                      {link.name}
                    </motion.a>
                  ))}

                  <motion.button
                    onClick={handlePrint}
                    whileHover={reduced ? undefined : { scale: 1.03 }}
                    whileTap={reduced ? undefined : { scale: 0.97 }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-600 text-white text-sm font-semibold shadow-lg shadow-primary-500/25 hover:bg-primary-700 transition-colors duration-200 cursor-pointer"
                  >
                    <DownloadIcon />
                    Download Resume
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </ScrollReveal>
        </section>

      </div>
    </div>
  )
}
