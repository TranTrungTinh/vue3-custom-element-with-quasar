import { defineCustomElement as VueDefineCustomElement, h, createApp, getCurrentInstance } from 'vue'
import { Quasar } from 'quasar'
// Import Quasar css
import quasarStyles from 'quasar/src/css/index.sass'

const linksLoader = (urls) => {
  urls.forEach(url => {
    const link = document.createElement('link');
    link.rel = url.rel
    link.href = url.href;
    document.head.appendChild(link);
  });
}

export const defineCustomElement = (component) => VueDefineCustomElement({
  props: component.props,
  styles: [quasarStyles.replaceAll(':root', ':host'), ...component.styles].map(item => item.replace(/\n/g, '')),
  setup(props, ctx) {
    component.setup(props, ctx)
    const app = createApp(component).use(Quasar)

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
        href: 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons',
      },
    ]);

    const inst = getCurrentInstance()
    Object.assign(inst.appContext, app._context)
    Object.assign(inst.provides, app._context.provides)
    return () => h(component, props)
  },
})