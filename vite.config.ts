import {resolve} from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';

// One HTML entry per page, so every page has its own real URL
// (/services/, /gallery/ …) on any static host, with no router.
const page = (p: string) => resolve(__dirname, p);

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2020',
    rollupOptions: {
      input: {
        home: page('index.html'),
        services: page('services/index.html'),
        gallery: page('gallery/index.html'),
        about: page('about/index.html'),
        contact: page('contact/index.html'),
      },
    },
  },
});
