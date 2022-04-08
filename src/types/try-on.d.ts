declare namespace THREE {
  class Vector4 {
    constructor(r: number, g: number, b: number, a: number);
  }
}

declare class Utility {
  static loadTextureAsync(zipUrl: string): Promise<any>;
}

declare type FilterOption = {
  tex?: any;
  color?: any;
  reflection?: number;
  brightness?: number;
  contrast?: number;
  saturation?: number;
};

declare type FaceInfo = {
  faceDirection: { x: number; y: number; z: number };
  facePosition: { x: number; y: number };
  faceSize: number;
};

declare class GlassesModel {
  model: any;
  modelDef: any;
  setLensesFilter(option: FilterOption);
  realsizeScale(realLensSize: number, realFaceSize: number);
  autoScale();
}

declare class TryOnView {
  currentGlasses: GlassesModel;

  constructor(canvasId: string, shadowRoot: Node);

  start(): Promise<void>;
  stop();
  tryGlasses(zipUrl: string, glassesType: string): Promise<void>;
  refresh();
  getFaceInfo(): FaceInfo;
  estimateFaceSize(): Promise<number>;

  startRecord(callback: any);
  stopRecord();
  isRecording();
  playFrame(frame: any, metaInfo: any);
  resumeRealTimeTryon();
}

declare class GlassesView extends TryOnView {
  constructor(canvasId: string, shadowRoot: Node);
}

declare class AccTimer {
  constructor(interval: number);

  run(callback: any);
  stop();
  loop(callback: any);
}

declare class Hammer {
  constructor(el: HTMLElement);

  on(event: string, callback: any);
}

declare class Swal {
  static showLoading: any;
  static getHtmlContainer: any;
  static getTimerLeft: any;
  static fire(arg0: any);
}
