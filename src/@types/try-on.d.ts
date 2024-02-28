declare namespace THREE {
  class Vector4 {
    constructor(r: number, g: number, b: number, a: number)
  }
}

declare class Utility {
  static loadImage(imgPath: string): Promise<HTMLImageElement>
  static loadTextureAsync(zipUrl: string): Promise<any>
  static getBestDPIForCanvas(canvas: HTMLCanvasElement): number
  static updateCanvasDPI(canvas: HTMLCanvasElement, dpi: number)
}

declare interface FilterOption {
  texture?: any
  color?: any
  reflection?: number | string
  brightness?: number | string
  contrast?: number | string
  saturation?: number | string
  sceneLens?: boolean
}

declare class GlassesModel {
  model: any
  modelDef: any

  getFilter(part: string)
  setFilter(part: string, option: FilterOption)
  setLensesFilter(option: FilterOption)
  switchPart(key: string, value: any)
  openGlasses()
  closeGlasses()
}

declare class FaceInfo {
  facePosition: any
  faceSize: any
  faceDirection: any
}

declare class TryOnView {
  currentGlasses: GlassesModel
  rootObject: any

  constructor(canvasId: string, shadowRoot: Node | null = null, videoId?: string)

  start(): Promise<void>
  stop()
  tryGlasses(zipUrl: string, glassesType: string): Promise<void>
  refresh()
  snapshot(hideARGlasses = false): HTMLImageElement
  multyGlassSnapshot(): Promise<HTMLCanvasElement>
  zoomIn(number = 0)
  zoomOut(number = 0)
  autoZoom(model: any, glassesType: string)
  rotateCenter(rx: number, ry: number, rz: number)
  switchVideoSource()
  turnOnFaceSelection()
  getFaceInfo(): FaceInfo
  setAuto360(seconds = 0)
  enableGlassRemoval(turnOn = false)
  enableLovotTryon(turnOn = false): Promise<void>
  glassOnImage(image: HTMLImageElement): Promise<HTMLCanvasElement>
}

declare class GlassesView extends TryOnView {
  constructor(canvasId: string, shadowRoot: Node | null = null)
}
