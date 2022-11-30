/**
 * @file main App
 * @module app.main
 */

import { defineCustomElement } from '@/core'
import { META } from '@/configs/app.config'
import TheRoot from '@/layouts/index.vue'
customElements.define(META.appName, defineCustomElement(TheRoot))
