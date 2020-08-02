import SketchManager, {
  CreateSketch,
  CanvasSketchSettings,
  DefaultCanvasSketchSettings,
} from "./core/SketchManager";
import { PaperSizes } from "./paper-sizes";

export default canvasSketch;

declare const canvasSketch: CanvasSketch;

declare interface CanvasSketch {
  <Settings extends CanvasSketchSettings>(
    sketch: CreateSketch<Settings>,
    settings: Settings
  ): Promise<SketchManager<Settings>>;
  (sketch: CreateSketch<DefaultCanvasSketchSettings>): Promise<
    SketchManager<DefaultCanvasSketchSettings>
  >;
  canvasSketch: CanvasSketch;
  PaperSizes: PaperSizes;
}
