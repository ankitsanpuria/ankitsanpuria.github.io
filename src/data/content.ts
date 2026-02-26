import type { Project, Experience, SkillGroup } from '../types'

export const siteConfig = {
  name: 'Ankit Sanpuria',
  title: 'Senior Full Stack Engineer & Technical Lead',
  tagline: '8+ years architecting and scaling high-performance web and mobile platforms. Microservices, distributed systems, zero-downtime releases.',
}

export const projects: Project[] = [
  {
    id: 'nonprofit-mobile',
    title: 'Non-Profit Mobile App',
    tagline: 'White-label React Native platform serving 100+ organizations',
    category: 'Enterprise',
    problem: 'Non-profit organizations needed a scalable, white-label mobile app for member engagement, scheduling, check-ins, and operational workflows—with per-client branding and rapid onboarding.',
    architecture: 'Cross-platform React Native (Expo) with TypeScript, Expo Router, and React Query for scalable navigation and resilient data fetching. White-label architecture with per-client theming, dynamic app icons, and automated onboarding scripts. Zustand for state, shared design system and i18n for multi-region rollout. Progressive initialization and cached assets for reduced perceived load time.',
    techStack: ['React Native', 'Expo', 'TypeScript', 'Expo Router', 'React Query', 'Zustand'],
    impact: ['Serving 100+ organizations', 'Significantly reduced new-client setup time', '15+ client deployments with consistent UX'],
  },
  {
    id: 'nonprofit-admin',
    title: 'Non-Profit Admin & Integrations',
    tagline: 'Platform, API, infra & ops for YMCA ecosystem',
    category: 'Enterprise',
    problem: 'YMCA organizations required a unified admin platform with scheduling, notifications, fundraising, check-in APIs, and integrations—while maintaining multi-tenant isolation and enterprise uptime.',
    architecture: 'Multi-tenant admin systems with SvelteKit, dynamic master-data management, and approval workflows. Timezone-aware scheduling, recurring classes, reservation management. Read replica architecture and indexing optimizations. Kubernetes health checks, HPA, heap tuning for resilience. AWS Pinpoint push notifications with audience segmentation and scheduled delivery.',
    techStack: ['SvelteKit', 'TypeScript', 'MySQL', 'Capacitor', 'Redis'],
    impact: ['40%+ DB read latency reduction', '~60% reduction in critical bug backlog', '~99.9% uptime', '250+ production commits', '15+ YMCA organizations supported'],
  },
  {
    id: 'malharmusic',
    title: 'MalharMusic',
    tagline: 'Multi-tenant music playback & scheduling platform',
    image: '/assets/images/malhar-jukebox.png',
    url: 'https://malharjukebox.com',
    category: 'SaaS',
    problem: 'Outlets and venues needed a multi-tenant platform for music playback, scheduling, playlists, time-based slots, and paid song requests—with role-based portals for admins, outlets, artists, and customers.',
    architecture: 'PWA-first experience with React (Vite), dynamic manifests, and service workers for offline resilience. Audio streaming with HTTP Range Requests, seeking, and browser caching. Offline-first schedule execution via IndexedDB and Web Workers. Queue-driven bulk media ingestion, resumable Excel imports, AWS S3/CloudFront. Self-hosted Socket.io for push notifications and remote playback control.',
    techStack: ['Laravel', 'React', 'React Native', 'MySQL', 'Redis', 'IndexedDB', 'Web Workers', 'AWS S3/CloudFront', 'PWA', 'Socket.io', 'TailwindCSS'],
    impact: ['~65% reduction in buffering incidents', '~70% fewer runtime failures in low-connectivity', '~80% improved data ingestion reliability', 'Secure OTP auth & PhonePe payment integration'],
  },
  {
    id: 'campfire-digital',
    title: 'Campfire Digital',
    tagline: 'E-commerce & digital rental platform',
    image: '/assets/images/campfire-digital.png',
    url: 'https://campfire.co.in',
    category: 'E-Commerce',
    problem: 'A hybrid e-commerce platform was needed for physical book purchases and time-bound e-book rentals, with secure access control, order approvals, and multi-channel notifications.',
    architecture: 'Laravel backend with dynamic admin panel for master data, order approvals, and automated email workflows. Payment gateway integration with validation and failure handling. Cross-platform React Native mobile apps with feature parity and seamless API integration. Email, SMS, and WhatsApp notification services.',
    techStack: ['Laravel 11', 'React 18', 'React Native', 'React Query', 'MySQL', 'TailwindCSS'],
    impact: ['Scalable backend for growing catalogs and order volume', 'Intuitive consumer-facing web interfaces', 'Cross-platform mobile experience'],
  },
  {
    id: 'readingpup',
    title: 'ReadingPup',
    tagline: "Children's learning web & mobile platform",
    category: 'EdTech',
    image: '/assets/images/readingpup.png',
    problem: 'A subscription-based platform was needed to deliver interactive English-learning experiences for children, with role-based admin, analytics, and engagement workflows.',
    architecture: 'Role-based admin panel for user management, master data, and operational workflows. REST APIs powering mobile and web clients. React Native mobile apps optimized for performance. Automated email workflows for subscriptions, notifications, and user engagement. Visually driven analytics dashboards for engagement and learning metrics.',
    techStack: ['Laravel 11', 'React 18', 'React Native', 'JavaScript', 'MySQL'],
    impact: ['Subscription-based learning delivery', 'Engagement and usage analytics', 'Automated user engagement flows'],
  },
]

