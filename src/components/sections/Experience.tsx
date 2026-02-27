import { Section } from '../layout/Section'
import { Timeline } from '../layout/ExperienceTimeline'
import { experience } from '../../data/content'

function scrollToArchitecture() {
  document.getElementById('architecture')?.scrollIntoView({ behavior: 'smooth' })
}

export function Experience() {
  return (
    <Section
      id="experience"
      title="Experience"
      subtitle="Professional journey and leadership highlights."
    >
      <Timeline
        milestones={experience}
        onViewArchitecture={scrollToArchitecture}
      />
    </Section>
  )
}
