import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import postcssNesting from "postcss-nesting"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './',
  server: { port: 4000, host: true },
  css: {
    postcss: {
      plugins: [postcssNesting],
    },
  },
})
