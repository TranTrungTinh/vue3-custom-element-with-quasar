import { defineCustomElement } from './customElement'
import appConfig from '@/configs/app.config'
import App from './App.vue'
customElements.define(appConfig.appName, defineCustomElement(App))
