import { defineConfig } from 'vite'

export default defineConfig({
  root: 'src',
  base: '/10_SonoraClub/',
  server: {
    port: 5177,
    strictPort: true
  }
})
