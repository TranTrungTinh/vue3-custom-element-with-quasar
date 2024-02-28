import { createApp, defineCustomElement, getCurrentInstance, h } from 'vue'
import type { App, Component, ComponentInternalInstance } from 'vue'

import {
  convertToOnEventName,
  cssCompiler,
  styleLoader,
} from './build'

export type Data = Record<string, unknown> | null

export type PluginOption = Record<any, any>

export interface TPlugins {
  install: (app: App) => void
}

export type instanceProvides = ComponentInternalInstance & { provides: Record<any, any> }

export type TComponent = Component & {
  props?: Record<string, any>
  emits?: string[]
  styles?: string[]
  namedSlots?: string[]
  provide?: () => AnyObject | AnyObject
}

export interface TCreateCEApp {
  rootComponent: TComponent
  cssFrameworkStyles: string
  elementName: string
}
// TODO: support ssr ？
export function createCEApp({
  rootComponent,
  cssFrameworkStyles,
  elementName,
}: TCreateCEApp) {
  const app: App = createApp(rootComponent)
  const rootCEComponent = () => defineCustomElement({
    styles: [styleLoader(cssFrameworkStyles).join('')],
    props: {
      ...rootComponent.props,
      modelValue: { type: [String, Number, Boolean, Array, Object] }, // v-model support
    },
    emits: rootComponent?.emits,
    setup(props) {
      const emitsList = [...(rootComponent?.emits || []), 'update:modelValue']
      // app.component('AppRoot', rootComponent)

      if (rootComponent.provide) {
        const provide = typeof rootComponent.provide === 'function'
          ? rootComponent.provide()
          : rootComponent.provide
        // Setup provide
        Object.keys(provide).forEach((key) => {
          app.provide(key, provide[key])
        })
      }

      const inst = getCurrentInstance()
      inst && Object.assign(inst.appContext, app._context)
      inst && Object.assign((inst as instanceProvides).provides, app._context.provides)

      // Add support for Vue Devtools
      if (process.env.NODE_ENV === 'development' && (window as any).__VUE_DEVTOOLS_GLOBAL_HOOK__) {
        const root = document.querySelector(elementName)
        app._container = root
        app._instance = inst

        const types = {
          Comment: Symbol('v-cmt'),
          Fragment: Symbol('v-fgt'),
          Static: Symbol('v-stc'),
          Text: Symbol('v-txt'),
        };

        (window as any).__VUE_DEVTOOLS_GLOBAL_HOOK__.emit('app:init', app, app.version, types);
        (window as any).__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app
      }

      // ? Forward all emitted events to the custom element
      const eventListeners = emitsList?.reduce((acc, eventName) => {
        const onEventName = convertToOnEventName(eventName)
        acc[onEventName] = (e: AnyObject) => inst?.emit(eventName, e)
        return acc
      }, {})

      // ? Establish named slots
      const namedSlots = rootComponent?.namedSlots?.reduce((acc: AnyObject, slotsName) => {
        acc[slotsName] = () => h('slot', { name: slotsName })
        return acc
      }, {})

      return () => h(
        rootComponent,
        {
          ...props,
          ...eventListeners,
        },
        {
          default: () => h('slot'),
          ...namedSlots,
        },
      )
    },
  })

  const mount = (ceName: string) => {
    customElements.define(ceName, rootCEComponent())
  }

  return {
    ...app,
    mount,
  }
}
