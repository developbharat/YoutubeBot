import miniget from 'miniget';
import { APIResponseSchema, IAPIResonseSchema } from '../schemas/AboutChannelProtocol/APIResponseSchema.js';
import { IBaseProtocol, IParseResult } from '../common/IBaseProtocol.js';
import { jsonAfter, between, doPost, subsToBigInt } from '../common/utils.js';
import { IThumbnailItem } from '../schemas/common/Thumbnail.js';
import { IInitialRequestSchema, InitialRequestSchema } from '../schemas/AboutChannelProtocol/InitialRequestSchema.js';

export interface IChannelMetadata {
  title: string; //  'T-Series'
  tagline: string; // Music can change the world\". T-Series is India's largest Music Label & Movie Studio, believes in bringing world close together through its music.
  description: string; // '"Music can change the world..."'
  rssUrl: string; // 'https://www.youtube.com/feeds/videos.xml?channel_id=UCq-Fj5jknLsUf-MWSy4_brA'
  channelId: string; // 'UCq-Fj5jknLsUf-MWSy4_brA'
  canonicalUrl: string; // 'https://www.youtube.com/channel/UCq-Fj5jknLsUf-MWSy4_brA'
  keywords: string[]; // ["tseries", "sad songs"]
  tags: string[]; // ["tseries tseries", "t-series"]
  vanityChannelUrl: string; // https://youtube.com/@tseries
  isFamilySafe: boolean; // true
  isUnlisted: boolean; // false
  availableCountryCodes: string[]; // ['VI', 'MO', 'TC']
}

export interface IAboutChannelProtocolData {
  avatar: IThumbnailItem; // Channel avatar image
  banner: IThumbnailItem; // Channel banner on top image.
  tvBanner: IThumbnailItem; // Channel banner on top for tv image
  mobileBanner: IThumbnailItem; // Channel banner on top for mobile image
  isVerifiedBadge: boolean; // Is channel verified.
  subscribersCountText: string; // 256 million subscribers
  subscribersCount: bigint; // 256000000
  videosCountText: string; //  20,071 videos
  videosCount: bigint; //  20071
  totalViewsCountText: string; // 242,807,098,872 views
  totalViewsCount: bigint; // 242807098872
  channelCreatedDate: Date; // Mar 13, 2006
  channelLocation: string; // India
  metadata: IChannelMetadata; // {title: '', description: '', ...}
  links: Record<string, string>; // {facebook: '', twitter: '', instagram: ''}
}

export interface IAboutChannelProtocolConstructor {
  channelId: string;
}

export class AboutChannelProtocol implements IBaseProtocol<IAboutChannelProtocolData> {
  private requestContext = {
    context: {
      client: {
        utcOffsetMinutes: 0,
        gl: 'US',
        hl: 'en',
        clientName: 'WEB',
        clientVersion: '<important information>'
      },
      user: {},
      request: {}
    },
    continuation: ''
  };
  private apiKey: string = '';
  private data: IAboutChannelProtocolData | null = null;
  private html: string = '';
  constructor(private readonly options: IAboutChannelProtocolConstructor) {}

  public async init(): Promise<IParseResult<IAboutChannelProtocolData>> {
    /**
     * Make GET Request for Channel Homepage
     */
    this.html = await miniget(`https://www.youtube.com/channel/${this.options.channelId}`, {
      method: 'GET'
    }).text();

    /**
     * Extract JSON data from Channel Homepage HTML
     */
    await this.parseHomeHTMLToData();

    /**
     * Make Request to about dialog to fetch additional details.
     */
    const response = await doPost(
      `https://www.youtube.com/youtubei/v1/browse?key=${this.apiKey}&prettyPrint=false`,
      this.requestContext,
      { method: 'POST' }
    );

    /**
     * Validate about data.
     */
    const aboutData = JSON.parse(response) as IAPIResonseSchema;
    const parsed = APIResponseSchema.safeParse(aboutData);
    if (!parsed.success) {
      console.log({ parsed: JSON.stringify(parsed, null, 2) });
      throw new Error('Invalid Json Received from about dialogbox');
    }

    /**
     * Update data to include data from about dialog.
     */
    this.data = this.aboutJsonToData(aboutData);

    // Return parsed data
    return { success: true, data: this.data! };
  }

  private async parseHomeHTMLToData(): Promise<void> {
    const json = jsonAfter(this.html, 'var ytInitialData = ') || jsonAfter(this.html, 'window["ytInitialData"] = ');
    this.apiKey = between(this.html, 'INNERTUBE_API_KEY":"', '"') || between(this.html, 'innertubeApiKey":"', '"');
    const clientVersion =
      between(this.html, 'INNERTUBE_CONTEXT_CLIENT_VERSION":"', '"') ||
      between(this.html, 'innertube_context_client_version":"', '"');

    // Make deep copy and set clientVersion
    this.requestContext = JSON.parse(JSON.stringify(this.requestContext));
    this.requestContext.context.client.clientVersion = clientVersion;

    /**
     * Validate Parsed JSON from HTML
     */
    const parsed = InitialRequestSchema.safeParse(json);
    if (!parsed.success) {
      console.log({ parsed: JSON.stringify(parsed, null, 2) });
      throw new Error('Invalid Json Received');
    }

    const data = json as IInitialRequestSchema;
    /**
     * Extract continuation token from json for about dialog.
     */
    const continuation =
      data.header.c4TabbedHeaderRenderer.tagline.channelTaglineRenderer.moreEndpoint.showEngagementPanelEndpoint.engagementPanel.engagementPanelSectionListRenderer.content.sectionListRenderer.contents
        .shift()!
        .itemSectionRenderer.contents.shift()!;
    this.requestContext.continuation =
      continuation.continuationItemRenderer.continuationEndpoint.continuationCommand.token;

    /**
     * Update main data from Parsed Json
     */
    this.data = this.initReqJsonToData(data);
  }

