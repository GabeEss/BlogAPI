import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000,
    open: true,
    proxy: {
      '/blog': import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000',
    },
  },
})