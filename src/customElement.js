import { createApp, reactive, h } from 'vue'
import { Quasar } from 'quasar'
import { createPinia } from 'pinia'
import App from '@/App.vue'

import quasarStyles from 'quasar/src/css/index.sass'
import { linksLoader, styleLoader, modifyRoot, cssCompiler } from '@/utils/build'

const createCustomEvent = (name, args = []) => {
  return new CustomEvent(name, {
    bubbles: false,
    composed: true,
    cancelable: false,
    detail: !args.length
      ? self
      : args.length === 1
      ? args[0]
      : args
  });
};

class VueCustomComponent extends HTMLElement {
  constructor() {
    super()
    this._numberProps = [];
    this._props = reactive({})
    this._def = App;
    this.initial()
  }

  //TODO: Initialize the component
  initial () {
    const shadow = this.attachShadow({ mode: 'open' })
    this.createApp(shadow);

    const cssText = styleLoader(
      ...App.styles,
      modifyRoot(quasarStyles)
    )
    cssCompiler(cssText)
  }
  
  //TODO: Helper function to set the props based on the element's attributes (for primitive values) or properties (for arrays & objects)
  setAttr(attrName) {
    let val = this[attrName] || this.getAttribute(attrName);

    if (val !== undefined && this._numberProps.includes(attrName)) {
      val = Number(val);
    }

    this._props[attrName] = val;
  }
  
  //TODO: Mutation observer to handle attribute changes, basically two-way binding
  connectObserver() {
    return new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === "attributes") {
          const attrName = mutation.attributeName
          this.setAttr(attrName);
        }
      });
    });
  }
  
  //TODO: Make emits available at the parent element
  createEventProxies() {
    const eventNames = this._def.emits

    if (eventNames) {
      eventNames.forEach(evName => {
        const handlerName = `on${evName[0].toUpperCase()}${evName.substring(1)}`;

        this._props[handlerName] = (...args) => {
          this.dispatchEvent(createCustomEvent(evName, args));
        };
      });
    }
  }
  
  //TODO: Create the application instance and render the component
  createApp(shadow) {
    const self = this;

    const app = createApp({
      render() {
        return h(self._def, self._props)
      }
    })
      .use(Quasar)
      .use(createPinia())
      //* USE ANYTHING YOU NEED HERE

    app.mount(shadow);
  }
  
  //TODO: Handle element being inserted into DOM
  connectedCallback() {
    const componentProps = Object.entries(App.props);
    componentProps.forEach(([propName, propDetail]) => {
      if (propDetail.type === Number) {
        this._numberProps.push(propName);
      }

      this.setAttr(propName);
    });

    this.createEventProxies();
    this.connectObserver().observe(this, { attributes: true });
  }
}

//TODO: Register as custom element
export const defineCustomElement = () => {
  // ! Inject link
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
  return VueCustomComponent
}