  private aboutJsonToData(aboutData: IAPIResonseSchema): IAboutChannelProtocolData {
    const wrapper = aboutData.onResponseReceivedEndpoints
      .shift()!
      .appendContinuationItemsAction.continuationItems.shift()!;

    const metadata = wrapper.aboutChannelRenderer.metadata.aboutChannelViewModel;

    const links: Record<string, string> = {};
    metadata.links?.forEach((link) => {
      const title = link.channelExternalLinkViewModel.title.content;
      const href = link.channelExternalLinkViewModel.link.content;
      if (!title || !href) return;
      links[title] = href;
    });
    return {
      ...this.data!,
      subscribersCountText: metadata.subscriberCountText,
      subscribersCount: subsToBigInt(metadata.subscriberCountText),
      videosCountText: metadata.videoCountText,
      videosCount: BigInt(metadata.videoCountText.replace(RegExp('[^0-9.]', 'g'), '')),
      totalViewsCountText: metadata.viewCountText,
      totalViewsCount: BigInt(metadata.viewCountText.replace(RegExp('[^0-9.]', 'g'), '')),
      channelCreatedDate: new Date(Date.parse(metadata.joinedDateText.content.replace('Joined ', ''))),
      channelLocation: metadata.country,
      links: links || []
    };
  }

  private initReqJsonToData(data: IInitialRequestSchema): IAboutChannelProtocolData {
    return {
      avatar: data.header.c4TabbedHeaderRenderer.avatar.thumbnails.slice(-1).shift()!,
      banner: data.header.c4TabbedHeaderRenderer.banner.thumbnails.slice(-1).shift()!,
      tvBanner: data.header.c4TabbedHeaderRenderer.tvBanner.thumbnails.slice(-1).shift()!,
      mobileBanner: data.header.c4TabbedHeaderRenderer.mobileBanner.thumbnails.slice(-1).shift()!,
      isVerifiedBadge:
        data.header.c4TabbedHeaderRenderer.badges?.findIndex(
          (badge) => badge.metadataBadgeRenderer.tooltip === 'Verified'
        ) !== -1 || false,
      metadata: {
        title: data.metadata.channelMetadataRenderer.title,
        tagline: data.header.c4TabbedHeaderRenderer.tagline.channelTaglineRenderer.content,
        description: data.metadata.channelMetadataRenderer.description,
        rssUrl: data.metadata.channelMetadataRenderer.rssUrl,
        channelId: data.metadata.channelMetadataRenderer.externalId,
        canonicalUrl: data.microformat.microformatDataRenderer.urlCanonical,
        keywords: data.metadata.channelMetadataRenderer.keywords.split(' '),
        tags: data.microformat.microformatDataRenderer.tags || [],
        vanityChannelUrl: data.metadata.channelMetadataRenderer.vanityChannelUrl,
        isFamilySafe: data.metadata.channelMetadataRenderer.isFamilySafe,
        isUnlisted: data.microformat.microformatDataRenderer.unlisted,
        availableCountryCodes: data.metadata.channelMetadataRenderer.availableCountryCodes
      },
      subscribersCountText: data.header.c4TabbedHeaderRenderer.subscriberCountText.simpleText,
      subscribersCount: subsToBigInt(data.header.c4TabbedHeaderRenderer.subscriberCountText.simpleText),
      videosCountText: '', // TODO: Accurate Count Will be available from AboutDialogBox
      videosCount: BigInt(0), // TODO: Will be available from AboutDialogBox
      totalViewsCountText: '', // TODO: Will be available from AboutDialogBox
      totalViewsCount: BigInt(0), // TODO: Will be available from AboutDialogBox
      channelCreatedDate: new Date(), // TODO: Will be available from AboutDialogBox
      channelLocation: '', // TODO: Will be available from AboutDialogBox
      links: {} // TODO: Will be available from AboutDialogBox
    };
  }

  public hasNext(): Boolean {
    return false;
  }

  public async next(): Promise<IParseResult<IAboutChannelProtocolData>> {
    throw new Error('Method not implemented.');
  }
}

// const main = async () => {
//   const instance = new AboutChannelProtocol({ channelId: 'UCMjaue7QI8Y3Ipj0oCxXipw' });
//   const { data } = await instance.init();
//   // const fs = require('fs');
//   fs.writeFileSync(
//     'channel-data.json',
//     JSON.stringify(data, (_k, value) => (typeof value === 'bigint' ? value.toString() : value), 2),
//     { encoding: 'utf8' }
//   );
// };

// main();
