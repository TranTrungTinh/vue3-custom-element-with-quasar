import { defineCustomElement } from './customElement'
import appConfig from '@/configs/app.config'
customElements.define(appConfig.appName, defineCustomElement())
