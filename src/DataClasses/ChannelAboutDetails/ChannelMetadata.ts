import { DataClass } from '../common/IDataClass.js';

export type IChannelMetadata = Omit<ChannelMetadata, keyof DataClass>;

export class ChannelMetadata extends DataClass {
  /**
   * Channel title
   * @example "T-Series"
   */
  public readonly title: string;
  /**
   * Channel tagline
   * @example "Music can change the world. T-Series is India's largest Music Label & Movie Studio"
   */
  public readonly tagline: string;
  /**
   * Channel description
   * @example "Music can change the world...continued..."
   */
  public readonly description: string;
  /**
   * Channel videos RSS URL
   * @example "https://www.youtube.com/feeds/videos.xml?channel_id=UCq-Fj5jknLsUf-MWSy4_brA"
   */
  public readonly rssUrl: string;
  /**
   * Channel ID
   * @example "UCq-Fj5jknLsUf-MWSy4_brA"
   */
  public readonly channelId: string;
  /**
   * Channel Canonical URL
   * @example "https://www.youtube.com/channel/UCq-Fj5jknLsUf-MWSy4_brA"
   */
  public readonly canonicalUrl: string;
  /**
   * Channel Keywords
   * @example ["tseries", "sad songs"]
   */
  public readonly keywords: string[];
  /**
   * Channel tags
   * @example ["tseries tseries", "t-series"]
   */
  public readonly tags: string[];
  /**
   * Channel vanity URL
   * @example "https://youtube.com/@tseries"
   */
  public readonly vanityChannelUrl: string;
  /**
   * Is channel family safe
   * @example true
   */
  public readonly isFamilySafe: boolean;
  /**
   * Is channel unlisted
   * @example false
   */
  public readonly isUnlisted: boolean;
  /**
   * Channel available countries
   * @example ['VI', 'MO', 'TC']
   */
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

  isValid(): boolean {
    return true;
    // TODO: implement this.
    // throw new Error('Method not implemented.');
  }

  toJSON() {
    return {
      title: this.title,
      tagline: this.tagline,
      description: this.description,
      rssUrl: this.rssUrl,
      channelId: this.channelId,
      canonicalUrl: this.canonicalUrl,
      keywords: this.keywords,
      tags: this.tags,
      vanityChannelUrl: this.vanityChannelUrl,
      isFamilySafe: this.isFamilySafe,
      isUnlisted: this.isUnlisted,
      availableCountryCodes: this.availableCountryCodes
    };
  }
}
