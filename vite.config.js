import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    proxy: {
      '/api/shipping_quote': {
        target: 'https://api.ebay.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/shipping_quote/, 'sell/logistics/v1_beta/shipping_quote'),
      },
    },
  },
})
