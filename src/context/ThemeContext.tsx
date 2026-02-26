import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export const THEMES = ['default', 'emerald', 'rose', 'midnight', 'nightfall'] as const
export type ThemeId = (typeof THEMES)[number]

interface ThemeContextValue {
  theme: ThemeId
  setTheme: (theme: ThemeId) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

const STORAGE_KEY = 'portfolio_theme'

function getStoredTheme(): ThemeId {
  if (typeof window === 'undefined') return 'default'
  const stored = localStorage.getItem(STORAGE_KEY) as ThemeId | null
  if (stored && THEMES.includes(stored)) return stored
  return 'default'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>(getStoredTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  const setTheme = (t: ThemeId) => setThemeState(t)

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
