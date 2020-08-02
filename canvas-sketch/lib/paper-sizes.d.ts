export = paperSizes;

declare const paperSizes: paperSizes.PaperSizes;

declare namespace paperSizes {
  export interface PaperSize {
    dimensions: [number, number];
    units: "mm" | "in";
  }

  export type PaperSizes = Record<string, paperSizes.PaperSize | undefined>;
}
