import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import postcssNesting from "postcss-nesting"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    postcss: {
      plugins: [postcssNesting],
    },
  },
  resolve: {
    alias: {
      '@/': `./`,
    },
  },
  server: { port: 4000, host: true },
})
