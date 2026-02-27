import { useEffect, useState } from 'react'

/**
 * Returns the index of the milestone currently in view (centered or nearest).
 * Milestone items must have data-milestone-index="0", "1", etc.
 */
export function useActiveMilestone(
  containerRef: React.RefObject<HTMLElement | null>,
  count: number
) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container || count === 0) return

    const items = container.querySelectorAll<HTMLElement>('[data-milestone-index]')
    if (items.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .map((e) => {
            const idx = parseInt(
              (e.target as HTMLElement).getAttribute('data-milestone-index') ?? '-1',
              10
            )
            return { idx, ratio: e.intersectionRatio }
          })
          .filter((x) => x.idx >= 0)

        if (visible.length === 0) return

        const best = visible.reduce((a, b) => (a.ratio >= b.ratio ? a : b))
        setActiveIndex(best.idx)
      },
      {
        root: null,
        rootMargin: '-35% 0px -35% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    )

    items.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [containerRef, count])

  return activeIndex
}
