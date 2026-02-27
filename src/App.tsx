import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Header } from './components/layout/Header'
import { Hero } from './components/sections/Hero'
import { About } from './components/sections/About'
import { Skills } from './components/sections/Skills'
import { Projects } from './components/sections/Projects'
import { Experience } from './components/sections/Experience'
import { Architecture } from './components/sections/Architecture'
import { Contact } from './components/sections/Contact'
import { Footer } from './components/sections/Footer'
import { SEO } from './components/SEO'
import { ThemeProvider } from './context/ThemeContext'
import { useReducedMotion } from './hooks/useReducedMotion'
import { spring } from './lib/animation'
import { ResumePage } from './pages/ResumePage'

function getView(): 'portfolio' | 'resume' {
  if (typeof window === 'undefined') return 'portfolio'
  const params = new URLSearchParams(window.location.search)
  return params.get('view') === 'resume' ? 'resume' : 'portfolio'
}

export default function App() {
  const reduced = useReducedMotion()
  const [view, setView] = useState<'portfolio' | 'resume'>(getView)

  useEffect(() => {
    const onPop = () => setView(getView())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const navigateTo = (target: 'portfolio' | 'resume') => {
    const url = target === 'resume' ? '?view=resume' : '/'
    window.history.pushState({}, '', url)
    setView(target)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <ThemeProvider>
      <SEO />
      <Header view={view} onNavigate={navigateTo} />
      {view === 'resume' ? (
        <ResumePage />
      ) : (
        <motion.main
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring.smooth, delay: 0.2 }}
        >
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Architecture />
          <Contact />
        </motion.main>
      )}
      <Footer />
    </ThemeProvider>
  )
}
