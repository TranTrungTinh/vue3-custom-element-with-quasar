// * Define type in here
declare type FavoritesList = InputVariantType[]
declare type SupportedLang = 'ja' | 'en' | 'vi'
declare const __APP_VERSION__: string

declare interface InputVariantType {
  modelName?: string
  frameColor?: string
  templeColor?: string
  lensColor?: string
  lensOptions?: string[]
  logoFrontColor?: string
  logoBackColor?: string
  bridgeName?: string
  thumbnailUrl?: string
}

declare interface ConfigurationType {
  model?: ModelNameType
  frame?: FrameColorType
  temple?: TempleColorType
  len?: LensColorType | AnyObject
  bridge?: BridgeNameType
  logoFrontColor?: string
  logoFrontInfo?: LogoOptionType[]
  logoBackColor?: string
  logoBackInfo?: LogoOptionType[]
  lensOptions?: string[]
  lensOptionsInfo?: LensOptionType[]
  thumbnailUrl?: string
}

declare type AnyObject = Record<string, any>

declare interface CommonObject {
  key: string
  value: string
}

declare type TRenderMode = 'try_on' | 'view_360'
declare type TLayoutViewMode = 'default' | 'product_list' | 'cart'

declare type ArrayOrNot<T> = T | Array<T>

declare interface GlassOnResult<T = any> {
  status: GlassOnResponseStatus.Success
  message: string
  result: T
}

declare interface DefinitionsType {
  bridgeName: BridgeNameType[]
  frameColor: FrameColorType[]
  lensColor: LensColorType[]
  lensOptions: LensOptionType[]
  logoBackColor: LogoOptionType[]
  logoFrontColor: LogoOptionType[]
  modelName: ModelNameType[]
  templeColor: TempleColorType[]
}

declare interface ModelNameType {
  description: string
  extraParts: { key: string; value: string }[]
  modelUrl: string
  gtmKey?: string
  url?: string
  value: string
  type: string
  name: string
  uiLabel?: string
  uiThumbnail?: string
  logoEnabled?: string
  isOnSale?: boolean
  isOnDev?: boolean
  isPreparation?: boolean
  isForChild?: boolean
}

declare interface FrameColorType {
  brightness: string
  color: string
  photo: string
  contrast: string
  description: string
  reflection: string
  saturation: string
  transparent: string
  value: string
  type: string
  name: string
  renderColor?: string
  frameCoreTransparent?: string
  frameCoreColor?: string
  label?: string
  uiColor?: string
  uiLabel?: string
  gtmKey?: string
}

declare interface LensColorType {
  brightness: string
  color?: string
  contrast: string
  description: string
  reflection: string
  saturation: string
  transparent: string
  uiMirror: string
  value: string
  type: string
  name: string
  renderColor?: string
  label?: string
  filtered?: string
  photo: string
  uiColor?: string
  uiLabel?: string
  gtmKey?: string
}

declare interface LensOptionType {
  key: string
  description: string
  value: string
  type: string
  name: string
  gtmKey?: string
}

declare interface BridgeType {
  key: string
  value: string
  type: string
  name: string
  photo: string
}

declare interface TempleColorType {
  brightness: string
  color: string
  contrast: string
  description: string
  reflection: string
  saturation: string
  transparent: string
  value: string
  type: string
  name: string
  renderColor?: string
  label?: string
  uiColor?: string
  uiLabel?: string
  gtmKey?: string
}

declare interface LogoType {
  logoFrontColor: string
  logoBackColor: string
}

declare interface LogoOptionType {
  description: string
  value: string
  type: string
  name: string
}

declare interface BridgeNameType {
  description: string
  extraParts: { key: string; value: string }[]
  value: string
  type: string
  name: string
}
