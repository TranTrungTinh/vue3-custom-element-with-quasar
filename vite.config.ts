import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import { presetWind } from 'unocss'
import eslintPlugin from 'vite-plugin-eslint'
import viteCompression from 'vite-plugin-compression'
import svgLoader from 'vite-svg-loader'
import viteImagemin from 'vite-plugin-imagemin'
import VueI18n from '@intlify/vite-plugin-vue-i18n'

const CWD = process.cwd()

export default defineConfig(({ mode }) => {
  const TARGET_ENV_CONFIG = loadEnv(mode, CWD)
  return {
    root: resolve(__dirname),
    base: TARGET_ENV_CONFIG.VITE_CDN_URL,
    plugins: [
      vue({
        customElement: true,
        reactivityTransform: true,
        template: {
          transformAssetUrls,
          compilerOptions: {
            whitespace: 'preserve',
          },
        },
      }),
      quasar({ sassVariables: 'src/styles/@core/variables.scss' }),
      Unocss({
        presets: [presetWind()],
      }),
      svgLoader(),
      eslintPlugin({
        fix: true,
      }),
      VueI18n({
        include: resolve(__dirname, 'src/locales/**'),
      }),
      viteCompression({
        algorithm: 'brotliCompress',
        filter: /\.(css|js|map)$/i,
      }),
      viteImagemin({
        mozjpeg: {
          quality: 50,
        },
        pngquant: {
          quality: [0.8, 0.9],
          speed: 4,
        },
        svgo: {
          plugins: [
            {
              name: 'removeViewBox',
            },
            {
              name: 'removeEmptyAttrs',
            },
            {
              name: 'removeDimensions',
            },
          ],
        },
      }),
    ],
    resolve: {
      alias: {
        src: resolve(__dirname, 'src'),
        '~': resolve(__dirname, 'src'),
        '@': resolve(__dirname, 'src'),
      },
    },
    server: {
      https: false,
      port: 3002,
    },
    build: {
      cssCodeSplit: false,
      minify: 'esbuild',
      sourcemap: true,
      assetsDir: TARGET_ENV_CONFIG.VITE_ASSETS_FOLDER,
      rollupOptions: {
        output: {
          entryFileNames: TARGET_ENV_CONFIG.VITE_OUTPUT_FILENAME,
        },
      },
    },
  }
})
