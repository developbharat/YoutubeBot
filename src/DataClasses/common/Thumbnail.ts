import { DataClass } from './IDataClass.js';

export type IThumbnail = Omit<Thumbnail, keyof DataClass>;

export class Thumbnail extends DataClass {
  /**
   * Thumbnail URL
   */
  public readonly url: string;
  public readonly width: number;
  public readonly height: number;

  constructor(options: IThumbnail) {
    super();
    this.url = options.url;
    this.width = options.width;
    this.height = options.height;
  }

  isValid(): boolean {
    return (
      typeof this.url === 'string' &&
      typeof this.width === 'number' &&
      typeof this.height === 'number' &&
      !!this.url &&
      !!this.width &&
      !!this.height
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
