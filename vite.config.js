import { defineConfig } from 'vite';

export default defineConfig({
  base: '/wdd330/', // <-- IMPORTANT for GitHub Pages
  build: {
    outDir: 'dist'
  }
});
