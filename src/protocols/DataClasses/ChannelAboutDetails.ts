import { DataClass } from './IDataClass.js';
import { IThumbnail } from './Thumbnail.js';

export type IChannelMetadata = Omit<ChannelMetadata, keyof DataClass>;

export class ChannelMetadata extends DataClass {
  public readonly title: string;
  public readonly tagline: string;
  public readonly description: string;
  public readonly rssUrl: string;
  public readonly channelId: string;
  public readonly canonicalUrl: string;
  public readonly keywords: string[];
  public readonly tags: string[];
  public readonly vanityChannelUrl: string;
  public readonly isFamilySafe: boolean;
  public readonly isUnlisted: boolean;
  public readonly availableCountryCodes: string[];

  constructor(options: IChannelMetadata) {
    super();
    this.title = options.title;
    this.tagline = options.tagline;
    this.description = options.description;
    this.rssUrl = options.rssUrl;
    this.channelId = options.channelId;
    this.canonicalUrl = options.canonicalUrl;
    this.keywords = options.keywords;
    this.tags = options.tags;
    this.vanityChannelUrl = options.vanityChannelUrl;
    this.isFamilySafe = options.isFamilySafe;
    this.isUnlisted = options.isUnlisted;
    this.availableCountryCodes = options.availableCountryCodes;
  }

  static override isValid(data: any, full = true): boolean {
    throw new Error('Method not implemented.');
  }

  toJSON() {
    throw new Error('Method not implemented.');
  }
}

export type IChannelAboutDetails = Omit<ChannelAboutDetails, keyof DataClass>;

export class ChannelAboutDetails extends DataClass {
  public readonly avatar: IThumbnail;
  public readonly banner: IThumbnail;
  public readonly tvBanner: IThumbnail;
  public readonly mobileBanner: IThumbnail;
  public readonly isVerifiedBadge: boolean;
  public readonly subscribersCountText: string;
  public readonly subscribersCount: bigint;
  public readonly videosCountText: string;
  public readonly videosCount: bigint;
  public readonly totalViewsCountText: string;
  public readonly totalViewsCount: bigint;
  public readonly channelCreatedDate: Date;
  public readonly channelLocation: string;
  public readonly metadata: IChannelMetadata;
  public readonly links: Record<string, string>;

  constructor(options: IChannelAboutDetails) {
    super();
    this.avatar = options.avatar;
    this.banner = options.banner;
    this.tvBanner = options.tvBanner;
    this.mobileBanner = options.mobileBanner;
    this.isVerifiedBadge = options.isVerifiedBadge;
    this.subscribersCountText = options.subscribersCountText;
    this.subscribersCount = BigInt(options.subscribersCount.toString());
    this.videosCountText = options.videosCountText;
    this.videosCount = BigInt(options.videosCount.toString());
    this.totalViewsCountText = options.totalViewsCountText;
    this.totalViewsCount = BigInt(options.totalViewsCount.toString());
    this.channelCreatedDate = options.channelCreatedDate;
    this.channelLocation = options.channelLocation;
    this.metadata = options.metadata;
    this.links = options.links;
  }

  static override isValid(data: any, full = true): boolean {
    throw new Error('Method not implemented.');
  }

  toJSON() {
    throw new Error('Method not implemented.');
  }
}
