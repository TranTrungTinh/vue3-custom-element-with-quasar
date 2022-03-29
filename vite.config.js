import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import eslintPlugin from 'vite-plugin-eslint';
// import icons from 'unplugin-icons/vite'
// import IconsResolver from 'unplugin-icons/resolver'
// import components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    vue({
      customElement: true,
      reactivityTransform: true,
      template: { transformAssetUrls }
    }),
    quasar({
      sassVariables: 'src/assets/scss/variables.scss'
    }),
    eslintPlugin({
      fix: true
    })
  ]
})