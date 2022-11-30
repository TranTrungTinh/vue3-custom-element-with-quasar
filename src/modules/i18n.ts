/**
 * use vue-i18n-next and  vite-plugin-vue-i18n
 * https://github.com/intlify/bundle-tools/tree/main/packages/vite-plugin-vue-i18n
 * https://github.com/intlify/bundle-tools/tree/main/packages/vite-plugin-vue-i18n
 */
import { App } from 'vue'
import { createI18n } from 'vue-i18n'
import jsYaml from 'js-yaml'
const locales = import.meta.glob('/src/locales/*.yml', { eager: true, as: 'raw' })

const messages = Object.fromEntries(
  Object.entries(locales).map(([key, value]) => {
    const mes = [jsYaml.load(value)].reduce((pre, cur) => {
      return { ...pre, ...cur }
    }, {})
    return [key.slice(13, -4), mes]
  })
)

export const install = (app: App) => {
  const i18n = createI18n({
    fallbackLocale: 'en',
    locale: 'en',
    messages,
  })
  app.use(i18n)
}
