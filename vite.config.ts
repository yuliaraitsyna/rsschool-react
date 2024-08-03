import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { vitePlugin as remix } from '@remix-run/dev';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    react(),
    remix(),
    tsconfigPaths(),
  ],
  server: {
    port: 3000, 
    strictPort: true,
  },
  build: {
    outDir: 'build', 
  },
  resolve: {
    alias: {
      '@': '/src', 
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setupTests.ts'],
  },
});
