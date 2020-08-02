export = GUI;

declare class GUI {
  sketches: any[];

  _mounted: boolean;

  _element: HTMLDivElement | null;

  constructor();

  getElement(): HTMLDivElement;

  hasSketch(): boolean;

  addSketch(sketch: any, parentElement?: HTMLElement): void;

  removeSketch(sketch: any): void;

  updateElement(parentElement?: HTMLElement): void;
}
