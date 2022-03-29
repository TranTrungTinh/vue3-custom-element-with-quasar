import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      customElement: true,
      reactivityTransform: true,
      template: { transformAssetUrls }
    }),
    quasar({
      sassVariables: 'src/assets/scss/variables.scss'
    })
  ]
})