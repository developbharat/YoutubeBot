import { DataClass } from '../common/IDataClass.js';
import { IThumbnail } from '../common/Thumbnail.js';
import { ChannelMetadata, IChannelMetadata } from './ChannelMetadata.js';

export type IWebpageDetails = Omit<WebpageDetails, keyof DataClass>;

// export interface IAboutChannelProtocolData {
//   avatar: IThumbnailItem; // Channel avatar image
//   banner: IThumbnailItem; // Channel banner on top image.
//   tvBanner: IThumbnailItem; // Channel banner on top for tv image
//   mobileBanner: IThumbnailItem; // Channel banner on top for mobile image
//   isVerifiedBadge: boolean; // Is channel verified.
//   subscribersCountText: string; // 256 million subscribers
//   subscribersCount: bigint; // 256000000
//   videosCountText: string; //  20,071 videos
//   videosCount: bigint; //  20071
//   totalViewsCountText: string; // 242,807,098,872 views
//   totalViewsCount: bigint; // 242807098872
//   channelCreatedDate: Date; // Mar 13, 2006
//   channelLocation: string; // India
//   metadata: IChannelMetadata; // {title: '', description: '', ...}
//   links: Record<string, string>; // {facebook: '', twitter: '', instagram: ''}
// }
export class WebpageDetails extends DataClass {
  public readonly avatar: IThumbnail;
  public readonly banner: IThumbnail;
  public readonly tvBanner: IThumbnail;
  public readonly mobileBanner: IThumbnail;
  public readonly isVerifiedBadge: boolean;
  public readonly metadata: IChannelMetadata;

  constructor(options: IWebpageDetails) {
    super();
    this.avatar = options.avatar;
    this.banner = options.banner;
    this.tvBanner = options.tvBanner;
    this.mobileBanner = options.mobileBanner;
    this.isVerifiedBadge = options.isVerifiedBadge;
    this.metadata = options.metadata;
  }

  isValid(): boolean {
    return true;
    // TODO: Implement this.
    // throw new Error('Method not implemented.');
  }

  toJSON() {
    return {
      avatar: this.avatar,
      banner: this.banner,
      tvBanner: this.tvBanner,
      mobileBanner: this.mobileBanner,
      isVerifiedBadge: this.isVerifiedBadge,
      metadata: new ChannelMetadata(this.metadata).toJSON()
    };
  }
}
