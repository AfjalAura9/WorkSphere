// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy /api/* to your Express server
      '/api': {
        target: 'http://localhost:5000',  // your backend
        changeOrigin: true,               // required for virtual hosted sites
        secure: false,                    // if you use self-signed certs
        // (optional) strip /api prefix if your backend routes start at /
        // rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
