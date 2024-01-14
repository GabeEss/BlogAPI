import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default ({ mode }) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};

  return defineConfig({
    plugins: [react()],
    server: {
      port: 5000,
      open: true,
      proxy: {
        '/blog': process.env.VITE_BACKEND_URL || 'http://localhost:3000',
      },
    },
  });
};