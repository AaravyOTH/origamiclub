import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Ensure the build output directory is 'dist'
  },
  base: '/', // Set the base URL for deployment. Use '/' for custom domains or '/your-repo-name/' for GitHub Pages
  server: {
    port: 5173, // You can specify the port for the development server
  },
});
