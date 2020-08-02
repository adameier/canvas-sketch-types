export declare type UnitType =
  | "mm"
  | "cm"
  | "m"
  | "pc"
  | "pt"
  | "in"
  | "ft"
  | "px";

export declare interface CanvasSizeProps {
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
}

export declare interface CanvasResizeSettings {
  bleed?: number;
  dimensions?: string | [number, number];
  exportPixelRatio?: number;
  maxPixelRatio?: number;
  orientation?: "landscape";
  parent?: Node;
  pixelRatio?: number;
  pixelsPerInch?: number;
  scaleToFit?: boolean;
  scaleToFitPadding?: number;
  units?: UnitType;
}

declare function resizeCanvas(
  props: { exporting: boolean },
  settings: CanvasResizeSettings
): CanvasSizeProps;

export default resizeCanvas;
