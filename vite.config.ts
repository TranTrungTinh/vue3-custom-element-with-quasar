/**
 * @file vite config
 * @module vite.config
 * @author Tinh
 * ? https://vitejs.dev/config/
 */
import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import { pluginsWrapper } from './vite.config.plugin'
import packageJson from './package.json'

export default defineConfig(({ mode }) => {
  const CWD = process.cwd()
  const TARGET_ENV_CONFIG = loadEnv(mode, CWD)
  return {
    root: path.resolve(__dirname),
    base: TARGET_ENV_CONFIG.VITE_CDN_URL,
    define: {
      __APP_ENV__: JSON.stringify(packageJson.version),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    plugins: pluginsWrapper(),
    build: {
      cssCodeSplit: false,
      assetsDir: TARGET_ENV_CONFIG.VITE_ASSETS_FOLDER,
      rollupOptions: {
        output: {
          entryFileNames: TARGET_ENV_CONFIG.VITE_OUTPUT_FILENAME,
        },
      },
    },
  }
})
