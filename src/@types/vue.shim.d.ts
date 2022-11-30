declare module '*.vue' {
  import { ComponentOptions } from 'vue'
  const Component: ComponentOptions
  export default Component
}

declare type Filterers = {
  // getDriverStatusColor(status: string): any
  // getIconNotify(type: any): string | undefined
  // getNotifyColor(type: any): string | undefined
  // getTaskStatusLabel: (key: string) => string
  // getTaskStatusColor: (key: string) => string
  // getStatus: (key: string) => string
  // getStatusColor: (key: string) => string
  // getOrderStatusLabel: (key: string) => string
  // getOrderStatusColor: (key: string) => string
  // getTaskActionLabel: (key: string) => string
  // getGoodAttributeLabel: (key: string | unknown) => string
  // toDistance: (value: string | number) => string
  // dateFormat: (value: string | number, patter?: string) => string
  // dateFromNow: (value: string | number, force?: boolean) => string
  // ageNumber: (value: string | number) => string
  // phoneNumber: (value: string | number) => string
  // currencyFormat: (value: string | number | unknown, pattern?: any) => string
  // roundNumber: (value: string | number | unknown) => string
  // getRoleLabel: (key: string) => string
  // getGenderLabel: (value: string | number | unknown) => string
  // getRoleColor: (key: string) => string
  // getTagLabel: (value: string | number | unknown) => string
  // getTagIcon: (key: string) => string
  // escape: (value: string | number, defaultData?: string | number) => string
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $filters: Filterers
  }
}

export {}
