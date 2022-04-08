/**
 * @file vite config
 * @module vite.config
 * @author Tinh
 */
import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import eslintPlugin from 'vite-plugin-eslint';
import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
  root: path.resolve(__dirname),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    vue({
      customElement: true,
      reactivityTransform: true,
      template: {
        transformAssetUrls 
      }
    }),
    quasar({
      sassVariables: 'src/assets/scss/variables.scss'
    }),
    svgLoader(),
    eslintPlugin({
      fix: true,
      include: "src/**/*.{js,vue,ts}",
    })
  ],
  build: {
    cssCodeSplit: false,
    minify: true,
    manifest: true,
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            if (id.includes("quasar")) {
              return "vendor_ui";
            }
            return "vendor";
          }
        },
      },
    },
  },
})