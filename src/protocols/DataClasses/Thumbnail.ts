import { DataClass } from './IDataClass.js';

export type IThumbnail = Omit<Thumbnail, keyof DataClass>;

export class Thumbnail extends DataClass {
  public readonly url: string;
  public readonly width: number;
  public readonly height: number;

  constructor(options: IThumbnail) {
    super();
    this.url = options.url;
    this.width = options.width;
    this.height = options.height;
  }

  static override isValid(data: any): boolean {
    return (
      typeof data === 'object' &&
      !Array.isArray(data) &&
      typeof data['url'] === 'string' &&
      typeof data['width'] === 'number' &&
      typeof data['height'] === 'number'
    );
  }

  toJSON() {
    return {
      url: this.url,
      width: this.width,
      height: this.height
    };
  }
}
