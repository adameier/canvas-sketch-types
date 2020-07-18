// Type definitions for canvas-sketch 0.7.3
// Project: https://github.com/mattdesl/canvas-sketch
// Definitions by: Adam Meier <https://github.com/adameier/>

import p5 from "p5";

export as namespace canvasSketch;

export = canvasSketch;

declare function canvasSketch(
  sketch: canvasSketch.Sketch,
  settings: canvasSketch.CanvasSketchSettings
): Promise<SketchManager>;

interface canvasSketch {
  canvasSketch: canvasSketch;
  PaperSizes: canvasSketch.PaperSizes;
}

declare namespace canvasSketch {
  type Sketch =
    | ((props: CanvasSketchProps) => RenderResult)
    | {
        begin?: (props: CanvasSketchProps) => void;
        beginRecord?: (props: CanvasSketchProps) => void;
        end?: (props: CanvasSketchProps) => void;
        endRecord?: (props: CanvasSketchProps) => void;
        preExport?: () => void;
        postExport?: () => void;
        render?: (props: CanvasSketchProps) => RenderResult;
        resize?: (props: CanvasSketchProps) => void;
        tick?: (props: CanvasSketchProps) => void;
        unload?: (props: CanvasSketchProps) => void;
      };

  type CreateSketch = (props: CanvasSketchProps) => Sketch;

  interface CanvasSketchSettings {
    animate?: boolean;
    attributes?: {
      width?: number;
      height?: number;
      alpha?: boolean;
      depth?: boolean;
      stencil?: boolean;
      antialias?: boolean;
      premultipliedAlpha?: boolean;
      preserveDrawingBuffer?: boolean;
      perPixelLighting?: boolean;
    };
    bleed?: number;
    canvas?: HTMLCanvasElement;
    context?: "2d" | "webgl";
    data?: any;
    dimensions?: string | [number, number];
    duration?: number;
    encoding?: string;
    encodingQuality?: number;
    exportPixelRatio?: number;
    file?: string | Function;
    flush?: boolean;
    fps?: number;
    frame?: number;
    hotkeys?: boolean;
    id?: string;
    loop?: boolean;
    maxPixelRatio?: number;
    name?: string;
    orientation?: "landscape";
    p5?: boolean | p5;
    parent?: Node;
    pixelated?: boolean;
    pixelsPerInch?: number;
    pixelRatio?: number;
    playbackRate?: "fixed" | "throttle";
    playing?: boolean;
    prefix?: string;
    resizeCanvas?: boolean;
    scaleContext?: boolean;
    scaleToFit?: boolean;
    scaleToFitPadding?: number;
    scaleToView?: boolean;
    styleCanvas?: boolean;
    suffix?: string;
    time?: number;
    timeScale?: number;
    totalFrames?: number;
    units?: UnitType;
  }

  interface TimeProps {
    playhead: number;
    time: number;
    frame: number;
    duration: number;
    totalFrames: number;
    fps: number;
    timeScale: number;
  }

  interface SizeProps {
    width: number;
    height: number;
    pixelRatio: number;
    canvasWidth: number;
    canvasHeight: number;
    viewportWidth: number;
    viewportHeight: number;
  }

  interface CanvasSketchProps {
    playhead: number;
    time: number;
    frame: number;
    duration: number;
    totalFrames: number;
    fps: number;
    timeScale: number;
    canvas: HTMLCanvasElement;
    context: RenderingContext;
    gl?: WebGLRenderingContext;
    deltaTime: number;
    started: boolean;
    exporting: boolean;
    playing: boolean;
    recording: boolean;
    settings: CanvasSketchSettings;
    data: any;
    bleed: number;
    pixelRatio: number;
    width: number;
    height: number;
    dimensions: [number, number];
    units: UnitType;
    scaleX: number;
    scaleY: number;
    pixelsPerInch: number;
    viewportWidth: number;
    viewportHeight: number;
    canvasWidth: number;
    canvasHeight: number;
    trimWidth: number;
    trimHeight: number;
    styleWidth: number;
    styleHeight: number;
    render: () => RenderResult;
    togglePlay: () => void;
    dispatch: (cb: CanvasSketchCallback) => void;
    tick: () => void;
    resize: () => boolean;
    update: (opt?: CanvasSketchSettings) => void;
    exportFrame: (opt?: ExportFrameOpt) => Promise<FrameExport | FrameExport[]>;
    record: () => void;
    play: () => void;
    pause: () => void;
    stop: () => void;
  }

  type CanvasSketchCallback = (props: CanvasSketchProps) => void;

