import { lazy, Suspense, useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Header } from './components/layout/Header'
import { Footer } from './components/sections/Footer'
import { SEO } from './components/SEO'
import { ThemeProvider } from './context/ThemeContext'
import { ResumePage } from './pages/ResumePage'

// Lazy-load the Explore (portfolio) page — keeps initial bundle lean
const ExplorePage = lazy(() =>
  import('./pages/ExplorePage').then((m) => ({ default: m.ExplorePage })),
)

/* ─── Routing helpers ───────────────────────────────────────────────── */
export type Route = 'resume' | 'explore'

function getRoute(): Route {
  if (typeof window === 'undefined') return 'resume'
  return window.location.pathname === '/explore' ? 'explore' : 'resume'
}

function pushRoute(target: Route) {
  const url = target === 'explore' ? '/explore' : '/'
  window.history.pushState({}, '', url)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

/* ─── Loading fallback ──────────────────────────────────────────────── */
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex items-center gap-3 text-secondary-500">
        <span
          className="w-4 h-4 rounded-full border-2 border-primary-500 border-t-transparent animate-spin"
          aria-hidden
        />
        <span className="text-sm font-medium">Loading…</span>
      </div>
    </div>
  )
}

/* ─── App ───────────────────────────────────────────────────────────── */
export default function App() {
  const [route, setRoute] = useState<Route>(getRoute)

  // Sync state with browser back/forward navigation
  useEffect(() => {
    const onPop = () => setRoute(getRoute())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const goTo = (target: Route) => {
    pushRoute(target)
    setRoute(target)
  }

  return (
    <ThemeProvider>
      <SEO />
      <Header route={route} onNavigate={goTo} />

      <AnimatePresence mode="wait">
        {route === 'resume' ? (
          <ResumePage key="resume" onExplore={() => goTo('explore')} />
        ) : (
          <Suspense key="explore" fallback={<PageLoader />}>
            <ExplorePage onBack={() => goTo('resume')} />
          </Suspense>
        )}
      </AnimatePresence>

      <Footer route={route} onExplore={() => goTo('explore')} />
    </ThemeProvider>
  )
}
