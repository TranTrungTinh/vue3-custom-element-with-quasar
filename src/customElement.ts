import {
  defineCustomElement as VueDefineCustomElement,
  h,
  createApp,
  getCurrentInstance,
} from "vue";
import { Quasar } from "quasar";
import { createPinia } from "pinia";
import { VueQueryPlugin } from "vue-query";
import Toast from "vue-toastification";
import { INITIAL_LINKS } from "@/configs/app.config";

//TODO: Import lib css
import quasarStyles from "quasar/src/css/index.sass";
import toastStyles from "vue-toastification/dist/index.css";
import dialogStyles from "gitart-vue-dialog/dist/style.css";
import {
  linksLoader,
  styleLoader,
  modifyRoot,
  asyncGetContainer,
  cssCompiler
} from "@/utils/build";

export const defineCustomElement = (component) =>
  VueDefineCustomElement({
    props: component.props,
    setup(props) {
      // *: Attach link loaders
      linksLoader(INITIAL_LINKS);

      // ?: Make sure instance founded
      const inst: AnyObject = getCurrentInstance() || {};
      
      const cssText = styleLoader(
        modifyRoot(quasarStyles),
        toastStyles,
        dialogStyles,
        ...component.styles
      ).join('')

      // !: Enhancer CSS with custom compiler
      cssCompiler(cssText)

      // ?: modifier instance with plugins
      const app = createApp(component)
        .use(createPinia())
        .use(VueQueryPlugin)
        .use(Quasar)
        .use(Toast, {
          container: asyncGetContainer,
        });

      // *: dependecies injection
      if (inst) {
        // component.setup(props, ctx)
        Object.assign(inst.appContext, app._context);
        Object.assign(inst.provides, app._context.provides);
      }

      return () => h(component, props);
    },
  });
