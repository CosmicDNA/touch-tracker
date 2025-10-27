import legacy from '@vitejs/plugin-legacy'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    legacy({
      targets: ['chrome >= 108', 'safari >= 16'],
      modernPolyfills: ['es.object.from-entries'],
    }),
    react()
  ],
  server: {
    allowedHosts: [
      '.trycloudflare.com',
    ]
  },
})
