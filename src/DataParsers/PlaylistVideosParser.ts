import { PlaylistDetails, PlaylistVideoItem } from '../DataClasses/PlaylistVideos/index.js';
import { findKeyInObject, unitToDigits } from '../common/utils.js';
import {
  APIJsonSchema,
  IAPIJsonSchema,
  IPlaylistVideoSchema,
  IWebpageJsonSchema,
  WebpageJsonSchema
} from '../schemas/PlaylistVideos/index.js';
import { IDataParser, IResult, ITokenExtras } from './IDataParser.js';

class _PlaylistVideosParser implements IDataParser<PlaylistDetails, PlaylistVideoItem[], ITokenExtras, ITokenExtras> {
  private parsePlaylistVideoRenderer(items: IPlaylistVideoSchema[]) {
    return items.map(({ playlistVideoRenderer: item }) => {
      const thumbnail = item.thumbnail.thumbnails.slice(-1).shift()!;
      const channelId = findKeyInObject<string>(item.shortBylineText, 'browseId')!;
      const viewsCountText = item.videoInfo.runs.find((item) => item.text.includes(' views'))?.text || '';
      const uploadedAtText = item.videoInfo.runs.find((item) => item.text.includes(' ago'))?.text || '';

      /**
       * Extract data into relevant data classes.
       */
      return new PlaylistVideoItem({
        videoId: item.videoId,
        thumbnail: thumbnail,
        durationSeconds: item.lengthSeconds,
        durationText: item.lengthText.simpleText,
        title: item.title.runs.shift()?.text || '',
        videoIndexInPlaylist: Number(item.index) || 0,
        channelYoutubeId: channelId,
        viewsCountText: viewsCountText,
        viewsCount: unitToDigits(viewsCountText.replace(' views', '')).toString(),
        estimatedUploadedAtText: uploadedAtText
      });
    });
  }

  async parseHtmlData(json: string): Promise<IResult<PlaylistDetails, ITokenExtras>> {
    /**
     * Parse and validate JSON Data
     */
    const data = JSON.parse(json) as IWebpageJsonSchema;
    const parsed = WebpageJsonSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, error: new Error(`Invalid JSON Provided: ${JSON.stringify(parsed, null, 2)}`) };
    }

    /**
     * Extract wrappers to extract data from parsed JSON
     */
    const videosWrapper = findKeyInObject<{ contents: IPlaylistVideoSchema[] }>(
      data.contents.twoColumnBrowseResultsRenderer,
      'playlistVideoListRenderer'
    );
    if (!videosWrapper) return { success: false, error: new Error(`playlistVideoListRenderer not found.`) };

    const continueToken = findKeyInObject<{ token: string }>(videosWrapper, 'continuationCommand')?.token || null;
    const videos = videosWrapper.contents.filter((item) => typeof item['playlistVideoRenderer'] !== 'undefined');

    /**
     * Parse all playlist videos
     */
    const playlistVideos = this.parsePlaylistVideoRenderer(videos);

    /**
     * Parse playlist metadata and other details.
     */
    const header = data.header.playlistHeaderRenderer;
    const thumb = header.playlistHeaderBanner.heroPlaylistThumbnailRenderer.thumbnail.thumbnails.slice(-1).shift()!;

    let lastUpdated = '';
    header.byline.forEach((item) => {
      const parent = item.playlistBylineRenderer.text as any;
      if (typeof parent['runs'] === 'undefined') return;
      const text = parent?.runs?.map((item: any) => item.text)?.join('');
      if (text.includes('Last updated on')) lastUpdated = text.replace('Last updated on').trim();
    });

    const details = new PlaylistDetails({
      name: header.title.simpleText,
      description: header.descriptionText.simpleText,
      playlistId: header.playlistId,
      totalViewsCountText: header.viewCountText.simpleText,
      totalViewsCount: header.viewCountText.simpleText.replace(RegExp('[^0-9.]', 'g'), ''),
      totalVideosCountText: header.numVideosText.runs.shift()?.text || '',
      totalVideosCount: (header.numVideosText.runs.shift()?.text || '').replace(RegExp('[^0-9.]', 'g'), ''),
      channelId: findKeyInObject<string>(header.ownerEndpoint, 'browseId')!,
      videos: playlistVideos,
      thumbnail: thumb,
      lastUpdatedText: lastUpdated
    });

    return { success: true, data: details, extras: { continuationToken: continueToken } };
  }

  async parseAPIData(json: string): Promise<IResult<PlaylistVideoItem[], ITokenExtras>> {
    /**
     * Parse and validate JSON Data
     */
    const data = JSON.parse(json) as IAPIJsonSchema;
    const parsed = APIJsonSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, error: new Error(`Invalid JSON Provided: ${JSON.stringify(parsed, null, 2)}`) };
    }

    /**
     * Extract wrappers to extract data from parsed JSON
     */
    const wrapper = findKeyInObject(data, 'continuationItems') as IPlaylistVideoSchema[];
    const items = wrapper?.filter((item) => !!item['playlistVideoRenderer']);
    if (!items || !wrapper) return { success: false, error: new Error(`continuationItems not found in JSON: `) };
    const continueToken = findKeyInObject<{ token: string }>(wrapper, 'continuationCommand')?.token || null;

    /**
     * Parse videos from api response
     */
    const playlistVideos = this.parsePlaylistVideoRenderer(items);

    return { success: true, data: playlistVideos, extras: { continuationToken: continueToken } };
  }
}

export const PlaylistVideosParser = new _PlaylistVideosParser();
