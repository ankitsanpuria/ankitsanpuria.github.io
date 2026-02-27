import { useEffect, useState } from 'react'

/**
 * Tracks scroll progress through a timeline container.
 * Returns 0–1 representing how far the timeline has been scrolled through.
 */
export function useTimelineProgress(containerRef: React.RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const onScroll = () => {
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const top = rect.top
      const height = rect.height
      const threshold = vh * 0.3

      if (top > vh) {
        setProgress(0)
      } else if (top + height < 0) {
        setProgress(1)
      } else {
        const scrolled = -top + threshold
        const p = Math.min(1, Math.max(0, scrolled / (height + vh - threshold)))
        setProgress(p)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [containerRef])

  return progress
}
