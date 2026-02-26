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

export default function App() {
  return (
    <ThemeProvider>
      <SEO />
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Architecture />
        <Contact />
      </main>
      <Footer />
    </ThemeProvider>
  )
}
