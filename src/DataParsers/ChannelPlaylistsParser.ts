import { PlaylistItem } from '../DataClasses/ChannelPlaylists/index.js';
import { findKeyInObject } from '../common/utils.js';
import { IPlaylistItemSchema } from '../schemas/ChannelPlaylists/common.js';
import {
  APIJsonSchema,
  IAPIJsonSchema,
  ITabDataSchema,
  IWebpageJsonSchema,
  WebpageJsonSchema
} from '../schemas/ChannelPlaylists/index.js';
import { IDataParser, IResult, ITokenExtras } from './IDataParser.js';

class _ChannelPlaylistsParser implements IDataParser<PlaylistItem[], PlaylistItem[], ITokenExtras, ITokenExtras> {
  async parseHtmlData(json: string): Promise<IResult<PlaylistItem[], ITokenExtras>> {
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
    const tab = data.contents.twoColumnBrowseResultsRenderer.tabs.find(
      (item) => typeof item['tabRenderer'] !== 'undefined' && item.tabRenderer.title === 'Playlists'
    ) as ITabDataSchema | undefined;
    if (!tab) return { success: false, error: new Error(`Playlists Tab not found.`) };

    const grid = findKeyInObject<{ items: IPlaylistItemSchema[] }>(tab || {}, 'gridRenderer');
    if (!grid) return { success: false, error: new Error(`gridRenderer not found in JSON: `) };

    const items = grid?.items.filter((item) => !!item['gridPlaylistRenderer']);
    if (!items) return { success: false, error: new Error(`gridPlaylistRenderer not found in JSON: `) };

    const continueToken = findKeyInObject<{ token: string }>(grid, 'continuationCommand')?.token || null;

    /**
     * Create Data class from parsed data
     */
    const result = items.map(
      ({ gridPlaylistRenderer: item }) =>
        new PlaylistItem({
          name: item.title.runs.shift()?.text || '',
          playlistId: item.playlistId,
          thumbnail: item.thumbnail.thumbnails.slice(-1).shift()!,
          videosCount: item.videoCountShortText.simpleText,
          videosCountText: item.videoCountShortText.simpleText,
          isRecentlyUpdated: !!item.publishedTimeText?.simpleText || false
        })
    );

    return { success: true, data: result, extras: { continuationToken: continueToken } };
  }

  async parseAPIData(json: string): Promise<IResult<PlaylistItem[], ITokenExtras>> {
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
    const wrapper = findKeyInObject(data, 'continuationItems') as IPlaylistItemSchema[];
    const items = wrapper?.filter((item) => !!item['gridPlaylistRenderer']);
    if (!items || !wrapper) return { success: false, error: new Error(`continuationItems not found in JSON: `) };
    const continueToken = findKeyInObject<{ token: string }>(wrapper, 'continuationCommand')?.token || null;

    /**
     * Create Data class from parsed data
     */
    const result = items.map(
      ({ gridPlaylistRenderer: item }) =>
        new PlaylistItem({
          name: item.title.runs.shift()?.text || '',
          playlistId: item.playlistId,
          thumbnail: item.thumbnail.thumbnails.slice(-1).shift()!,
          videosCount: item.videoCountShortText.simpleText,
          videosCountText: item.videoCountShortText.simpleText,
          isRecentlyUpdated: !!item.publishedTimeText?.simpleText || false
        })
    );

    return { success: true, data: result, extras: { continuationToken: continueToken } };
  }
}

export const ChannelPlaylistsParser = new _ChannelPlaylistsParser();
