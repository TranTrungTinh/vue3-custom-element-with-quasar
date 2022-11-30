import {
  defineCustomElement as VueDefineCustomElement,
  h,
  createApp,
  getCurrentInstance,
} from 'vue'
//TODO: Import lib css
import quasarStyles from 'quasar/src/css/index.sass'
import appStyles from '@/styles/index.scss'
import unoStyles from 'uno.css'
import unoResetStyles from '@unocss/reset/tailwind.css'
import { INITIAL_LINKS } from '@/configs/app.config'

import {
  linksLoader,
  styleLoader,
  modifyRoot,
  // asyncGetContainer,
  cssCompiler,
  createEventProxies,
} from './build'

export const defineCustomElement = (component) => {
  const modules = import.meta.glob<any>('/src/modules/*.ts', { eager: true })

  // *: Attach link loaders
  linksLoader(INITIAL_LINKS)

  // *: register Service Worker
  // registerSW();
  return VueDefineCustomElement({
    props: component.props,
    setup(props, ctx) {
      const cssText = styleLoader(
        modifyRoot(quasarStyles),
        unoStyles,
        unoResetStyles,
        appStyles.toString()
      )

      // !: Enhancer CSS with custom compiler
      cssCompiler(cssText)

      // *: Create Event Proxies
      const _props = createEventProxies(component)

      // ?: Make sure instance founded
      const inst: AnyObject = getCurrentInstance() || {}

      const app = createApp(component)

      // install all modules under `modules/`
      Object.values(modules).forEach((module) => module.install?.(app))

      // *: dependencies injection
      Object.assign(inst.appContext, app._context)
      Object.assign(inst.provides, app._context.provides)

      // TODO: Execute exposed please use this
      // component.setup(props, ctx)
      return () => h(component, { ...props, ..._props, ...ctx })
    },
  })
}
