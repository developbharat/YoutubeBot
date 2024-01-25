import miniget from 'miniget';
import { IBaseProtocol, IParseResult } from '../../common/IBaseProtocol.js';
import { between, doPost, jsonAfter } from '../../common/utils.js';
import { IInitialRequestSchema, isInitialRequest } from '../../schemas/PlaylistArrayProtocol/InitialRequestSchema.js';
import {
  IPlaylistArrayAPIResponse,
  isPlaylistArrayAPIResponse
} from '../../schemas/PlaylistArrayProtocol/PlaylistArrayAPIResponse.js';
import { IPlaylistItemSchema, isPlaylistItem } from '../../schemas/PlaylistArrayProtocol/PlaylistItemSchema.js';
import { IContinuationItemSchema, isContinuationItem } from '../../schemas/common/ContinuationItemSchema.js';
import { IThumbnailItem } from '../../schemas/common/Thumbnail.js';
import { IInitialRequestTabSchema } from '../../schemas/PlaylistArrayProtocol/InitialRequestTabSchema.js';

export interface IPlaylistArrayProtocolData {
  playlistId: string;
  name: string;
  videosCountText: string;
  videosCount: number;
  thumbnail: IThumbnailItem;
  isRecentlyUpdated: boolean;
}
export interface IPlaylistArrayProtocolConstructor {
  channelId: string;
}

export class PlaylistArrayProtocol implements IBaseProtocol<IPlaylistArrayProtocolData[]> {
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
  private data: IPlaylistArrayProtocolData[] = [];
  private html: string = '';
  constructor(private readonly options: IPlaylistArrayProtocolConstructor) {}

  public async init(): Promise<IParseResult<IPlaylistArrayProtocolData[]>> {
    /**
     * Make GET Request for Channel Homepage
     */
    this.html = await miniget(`https://www.youtube.com/channel/${this.options.channelId}/playlists`, {
      method: 'GET'
    }).text();

    /**
     * Extract JSON data from Channel Homepage HTML
     */
    const data = this.extractJsonFromHTML();

    /**
     * Convert JSON to ProtocolData
     */
    const wrapper = data.contents.twoColumnBrowseResultsRenderer.tabs.find(
      (tab) => typeof tab['tabRenderer'] !== 'undefined' && tab['tabRenderer'].title === 'Playlists'
    ) as IInitialRequestTabSchema;

    const itemsWrapper = wrapper.tabRenderer.content.sectionListRenderer.contents
      .shift()!
      .itemSectionRenderer.contents.shift()!.gridRenderer.items;

    this.data = (itemsWrapper.filter((item: any) => isPlaylistItem(item)) as IPlaylistItemSchema[]).map(
      ({ gridPlaylistRenderer }) => ({
        name: gridPlaylistRenderer.title.runs.shift()?.text || '',
        playlistId: gridPlaylistRenderer.playlistId,
        thumbnail: gridPlaylistRenderer.thumbnail.thumbnails.slice(-1).shift()!,
        videosCount: Number(gridPlaylistRenderer.videoCountShortText.simpleText),
        videosCountText: gridPlaylistRenderer.videoCountShortText.simpleText,
        isRecentlyUpdated: !!gridPlaylistRenderer.publishedTimeText?.simpleText || false
      })
    );

    const continuation: IContinuationItemSchema | undefined = itemsWrapper.find((item) => isContinuationItem(item));

    if (continuation) {
      this.requestContext.continuation =
        continuation.continuationItemRenderer.continuationEndpoint.continuationCommand.token;
    } else {
      this.requestContext.continuation = '';
    }

    return { success: true, data: this.data };
  }

  private extractJsonFromHTML(): IInitialRequestSchema {
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
    if (!isInitialRequest(json)) {
      throw new Error('Invalid Json Received in Initial Request');
    }

    return json as IInitialRequestSchema;
  }

  public hasNext(): Boolean {
    return !!this.requestContext.continuation;
  }

  public async next(): Promise<IParseResult<IPlaylistArrayProtocolData[]>> {
    /**
     * Make Request to API Endpoint
     */
    const response = await doPost(
      `https://www.youtube.com/youtubei/v1/browse?key=${this.apiKey}&prettyPrint=false`,
      this.requestContext,
      { method: 'POST' }
    );
    const apiData = JSON.parse(response) as IPlaylistArrayAPIResponse;

    /**
     * Validate response
     */
    if (!isPlaylistArrayAPIResponse(apiData)) {
      throw new Error('Invalid API Response Received.');
    }

    /**
     * Convert API Data to Required Data Structure
     */
    const wrapper = apiData.onResponseReceivedActions.shift()!.appendContinuationItemsAction.continuationItems;

    this.data = (wrapper.filter((item) => isPlaylistItem(item)) as IPlaylistItemSchema[]).map(
      ({ gridPlaylistRenderer }) => ({
        name: gridPlaylistRenderer.title.runs.shift()?.text || '',
        playlistId: gridPlaylistRenderer.playlistId,
        thumbnail: gridPlaylistRenderer.thumbnail.thumbnails.slice(-1).shift()!,
        videosCount: Number(gridPlaylistRenderer.videoCountShortText.simpleText),
        videosCountText: gridPlaylistRenderer.videoCountShortText.simpleText,
        isRecentlyUpdated: !!gridPlaylistRenderer.publishedTimeText?.simpleText || false
      })
    );

    const continuation = wrapper.find((item) => isContinuationItem(item)) as IContinuationItemSchema | undefined;

    if (continuation) {
      this.requestContext.continuation =
        continuation.continuationItemRenderer.continuationEndpoint.continuationCommand.token;
    } else {
      this.requestContext.continuation = '';
    }

    return { success: true, data: this.data };
  }
}

// const main = async () => {
//   const instance = new PlaylistArrayProtocol({ channelId: 'UCBVCi5JbYmfG3q5MEuoWdOw' })
//   const { data } = await instance.init()
//   let count = 0
//   const fs = require('fs')
//   fs.writeFileSync(`data/PlaylistArray/${++count}.json`, JSON.stringify(data, null, 2))
//   while (instance.hasNext()) {
//     const { data } = await instance.next()
//     fs.writeFileSync(`data/PlaylistArray/${++count}.json`, JSON.stringify(data, null, 2))
//   }
// }

// main()

// TODO: Code duplicacy can be reduced in this codebase by rearranging the code inside class.
// 1. Seperation of filtering continuation item and data can be seperated in a function.
// TODO: error handling should be improvded to provide troubleshooting information inisde is<FuncName> functions to validate schema.
