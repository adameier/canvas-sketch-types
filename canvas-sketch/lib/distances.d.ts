export declare function getDimensionsFromPreset(
  dimensions: string | [number, number],
  unitsTo?: string,
  pixelsPerInch?: number
): [number, number];

export declare function convertDistance(
  dimension: number,
  unitsFrom?: string,
  unitsTo?: string,
  pixelsPerInch?: number
): number;