export const experience: Experience[] = [
  {
    id: '1',
    company: 'DAXKO',
    role: 'Senior Engineer',
    period: 'April 2024 – Present',
    description: 'End-to-end engineering and architecture for a white-label, multi-tenant mobile + backend platform serving 100+ organizations.',
    achievements: [
      'Led mobile platform delivery (React Native + Expo + TypeScript) with dev builds, Expo Router, and React Query patterns',
      'Architected white-label & onboarding automation—per-client theming, dynamic app icons, significantly reduced new-client setup time',
      'DB read latency improved 40%+ via query optimizations and read replica architecture',
      'Remediated SQL injection vectors, removed sensitive logging, resolved high-severity npm vulnerabilities',
      'Delivered Schedule, Notifications, Event Logs, Fundraising, Check-In APIs and external scheduling integrations',
      '~60% reduction in critical bug backlog through monitoring and Instana tracing',
      '250+ production commits; established Zustand + React Query, testing, and linting patterns',
    ],
  },
  {
    id: '2',
    company: 'Kalyani Navyug Media Pvt. Ltd.',
    role: 'Senior Software Developer',
    period: 'July 2021 – March 2024',
    description: 'End-to-end full-stack delivery across 4+ concurrent web and mobile products—multi-tenant platforms, high-traffic workflows, 100k+ monthly active users.',
    achievements: [
      '~60% reduction in manual operational effort via dynamic admin platforms and automated communications',
      '~40% improvement in mobile engagement through React Native feature parity and performance optimizations',
      'Secure payment pipelines with gateway integrations, webhook verification, atomic transactions—zero reconciliation issues',
      '~70% fewer runtime failures in low-connectivity via offline-first IndexedDB and background workers',
      '~65% reduction in buffering incidents with optimized media streaming and HTTP Range Requests',
      '~80% improvement in data ingestion reliability with async, queue-driven bulk import pipelines',
      '~50% reduction in production incidents through caching, tuning, and architectural refinements',
    ],
  },
  {
    id: '3',
    company: 'Pinnacleworks Infotech Pvt. Ltd.',
    role: 'Software Developer',
    period: 'Jan 2019 – June 2021',
    description: 'End-to-end full-stack delivery of large-scale education ERP and CRM systems—architecture, development, and production readiness.',
    achievements: [
      'Designed secure, role-based access systems for academic, administrative, and operational departments',
      'Built and optimized backend services with Laravel and JavaScript—data consistency, performance, extensibility',
      'Complex workflow automation across admissions, finance, inventory, and academic operations',
      'Third-party integrations and payment gateways with reliable transaction handling and real-time sync',
      'Analytics and reporting for data-driven leadership decisions',
    ],
  },
]

