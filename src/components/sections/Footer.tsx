import { siteConfig } from '../../data/content'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-secondary-200 py-6 px-4 md:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-secondary-500">
          © {year} {siteConfig.name}
        </p>
        <a
          href="#hero"
          className="text-sm font-medium text-secondary-600 hover:text-secondary-900 transition-colors"
        >
          Back to top
        </a>
      </div>
    </footer>
  )
}
