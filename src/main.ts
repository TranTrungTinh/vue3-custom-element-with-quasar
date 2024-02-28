import { createCEApp } from './@core'
import { META } from './configs/app.config'
import { pluginsWrapper } from './plugins'
import RootApp from './RootApp.vue'

import style from '@/styles/app.scss?inline'

const app = createCEApp({
  rootComponent: RootApp,
  cssFrameworkStyles: style,
  elementName: META.appName,
  // disableRemoveStylesOnUnmount: false,
})
app.use(pluginsWrapper)
app.mount(META.appName)
