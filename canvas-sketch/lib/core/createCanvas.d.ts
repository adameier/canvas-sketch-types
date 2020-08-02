declare type BaseCreateCanvasSettings = {
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
  canvas?: HTMLCanvasElement;
  pixelated?: boolean;
};

export type CreateWebGLCanvasSettings = BaseCreateCanvasSettings & {
  context: "webgl" | WebGLRenderingContext;
};

export type Create2DCanvasSettings = BaseCreateCanvasSettings & {
  context?: "2d" | CanvasRenderingContext2D;
};

export type CreateCanvasSettings =
  | CreateWebGLCanvasSettings
  | Create2DCanvasSettings;

declare function createCanvas<Settings extends CreateCanvasSettings>(
  settings?: Settings
): {
  canvas: HTMLCanvasElement;
  context: Settings extends CreateWebGLCanvasSettings
    ? WebGLRenderingContext
    : CanvasRenderingContext2D;
  ownsCanvas: boolean;
};

export default createCanvas;
