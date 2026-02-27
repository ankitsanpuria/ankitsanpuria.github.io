import { useEffect, useState, useRef } from 'react'

/**
 * Tracks which section is currently visible in the viewport.
 * Uses IntersectionObserver with a top-biased rootMargin so the
 * "active" section matches what the user is reading, not the last
 * element that crossed the viewport edge.
 *
 * @param ids  Array of element IDs to observe (order matters for fallback).
 * @param rootMargin  IntersectionObserver rootMargin (default biases to upper 30% of viewport).
 */
export function useScrollSpy(
  ids: string[],
  rootMargin = '-10% 0px -80% 0px',
): string {
  const [activeId, setActiveId] = useState<string>(ids[0] ?? '')
  // Track intersection state for each id so we can pick the topmost visible
  const visible = useRef<Set<string>>(new Set())

  useEffect(() => {
    if (ids.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visible.current.add(entry.target.id)
          } else {
            visible.current.delete(entry.target.id)
          }
        })

        // Pick the first ID (top-to-bottom) that is currently visible
        const next = ids.find((id) => visible.current.has(id))
        if (next) setActiveId(next)
      },
      { rootMargin },
    )

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]

    elements.forEach((el) => observer.observe(el))

    return () => {
      elements.forEach((el) => observer.unobserve(el))
      observer.disconnect()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join(','), rootMargin])

  return activeId
}

/**
 * Smoothly scrolls to an element by ID, accounting for sticky header offset.
 */
export function scrollToSection(id: string, offset = 80) {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - offset
  window.scrollTo({ top, behavior: 'smooth' })
}
