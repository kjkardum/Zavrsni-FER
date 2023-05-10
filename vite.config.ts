import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// @ts-ignore
import openapiPlugin from './openapiPlugin.js'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), openapiPlugin()],
  assetsInclude: ['src/assets/*.yaml'],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