  interface ExportFrameOpt {
    commit?: boolean;
    sequence?: boolean;
    save?: boolean;
    timeStamp?: string;
  }

  interface ExportOptions {
    sequence?: boolean;
    save?: boolean;
    fps: number;
    frame?: number;
    file?: string | Function;
    name?: string;
    prefix?: string;
    suffix?: string;
    encoding?: string;
    encodingQuality?: number;
    timeStamp: string;
    totalFrames: number;
  }

  interface DoExportFrameOpts extends Partial<ExportOptions> {
    hash?: string;
  }

  type FrameExport = {
    sequence?: boolean;
    fps?: number;
    frame?: number;
    file?: string | Function;
    name?: string;
    prefix: string;
    suffix: string;
    timeStamp?: string;
    totalFrames?: number;
    extension: string;
    data?: HTMLCanvasElement | object;
    dataURL?: string;
    type?: string;
    layer: number;
    totalLayers: number;
  } & SaveResult;

  type SaveResult =
    | { save: false }
    | ({
        save: true;
        filename: string;
        client: boolean;
      } & (
        | {}
        | {
            stream: boolean;
            outputName: string;
          }
      ));

  type RenderResult = Array<
    | { data?: HTMLCanvasElement | object; dataURL?: string }
    | HTMLCanvasElement
    | undefined
  > | void;

  type PaperSizes = Record<string, PaperSize | undefined>;
}

interface PaperSize {
  dimensions: [number, number];
  units: "mm" | "in";
}

type UnitType = "mm" | "cm" | "m" | "pc" | "pt" | "in" | "ft" | "px";

declare class SketchManager {
  constructor();

  _settings: canvasSketch.CanvasSketchSettings;

  _props: {} | canvasSketch.CanvasSketchProps;

  _sketch?: canvasSketch.Sketch;

  _raf: number | null;

  _recordTimeout: number | null;

  _lastDrawResult: canvasSketch.RenderResult;

  _isP5Resizing: boolean;

  _keyboardShortcuts: {
    attach: () => void;
    detach: () => void;
  };

  _animateHandler: () => void;

  _resizeHandler: () => void;

  get sketch(): canvasSketch.Sketch | undefined;

  get settings(): canvasSketch.CanvasSketchSettings;

  get props(): {} | canvasSketch.CanvasSketchProps;

  _computePlayhead(time: number, duration: number): number;

  _computeFrame(
    playhead: number,
    time: number,
    totalFrames: number,
    fps: number
  ): number;

  _computeCurrentFrame(): number;

  _getSizeProps(): canvasSketch.SizeProps;

  run(): this;

  _cancelTimeouts(): void;

  play(): void;

  pause(): void;

  togglePlay(): void;

  stop(): void;

  record(): void;

  _signalBegin(): void;

  _signalEnd(): void;

  endRecord(): Promise<void>;

  _createExportOptions(
    opt?: canvasSketch.ExportFrameOpt
  ): canvasSketch.ExportOptions;

  exportFrame(
    opt?: canvasSketch.ExportFrameOpt
  ): Promise<canvasSketch.FrameExport | canvasSketch.FrameExport[]>;

  _doExportFrame(
    exportOpts?: canvasSketch.DoExportFrameOpts
  ): Promise<canvasSketch.FrameExport[]>;

  _wrapContextScale(cb: canvasSketch.CanvasSketchCallback): void;

  _preRender(): void;

  _postRender(): void;

  tick(): void;

  render(): canvasSketch.RenderResult;

  submitDrawCall(): canvasSketch.RenderResult;

  update(
    opt?: canvasSketch.CanvasSketchSettings
  ): canvasSketch.CanvasSketchProps;

  resize(): boolean;

  _sizeChanged(): void;

  animate(): void;

  dispatch(cb: canvasSketch.CanvasSketchCallback): void;

  mount(): void;

  unmount(): void;

  _appendCanvasIfNeeded(): void;

  _setupGLKey(): void;

  getTimeProps(
    settings?: canvasSketch.CanvasSketchSettings
  ): canvasSketch.TimeProps;

  setup(settings?: canvasSketch.CanvasSketchSettings): void;

  loadAndRun(
    canvasSketch: canvasSketch.CreateSketch,
    newSettings?: canvasSketch.CanvasSketchSettings
  ): Promise<this>;

  unload(): void;

  destroy(): void;

  load(
    createSketch: canvasSketch.CreateSketch,
    newSettings?: canvasSketch.CanvasSketchSettings
  ): Promise<this>;
}
