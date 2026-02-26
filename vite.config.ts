import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// For GitHub Pages user site (username.github.io): base: '/'
// For project pages (username.github.io/repo): base: '/repo/'
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
})
