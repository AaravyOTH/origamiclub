import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/*': {
        target: 'https://maytakahashi-github-io-server-qr1v19b4y.vercel.app', // Replace with your backend server URL for local development
        changeOrigin: true,
        secure: false,
        }
    }
  }
});
