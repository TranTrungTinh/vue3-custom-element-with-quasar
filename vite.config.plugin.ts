import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import viteCompression from 'vite-plugin-compression'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Unocss from 'unocss/vite'
import { viteVueCESubStyle } from '@unplugin-vue-ce/sub-style'
import { presetUno } from 'unocss'
import { QuasarResolver } from 'unplugin-vue-components/resolvers'

export function pluginsWrapper() {
  return [
    vue({
      customElement: true,
      template: {
        transformAssetUrls,
        compilerOptions: {
          whitespace: 'preserve',
        },
      },
    }),
    viteVueCESubStyle({ isESCSS: true }) as PluginOption,
    quasar({
      sassVariables: 'src/styles/variables.scss',
    }),
    viteCompression({
      algorithm: 'brotliCompress',
      filter: /\.(js|map)$/i,
    }),
    AutoImport({
      imports: ['vue', '@vueuse/core', 'pinia', 'quasar'],
      dts: './src/@types/auto-imports.d.ts',
      dirs: ['./src/components/*', './src/hooks/*', './src/stores/*'],
      eslintrc: {
        enabled: true,
        globalsPropValue: true,
      },
      vueTemplate: true,
      resolvers: [QuasarResolver()],
    }),
    Components({
      dirs: ['./src/components'],
      extensions: ['vue', 'ts'],
      dts: './src/@types/components.d.ts',
      directoryAsNamespace: true,
      resolvers: [QuasarResolver()],
    }),
    Unocss({
      mode: 'shadow-dom',
      presets: [presetUno()],
      theme: {
        colors: {
          brand: {
            primary: 'hsl(var(--hue, 217) 78% 51%)', // class="bg-brand-primary"
          },
        },
      },
    }),
  ]
}
