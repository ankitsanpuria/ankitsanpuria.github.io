import type { CSSProperties } from 'react'

export const DARK_BG = 'oklch(0.13 0.018 250)'
export const PAGE_BG = 'oklch(0.09 0.015 250)'

export const darkCell: CSSProperties = {
  background: DARK_BG,
  border: '1px solid oklch(1 0 0 / 0.08)',
  borderRadius: 16,
  overflow: 'hidden',
}

export const PAD = 'p-5'

export const CATEGORY_COLOR: Record<string, string> = {
  Enterprise: 'oklch(0.68 0.18 250)',
  SaaS: 'oklch(0.70 0.18 160)',
  'E-Commerce': 'oklch(0.72 0.18 50)',
  EdTech: 'oklch(0.70 0.18 310)',
}
