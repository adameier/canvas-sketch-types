export declare type SaveResult =
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

export declare interface SaveOpt {
  sequence?: boolean;
  save: boolean;
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
}

export declare function streamStart(opts?: object): Promise<any>;

export declare function streamEnd(opts?: object): Promise<any>;

export declare function exportCanvas(
  canvas: HTMLCanvasElement,
  opt?: { encoding?: string; encodingQuality?: number }
): { extension: string; type: string; dataURL: string };

export declare function saveDataURL(
  dataURL: string,
  opts?: SaveOpt
): Promise<SaveResult>;

export declare function saveBlob(
  blob: Blob,
  opts?: SaveOpt
): Promise<SaveResult>;

export declare function getTimeStamp(): string;

export declare function getDefaultFile(): string;

export declare function resolveFilename(opt?: {
  file?: string | Function;
  extension?: string;
  frame?: number;
  totalFrames?: number;
  totalLayers?: number;
  layer?: number;
  timeStamp?: string;
  prefix?: string;
  name?: string;
  hash?: string;
  suffix?: string;
}): string;
