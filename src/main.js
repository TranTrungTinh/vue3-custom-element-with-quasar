import { defineCustomElement } from './customElement'
import App from './App.vue'
customElements.define('glasson-helloo', defineCustomElement(App))
