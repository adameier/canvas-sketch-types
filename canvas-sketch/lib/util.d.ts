export declare function getClientApi(): any;

export declare function defined(): boolean;

export declare function isBrowser(): boolean;

export declare function isWebGLContext(
  ctx: RenderingContext
): ctx is WebGLRenderingContext | WebGL2RenderingContext;

export declare function isCanvas(element: Node): element is HTMLCanvasElement;
