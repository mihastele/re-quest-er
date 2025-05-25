import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
  // Enable Svelte 5 compatibility
  compilerOptions: {
    enableSourcemap: true,
    // This is needed for Svelte 5 component API compatibility
    compatibility: {
      componentApi: '4' // Use the v4 component API
    }
  },
  // Preprocessors
  preprocess: [
    vitePreprocess({
      // Add any necessary preprocessor options here
    })
  ]
};
