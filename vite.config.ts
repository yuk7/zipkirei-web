import { defineConfig } from 'vite';

export default defineConfig({
  base: '/zipkirei/',
  assetsInclude: ['**/*.wasm'],
  server: {
    port: 3000,
    fs: {
      // Allow serving files from one level up to access WASM package if needed,
      // though we will copy it to src/pkg for a cleaner setup
      allow: ['..']
    }
  },
  build: {
    target: 'esnext'
  }
});
