export interface Project {
  id: string
  title: string
  tagline: string
  category: string
  problem: string
  architecture: string
  techStack: string[]
  impact: string[]
  image?: string
  url?: string
}

export interface Experience {
  id: string
  company: string
  role: string
  period: string
  description: string
  achievements: string[]
  /** Metric badges for recruiter scanning (e.g. "40%+ DB latency", "100+ orgs") */
  metrics?: string[]
  /** Architecture/tech tags shown in expanded view */
  architectureTags?: string[]
  /** Seniority tier for timeline accent: 'senior' | 'mid' | 'junior' */
  seniority?: 'senior' | 'mid' | 'junior'
}

export interface SkillGroup {
  name: string
  skills: string[]
}

export interface ContactLink {
  name: string
  href: string
  icon: string
}
