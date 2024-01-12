import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // set your desired port here
    open: true, // opens the browser
    proxy: {
      '/blog': 'http://localhost:3000',
    },
  },
})