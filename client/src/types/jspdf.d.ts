declare module "jspdf" {
  export class jsPDF {
    constructor(options?: {
      unit?: string;
      format?: string | [number, number];
    });
    text(text: string | string[], x: number, y: number, options?: unknown): void;
    setFont(fontName: string, fontStyle?: string): void;
    setFontSize(size: number): void;
    splitTextToSize(text: string | string[], maxSize: number): string[];
    addPage(): void;
    save(filename?: string): void;
    internal: {
      pageSize: {
        getWidth(): number;
        getHeight(): number;
      };
    };
  }
}
