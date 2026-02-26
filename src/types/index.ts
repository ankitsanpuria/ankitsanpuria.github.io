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
