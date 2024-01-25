import { IWebpageDetails, WebpageDetails } from './WebpageDetails.js';
import { DataClass } from '../common/IDataClass.js';
import { APIDetails, IAPIDetails } from './APIDetails.js';

export type IChannelAboutDetails = Omit<ChannelAboutDetails, keyof DataClass>;
export type IChannelAboutCombinedDetails = IWebpageDetails & IAPIDetails;

// TODO: add relevant description and examples to respective class attributes.
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

export class ChannelAboutDetails extends DataClass {
  public readonly htmlData: WebpageDetails;
  public readonly apiData: APIDetails;

  constructor(options: IChannelAboutDetails) {
    super();
    this.htmlData = options.htmlData;
    this.apiData = options.apiData;
  }

  isValid(): boolean {
    return this.htmlData.isValid() && this.apiData.isValid();
  }

  toJSON() {
    return {
      ...this.htmlData.toJSON(),
      ...this.apiData.toJSON()
    };
  }
}
