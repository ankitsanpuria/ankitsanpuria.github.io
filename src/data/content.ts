import type { Project, Experience, SkillGroup } from '../types'

export const siteConfig = {
  name: 'Ankit Sanpuria',
  title: 'Senior Full Stack Engineer & Technical Lead',
  tagline: '8+ years building scalable SaaS platforms, microservices, and cloud-native applications',
}

export const projects: Project[] = [
  {
    id: 'malhar-jukebox',
    title: 'Malhar Jukebox',
    tagline: 'Multi-tenant music scheduling platform',
    category: 'SaaS',
    problem: 'Radio stations needed a unified platform to manage music scheduling across multiple channels with compliance, licensing, and automation.',
    architecture: 'Multi-tenant SaaS with tenant isolation at the data layer. Event-driven microservices for scheduling workflows. Redis for real-time state, PostgreSQL for persistence. Background workers for playlist generation and compliance validation.',
    techStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'AWS', 'Docker'],
    impact: ['Reduced scheduling time by 60%', 'Served 50+ radio stations', '99.9% uptime SLA'],
  },
  {
    id: 'ymca-platform',
    title: 'White-label YMCA Platform',
    tagline: 'Scalable fitness and community management',
    category: 'Enterprise',
    problem: 'YMCA branches needed a white-label solution for membership, class booking, and facility management with per-location customization.',
    architecture: 'White-label architecture with shared core and tenant-specific branding/config. API-first design. Multi-region deployment for latency. Caching layer for high-traffic read paths.',
    techStack: ['React', 'Node.js', 'PostgreSQL', 'AWS Lambda', 'CloudFront', 'Terraform'],
    impact: ['Deployed to 20+ locations', 'Handled 100K+ monthly active users', 'Sub-200ms API p95 latency'],
  },
  {
    id: 'saas-admin',
    title: 'SaaS Admin Systems',
    tagline: 'Internal tooling and operations platforms',
    category: 'Internal Tools',
    problem: 'Operations teams required centralized admin dashboards for user management, billing, analytics, and configuration across multiple products.',
    architecture: 'Modular admin framework with role-based access. Plugin architecture for product-specific modules. Audit logging and real-time notifications. Serverless functions for background jobs.',
    techStack: ['React', 'TypeScript', 'GraphQL', 'PostgreSQL', 'AWS', 'Framer Motion'],
    impact: ['Unified 5 product admin UIs', 'Reduced support tickets by 40%', 'Self-service configuration for 80% of use cases'],
  },
]

export const experience: Experience[] = [
  {
    id: '1',
    company: '[Company Name]',
    role: 'Technical Lead',
    period: '2022 – Present',
    description: 'Leading architecture and delivery of SaaS products.',
    achievements: ['Drove migration to microservices architecture', 'Mentored 5 engineers', 'Reduced deployment time by 70%'],
  },
  {
    id: '2',
    company: '[Company Name]',
    role: 'Senior Full Stack Engineer',
    period: '2019 – 2022',
    description: 'Built and scaled customer-facing and internal platforms.',
    achievements: ['Shipped 3 major product launches', 'Implemented CI/CD pipelines', 'Introduced comprehensive observability'],
  },
  {
    id: '3',
    company: '[Company Name]',
    role: 'Full Stack Engineer',
    period: '2016 – 2019',
    description: 'Developed web applications and APIs.',
    achievements: ['Contributed to core product features', 'Optimized database queries', 'Improved test coverage to 80%+'],
  },
]

export const skills: SkillGroup[] = [
  {
    name: 'Frontend',
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    name: 'Backend',
    skills: ['Node.js', 'Python', 'REST APIs', 'GraphQL', 'gRPC'],
  },
  {
    name: 'Cloud & DevOps',
    skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD'],
  },
  {
    name: 'Databases',
    skills: ['PostgreSQL', 'Redis', 'MongoDB', 'Elasticsearch'],
  },
  {
    name: 'AI & Tooling',
    skills: ['AI-assisted workflows', 'Git', 'Figma', 'Linear'],
  },
]

export const aboutContent = {
  summary: `Senior Full Stack Engineer and Technical Lead with 8+ years of experience architecting and delivering scalable SaaS platforms. I specialize in multi-tenant systems, microservices design, and cloud-native applications.

My work spans the full stack—from building performant React applications to designing resilient backend services. I've led migrations to microservices, established observability practices, and mentored engineering teams.

I'm passionate about clean architecture, developer experience, and AI-assisted workflows that accelerate delivery without compromising quality.`,
}

export const architectureHighlights = [
  {
    title: 'Multi-tenant SaaS Architecture',
    description: 'Designing tenant isolation at data and application layers. Shared infrastructure with logical separation. Per-tenant configuration, branding, and feature flags.',
  },
  {
    title: 'Microservices Design',
    description: 'Domain-driven service boundaries. Event-driven communication. API contracts and versioning. Graceful degradation and circuit breakers.',
  },
  {
    title: 'Performance Optimization',
    description: 'Caching strategies (Redis, CDN). Query optimization and indexing. Lazy loading and code splitting. Sub-second API response times.',
  },
  {
    title: 'Cloud Deployment Patterns',
    description: 'Infrastructure as Code (Terraform). Container orchestration (Docker, Kubernetes). Multi-region and failover. Blue-green and canary deployments.',
  },
  {
    title: 'Observability',
    description: 'Structured logging and tracing. Metrics and dashboards. Alerting and on-call runbooks. Incident post-mortems and blameless culture.',
  },
]

export const contactLinks = [
  { name: 'LinkedIn', href: 'https://linkedin.com/in/ankitsanpuria', icon: 'linkedin' },
  { name: 'GitHub', href: 'https://github.com/ankitsanpuria', icon: 'github' },
  { name: 'Email', href: 'mailto:hello@example.com', icon: 'email' },
]
