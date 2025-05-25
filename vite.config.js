import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { fileURLToPath, URL } from 'url';
import { join } from 'path';

export default defineConfig({
  plugins: [svelte({
    compilerOptions: {
      // Enable Svelte 5 compatibility
      enableSourcemap: true,
      // Add any other Svelte 5 specific options here
    },
    onwarn: (warning, handler) => {
      // Ignore certain warnings
      if (warning.code === 'a11y-click-events-have-key-events') return;
      handler(warning);
    },
  })],
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: join(__dirname, 'index.html'),
        preload: join(__dirname, 'preload.mjs')
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]'
      }
    },
    target: 'esnext',
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext',
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis',
      },
    },
  },
  server: {
    port: 3000,
  },
});
