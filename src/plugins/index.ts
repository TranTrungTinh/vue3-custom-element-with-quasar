import type { App } from 'vue'
import { createPinia } from 'pinia'
import { Dialog, Loading, Quasar } from 'quasar'

export const pluginsWrapper = {
  install(Vue: App) {
    // * Pinia
    const pinia = createPinia()
    Vue.use(pinia)

    // * Quasar
    Vue.use(Quasar, {
      plugins: { Dialog, Loading },
    })

    // * Directive
    Vue.directive('hoist', (el) => {
      if (el.tagName === 'TEMPLATE')
        el.replaceWith(el.content)

      else
        el.replaceWith(...el.children)
    })
  },
}
