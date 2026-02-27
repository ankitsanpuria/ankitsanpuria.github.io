import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { existsSync, createReadStream } from 'fs'
import { join } from 'path'

// https://vite.dev/config/
// For GitHub Pages user site (username.github.io): base: '/'
// For project pages (username.github.io/repo): base: '/repo/'
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Serve public/<path>/index.html for directory-style URLs before the SPA
    // fallback intercepts them. Needed only in the Vite dev server; production
    // static hosts (GitHub Pages / nginx) handle this automatically.
    {
      name: 'serve-public-subdir-index',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const pathname = (req.url ?? '/').split('?')[0]
          if (pathname === '/' || pathname === '/explore') return next()
          const candidate = join(process.cwd(), 'public', pathname, 'index.html')
          if (existsSync(candidate)) {
            res.setHeader('Content-Type', 'text/html; charset=utf-8')
            createReadStream(candidate).pipe(res)
            return
          }
          next()
        })
      },
    },
  ],
  base: '/',
})
