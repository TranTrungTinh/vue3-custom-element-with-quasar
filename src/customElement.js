import { defineCustomElement as VueDefineCustomElement, h, createApp, getCurrentInstance } from 'vue'
import { Quasar } from 'quasar'
import Toast from "vue-toastification"

//TODO: Import lib css
import quasarStyles from 'quasar/src/css/index.sass'
import toastStyles from "vue-toastification/dist/index.css"

import { linksLoader, styleLoader, modifyRoot, asyncGetContainer } from '@/utils/build'

export const defineCustomElement = (component) => VueDefineCustomElement({
  props: component.props,
  styles: styleLoader(
    modifyRoot(quasarStyles),
    toastStyles,
    ...component.styles
  ),
  setup(props, ctx) {
    // *: Attach link loaders
    linksLoader([
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;300;400;500;700;900&display=swap',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Material+Icons',
      }
    ]);

    // ?: Make sure instance founded
    const inst = getCurrentInstance()
    
    // ?: modifier instance with plugins
    const app = createApp(component)
      .use(Quasar)
      .use(Toast, {
        container: asyncGetContainer
      })

    // *: dependecies injection
    if (inst) {
      component.setup(props, ctx)
      Object.assign(inst.appContext, app._context)
      Object.assign(inst.provides, app._context.provides)
    }

    return () => h(component, props)
  }
})