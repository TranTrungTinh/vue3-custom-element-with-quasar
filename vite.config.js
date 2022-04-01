import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import eslintPlugin from 'vite-plugin-eslint';
import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: true
  },
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
    svgLoader(),
    eslintPlugin({
      fix: true
    })
  ]
})