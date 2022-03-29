import { defineCustomElement as VueDefineCustomElement, h, createApp, getCurrentInstance } from 'vue'
import { Quasar } from 'quasar'

//TODO: Import Quasar css
import quasarStyles from 'quasar/src/css/index.sass'
import Toast from "vue-toastification";
import toastStyles from "vue-toastification/dist/index.css";
import { minify } from './utils/strings'

const linksLoader = (urls) => {
  urls.forEach(url => {
    const link = document.createElement('link');
    link.rel = url.rel
    link.href = url.href;
    document.head.appendChild(link);
  });
}

function asyncGetContainer() {
  return new Promise(resolve => {
    const observer = new MutationObserver(function(mutations, me) {
      const myContainer = document.querySelector('glasson-helloo').shadowRoot.querySelector('body')
      if (myContainer) {
        me.disconnect();
        resolve(myContainer);
      }
    });
    observer.observe(document, {
      childList: true,
      subtree: true
    });
  });
}

export const defineCustomElement = (component) => VueDefineCustomElement({
  props: component.props,
  styles: [quasarStyles.replaceAll(':root', ':host'), toastStyles, ...component.styles].map(minify),
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
        href: 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons',
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