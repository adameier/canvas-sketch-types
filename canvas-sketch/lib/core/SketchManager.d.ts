import { ManageKeyboardShortcuts } from "./keyboardShortcuts";
import { SaveResult } from "../save";
import {
  UnitType,
  CanvasSizeProps,
  CanvasResizeSettings,
} from "./resizeCanvas";
import p5 from "p5";
import {
  CreateCanvasSettings,
  CreateWebGLCanvasSettings,
  Create2DCanvasSettings,
} from "./createCanvas";

export default SketchManager;

declare class SketchManager<Settings extends CanvasSketchSettings> {
  constructor();

  _settings: CanvasSketchSettings<SettingsData<Settings>>;

  _props: CanvasSketchProps<Settings>;

  _sketch?: Sketch<Settings>;

  _raf: number | null;

  _recordTimeout: number | null;

  _lastDrawResult: RenderResult;

  _isP5Resizing: boolean;

  _keyboardShortcuts: ManageKeyboardShortcuts;

  _animateHandler: () => void;

  _resizeHandler: () => void;

  get sketch(): Sketch<Settings> | undefined;

  get settings(): CanvasSketchSettings<SettingsData<Settings>>;

  get props(): CanvasSketchProps<Settings>;

  _computePlayhead(time: number, duration: number): number;

  _computeFrame(
    playhead: number,
    time: number,
    totalFrames: number,
    fps: number
  ): number;

  _computeCurrentFrame(): number;

  _getSizeProps(): SizeProps;

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

  _createExportOptions(opt?: ExportFrameOpt): ExportOptions;

  exportFrame(opt?: ExportFrameOpt): Promise<FrameExport | FrameExport[]>;

  _doExportFrame(exportOpts?: DoExportFrameOpts): Promise<FrameExport[]>;

  _wrapContextScale(
    cb: CanvasSketchCallback<CanvasSketchSettings<SettingsData<Settings>>>
  ): void;

  _preRender(): void;

  _postRender(): void;

  tick(): void;

  render(): RenderResult;

  submitDrawCall(): RenderResult;

  update<NewSettings extends CanvasSketchSettings<SettingsData<Settings>>>(
    opt?: NewSettings
  ): CanvasSketchProps<NewSettings>;

  resize(): boolean;

  _sizeChanged(): void;

  animate(): void;

  dispatch(cb: CanvasSketchCallback<Settings>): void;

  mount(): void;

  unmount(): void;

  _appendCanvasIfNeeded(): void;

  _setupGLKey(): void;

  getTimeProps(settings?: GetTimePropsSettings): TimeProps;

  setup(settings?: Settings): void;

  loadAndRun<
    NewSettings extends CanvasSketchSettings = DefaultCanvasSketchSettings
  >(
    createSketch: CreateSketch<NewSettings>,
    newSettings?: NewSettings
  ): Promise<SketchManager<NewSettings>>;

  unload(): void;

  destroy(): void;

  load<NewSettings extends CanvasSketchSettings = DefaultCanvasSketchSettings>(
    createSketch: CreateSketch<NewSettings>,
    newSettings?: NewSettings
  ): Promise<SketchManager<NewSettings>>;
}

type BaseSettings<D> = {
  animate?: boolean;
  duration?: number;
  encoding?: string;
  encodingQuality?: number;
  file?: string | Function;
  flush?: boolean;
  fps?: number;
  frame?: number;
  hotkeys?: boolean;
  id?: string;
  loop?: boolean;
  name?: string;
  p5?: boolean;
  playbackRate?: "fixed" | "throttle";
  playing?: boolean;
  prefix?: string;
  resizeCanvas?: boolean;
  scaleContext?: boolean;
  scaleToView?: boolean;
  styleCanvas?: boolean;
  suffix?: string;
  time?: number;
  timeScale?: number;
  totalFrames?: number;
} & CanvasResizeSettings &
  ({} | { data: D });

export declare type CanvasSketchSettings<D = any> = CreateCanvasSettings &
  BaseSettings<D>;

export declare type DefaultCanvasSketchSettings = Create2DCanvasSettings &
  BaseSettings<never>;

export declare type SettingsData<
  Settings extends CanvasSketchSettings<any>
> = Settings extends { data: infer D }
  ? D
  : Settings extends { data?: infer D }
  ? D | undefined
  : undefined;

export declare interface CanvasSketchProps<
  Settings extends CanvasSketchSettings
> extends TimeProps, CanvasSizeProps {
  canvas: HTMLCanvasElement;
  context: Settings extends CreateWebGLCanvasSettings
    ? WebGLRenderingContext
    : CanvasRenderingContext2D;
  gl: Settings extends CreateWebGLCanvasSettings
    ? WebGLRenderingContext
    : undefined;
  deltaTime: number;
  started: boolean;
  exporting: boolean;
  playing: boolean;
  recording: boolean;
  settings: CanvasSketchSettings<SettingsData<Settings>>;
  data: SettingsData<Settings>;
  p5?: p5;
  render: () => RenderResult;
  togglePlay: () => void;
  dispatch: (cb: CanvasSketchCallback<Settings>) => void;
  tick: () => void;
  resize: () => boolean;
  update: <NewSettings extends CanvasSketchSettings<SettingsData<Settings>>>(
    opt?: NewSettings
  ) => CanvasSketchProps<NewSettings>;
  exportFrame: (opt?: ExportFrameOpt) => Promise<FrameExport | FrameExport[]>;
  record: () => void;
  play: () => void;
  pause: () => void;
  stop: () => void;
}

export type Sketch<S extends CanvasSketchSettings> =
  | ((props: CanvasSketchProps<S>) => RenderResult)
  | {
      begin?: (props: CanvasSketchProps<S>) => void;
      beginRecord?: (props: CanvasSketchProps<S>) => void;
      end?: (props: CanvasSketchProps<S>) => void;
      endRecord?: (props: CanvasSketchProps<S>) => void;
      preExport?: () => void;
      postExport?: () => void;
      render?: (props: CanvasSketchProps<S>) => RenderResult;
      resize?: (props: CanvasSketchProps<S>) => void;
      tick?: (props: CanvasSketchProps<S>) => void;
      unload?: (props: CanvasSketchProps<S>) => void;
    };

export type CreateSketch<S extends CanvasSketchSettings> = (
  props: CanvasSketchProps<S>
) => Sketch<S>;

export declare type CanvasSketchCallback<S> = (
  props: CanvasSketchProps<S>
) => void;

export declare interface GetTimePropsSettings {
  duration?: number;
  totalFrames?: number;
  timeScale?: number;
  fps?: number;
  dimensions?: [number, number];
  units?: UnitType;
  time?: number;
  frame?: number;
}

export declare interface TimeProps {
  playhead: number;
  time: number;
  frame: number;
  duration: number;
  totalFrames: number;
  fps: number;
  timeScale: number;
}

export declare interface SizeProps {
  width: number;
  height: number;
  pixelRatio: number;
  canvasWidth: number;
  canvasHeight: number;
  viewportWidth: number;
  viewportHeight: number;
}

export declare interface ExportFrameOpt {
  commit?: boolean;
  sequence?: boolean;
  save?: boolean;
  timeStamp?: string;
}

export declare interface ExportOptions {
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

export declare interface DoExportFrameOpts extends Partial<ExportOptions> {
  hash?: string;
}

export declare type FrameExport = {
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

export declare type RenderResult = Array<
  | { data?: HTMLCanvasElement | object; dataURL?: string }
  | HTMLCanvasElement
  | undefined
> | void;
