import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

export default defineConfig(({ mode }) => ({
  plugins: [svelte()],
  root: 'src',
  define: {
    'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
    'process.platform': JSON.stringify(process.platform),
    'process.env': {}
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src/index.html'),
      },
    },
  },
  server: {
    port: 3000,
  },
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'electron': path.resolve(__dirname, './src/utils/electron-stub.js')
    },
  },
  optimizeDeps: {
    exclude: ['electron']
  }
}));
