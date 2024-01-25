import { APIDetails, WebpageDetails } from '../DataClasses/ChannelAboutDetails/index.js';
import { findKeyInObject, subsToBigInt } from '../common/utils.js';
import {
  APIJsonSchema,
  IAPIJsonSchema,
  IMetadataSchema,
  IWebpageJsonSchema,
  WebpageJsonSchema
} from '../schemas/ChannelDetails/index.js';
import { IDataParser, IResult } from './IDataParser.js';

class _AboutChannelParser implements IDataParser<WebpageDetails, APIDetails> {
  async parseHtmlData(json: string): Promise<IResult<WebpageDetails>> {
    const data = JSON.parse(json) as IWebpageJsonSchema;
    const parsed = WebpageJsonSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, error: new Error(`Invalid JSON Provided: ${JSON.stringify(parsed, null, 2)}`) };
    }

    const about = new WebpageDetails({
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
      }
    });

    if (!about.isValid()) return { success: false, error: new Error('Invalid data found in webpage details.') };

    return { success: true, data: about };
  }
  async parseAPIData(json: string): Promise<IResult<APIDetails>> {
    const data = JSON.parse(json) as IAPIJsonSchema;
    const parsed = APIJsonSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, error: new Error(`Invalid JSON Provided: ${JSON.stringify(parsed, null, 2)}`) };
    }

    const metadata = findKeyInObject<IMetadataSchema>(data, 'aboutChannelViewModel');
    if (!metadata) return { success: false, error: new Error('Unable to find aboutChannelViewModel in api JSON') };

    const links: Record<string, string> = {};
    metadata.links?.forEach((link) => {
      const title = link.channelExternalLinkViewModel.title.content;
      const href = link.channelExternalLinkViewModel.link.content;
      if (!title || !href) return;
      links[title] = href;
    });

    const about = new APIDetails({
      subscribersCountText: metadata.subscriberCountText,
      subscribersCount: subsToBigInt(metadata.subscriberCountText).toString(),
      videosCountText: metadata.videoCountText,
      videosCount: metadata.videoCountText.replace(RegExp('[^0-9.]', 'g'), ''),
      totalViewsCountText: metadata.viewCountText,
      totalViewsCount: metadata.viewCountText.replace(RegExp('[^0-9.]', 'g'), ''),
      channelCreatedDate: new Date(Date.parse(metadata.joinedDateText.content.replace('Joined ', ''))),
      channelLocation: metadata.country,
      links: links || {}
    });

    if (!about.isValid()) return { success: false, error: new Error('Invalid data found in api details.') };

    return { success: true, data: about };
  }
}

export const AboutChannelParser = new _AboutChannelParser();
