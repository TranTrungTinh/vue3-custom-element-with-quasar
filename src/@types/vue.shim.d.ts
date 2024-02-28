declare module '*.vue' {
  import type { ComponentOptions } from 'vue'

  const Component: ComponentOptions
  export default Component
}

declare interface Filterers {
  currency: (value: number) => number
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $filters: Filterers
  }
}

export { }
