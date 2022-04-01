/**
 * @file main App
 * @module app.main
 */

import { defineCustomElement } from "./customElement";
import { META } from "@/configs/app.config";
import App from "./App.vue";
customElements.define(META.appName, defineCustomElement(App));
