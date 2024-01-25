import { DataClass } from '../common/IDataClass.js';

export type IAPIDetails = Omit<APIDetails, keyof DataClass>;

export class APIDetails extends DataClass {
  public readonly subscribersCountText: string;
  public readonly subscribersCount: string;
  public readonly videosCountText: string;
  public readonly videosCount: string;
  public readonly totalViewsCountText: string;
  public readonly totalViewsCount: string;
  public readonly channelCreatedDate: Date;
  public readonly channelLocation: string;
  public readonly links: Record<string, string>;

  constructor(options: IAPIDetails) {
    super();
    this.subscribersCountText = options.subscribersCountText;
    this.subscribersCount = options.subscribersCount;
    this.videosCountText = options.videosCountText;
    this.videosCount = options.videosCount;
    this.totalViewsCountText = options.totalViewsCountText;
    this.totalViewsCount = options.totalViewsCount;
    this.channelCreatedDate = options.channelCreatedDate;
    this.channelLocation = options.channelLocation;
    this.links = options.links;
  }

  isValid(): boolean {
    return true;
    // TODO: implement this.
    // throw new Error('Method not implemented.');
  }

  toJSON() {
    return {
      subscribersCountText: this.subscribersCountText,
      subscribersCount: this.subscribersCount,
      videosCountText: this.videosCountText,
      videosCount: this.videosCount,
      totalViewsCountText: this.totalViewsCountText,
      totalViewsCount: this.totalViewsCount,
      channelCreatedDate: this.channelCreatedDate,
      channelLocation: this.channelLocation,
      links: this.links
    };
  }
}
