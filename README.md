[defineCustomElement]: https://v3.vuejs.org/guide/web-components.html#definecustomelement
[custom element]: https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements
[demo]: https://vue-custom-element-example.netlify.app

# Vue 3 + Vite Custom Elements with Plugins

This package is an example on how to package a [custom element] by using the [`defineCustomElement`][defineCustomElement] API in Vue 3.

In this case, the `vue ^3.2`, `vite ^2.8` and `quasar ^2.6` dependencies are externalized to
reduce the package size and ensure it uses the same versions as in the host app.

## Demo 🚀

[Visit the live demo][demo] to see the custom element in action.

## Development 👨‍💻

- <kbd>yarn dev</kbd>: start the Vite.js build process in `watch` mode

## Publish 📦

- <kbd>yarn build</kbd>: build the package
- <kbd>yarn serve</kbd>: preview the package