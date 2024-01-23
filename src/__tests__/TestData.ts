import { IChannelAboutDetails, IChannelMetadata } from '../protocols/DataClasses/ChannelAboutDetails.js';
import { IThumbnail } from '../protocols/DataClasses/Thumbnail.js';
import * as aboutChannelJson from './json/aboutChannel.js';

const thumbnail: IThumbnail = {
  url: 'http://example.com',
  width: 200,
  height: 30
};

const metadata: IChannelMetadata = {
  availableCountryCodes: ['VI', 'MO', 'TC'],
  canonicalUrl: 'https://www.youtube.com/channel/UCq-Fj5jknLsUf-MWSy4_brA',
  channelId: 'UCq-Fj5jknLsUf-MWSy4_brA',
  description: 'Music can change the world...',
  isFamilySafe: true,
  isUnlisted: false,
  keywords: ['tseries', 'sad songs'],
  tags: ['tseries tseries', 't-series'],
  rssUrl: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCq-Fj5jknLsUf-MWSy4_brA',
  tagline: 'Music can change the world.',
  title: 'T-Series',
  vanityChannelUrl: 'https://youtube.com/@tseries'
};

const aboutChannel: IChannelAboutDetails = {
  avatar: thumbnail,
  banner: thumbnail,
  mobileBanner: thumbnail,
  tvBanner: thumbnail,
  channelCreatedDate: new Date(),
  channelLocation: 'India',
  isVerifiedBadge: true,
  links: {
    Facebook: 'https://facebook.com/example'
  },
  subscribersCount: 256000000n,
  subscribersCountText: '256 million subscribers',
  totalViewsCount: 242807098872n,
  totalViewsCountText: '242,807,098,872 views',
  videosCount: 20071n,
  videosCountText: '20,071 videos',
  metadata: metadata
};

export const TestData = {
  thumbnail: thumbnail,
  aboutChannel: {
    metadata: metadata,
    details: aboutChannel,
    htmlResultJson: aboutChannelJson.htmlResultJson,
    apiResultJson: aboutChannelJson.apiResultJson
  }
};