export const skills: SkillGroup[] = [
  {
    name: 'Frontend',
    skills: ['React', 'Next.js', 'TypeScript', 'React Native', 'Redux Toolkit', 'Zustand', 'React Query', 'Tailwind CSS', 'SSR', 'SPA Architecture'],
  },
  {
    name: 'Backend',
    skills: ['Node.js', 'Express', 'NestJS', 'Laravel', 'RESTful APIs', 'Microservices', 'Event-driven Architecture', 'API Versioning'],
  },
  {
    name: 'Cloud & DevOps',
    skills: ['AWS (Lambda, ECS, S3, RDS)', 'Serverless', 'CI/CD Pipelines', 'GitHub Actions', 'Environment Management', 'Production Deployments'],
  },
  {
    name: 'Databases & Caching',
    skills: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Query Optimization'],
  },
  {
    name: 'AI & Engineering',
    skills: ['GitHub Copilot', 'Cursor IDE', 'LLM-assisted Development', 'Prompt Engineering', 'Technical Leadership', 'System Design', 'Git', 'Jest', 'Sentry', 'Instana'],
  },
]

export const aboutContent = {
  summary: `Senior Full Stack Engineer and Technical Team Lead with 8+ years of experience architecting and scaling high-performance web and mobile platforms using modern JavaScript stacks. I specialize in microservices, distributed systems, and cloud-native architectures—with a proven record of delivering zero-downtime production releases.

I'm recognized for technical ownership, system design, CI/CD automation, and observability-driven engineering while mentoring high-impact teams. My work spans white-label multi-tenant platforms, event-driven backends, React Native apps, and performance optimization at scale.

From reducing DB read latency by 40%+ to cutting critical bug backlogs by 60%, I focus on measurable outcomes. I'm passionate about clean architecture, developer experience, and AI-assisted workflows that accelerate delivery without compromising quality.`,
}

export const architectureHighlights = [
  {
    title: 'Multi-tenant SaaS Architecture',
    description: 'White-label and tenant isolation at data and application layers. Per-client theming, dynamic app icons, automated onboarding. Shared infrastructure with logical separation for 100+ organizations.',
  },
  {
    title: 'Microservices & Event-driven Design',
    description: 'Domain-driven service boundaries. Event-driven communication. RESTful APIs with versioning. Queue-driven pipelines for bulk imports, media ingestion, and background jobs.',
  },
  {
    title: 'Performance Optimization',
    description: 'Read replica architecture, indexing, prepared statements. Caching (Redis, CDN). Offline-first patterns with IndexedDB and Web Workers. 40%+ DB latency reduction, ~65% fewer buffering incidents.',
  },
  {
    title: 'Cloud & Infrastructure',
    description: 'AWS (Lambda, ECS, S3, RDS). Kubernetes health checks, HPA, heap tuning. CI/CD with GitHub Actions. Serverless and containerized deployments. ~99.9% uptime targets.',
  },
  {
    title: 'Observability & Reliability',
    description: 'Instana tracing, Sentry monitoring. Systematic bug triage—60% reduction in critical backlog. Autoscaling and liveness probes. Zero-downtime release practices.',
  },
]

export const contactLinks = [
  { name: 'LinkedIn', href: 'https://linkedin.com/in/ankitsanpuria', icon: 'linkedin' },
  { name: 'GitHub', href: 'https://github.com/ankitsanpuria', icon: 'github' },
  { name: 'Email', href: 'mailto:ankitsanpuria@hotmail.com', icon: 'email' },
]
