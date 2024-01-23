import fs from 'fs';
import miniget from 'miniget';
import { IBaseProtocol, IParseResult } from '../common/IBaseProtocol.js';
import { IThumbnailItem } from '../schemas/common/Thumbnail.js';
import { jsonAfter, between, doPost, subsToBigInt } from '../common/utils.js';
import { InitialRequestSchema, IInitialRequestSchema } from '../schemas/PlaylistVideosProtocol/InitialRequestSchema.js';
import { IContinuationItemSchema, isContinuationItem } from '../schemas/common/ContinuationItemSchema.js';
import { IPlaylistVideoItemSchema } from '../schemas/PlaylistVideosProtocol/PlaylistVideoItemSchema.js';

export interface IPlaylistVideo {
  title: string;
}

export interface IPlaylistVideosData {
  thumbnail: IThumbnailItem; // Playlist thumbnail image
  name: string; // name of playlist
  description: string; // playlist description
  totalVideosCountText: string; // total videos available in playlist
  totalVideosCount: bigint; // total videos available in playlist
  totalViewsCountText: string; // total views on videos in playlist
  totalViewsCount: bigint; // total views on videos in playlist
  videos: IPlaylistVideo[]; // videos in a playlist
}

export interface IPlaylistVideosConstructor {
  playlistId: string;
}

export class PlaylistVideosProtocol implements IBaseProtocol<IPlaylistVideosData> {
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
  private data: IPlaylistVideosData | null = null;
  private html: string = '';
  constructor(private readonly options: IPlaylistVideosConstructor) {}

  public async init(): Promise<IParseResult<IPlaylistVideosData>> {
    /**
     * Make GET Request for Channel Homepage
     */
    this.html = await miniget(`https://www.youtube.com/playlist?list=${this.options.playlistId}`, {
      method: 'GET'
    }).text();

    /**
     * Extract JSON data from Channel Homepage HTML
     */
    await this.parseHomeHTMLToData();

    /**
     * Make Request to about dialog to fetch additional details.
     */
    // const response = await doPost(
    //   `https://www.youtube.com/youtubei/v1/browse?key=${this.apiKey}&prettyPrint=false`,
    //   this.requestContext,
    //   { method: 'POST' }
    // );

    // /**
    //  * Validate about data.
    //  */
    // const aboutData = JSON.parse(response) as IAPIResonseSchema;
    // const parsed = APIResponseSchema.safeParse(aboutData);
    // if (!parsed.success) {
    //   console.log({ parsed: JSON.stringify(parsed, null, 2) });
    //   throw new Error('Invalid Json Received from about dialogbox');
    // }

    // /**
    //  * Update data to include data from about dialog.
    //  */
    // this.data = this.aboutJsonToData(aboutData);

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
    const contentsWrapper =
      data.contents.twoColumnBrowseResultsRenderer.tabs.shift()!.tabRenderer.content.sectionListRenderer.contents;

    const continuation: IContinuationItemSchema | undefined = contentsWrapper.find((item) =>
      isContinuationItem(item)
    ) as any;

    if (continuation) {
      this.requestContext.continuation =
        continuation.continuationItemRenderer.continuationEndpoint.continuationCommand.token;
    } else {
      this.requestContext.continuation = '';
    }

    console.log({ continuation: this.requestContext.continuation });

    /**
     * Update main data from Parsed Json
     */
    this.data = this.initReqJsonToData(data);
  }

  private initReqJsonToData(data: IInitialRequestSchema): IPlaylistVideosData {
    const contentsWrapper =
      data.contents.twoColumnBrowseResultsRenderer.tabs.shift()!.tabRenderer.content.sectionListRenderer.contents;

    const videosList: IPlaylistVideoItemSchema[] | undefined = contentsWrapper.find((item) =>
      isContinuationItem(item)
    ) as any;
  }

  public hasNext(): Boolean {
    return false;
  }

  public async next(): Promise<IParseResult<IPlaylistVideosData>> {
    throw new Error('Method not implemented.');
  }
}

const main = async () => {
  const instance = new PlaylistVideosProtocol({ playlistId: 'PLT98CRl2KxKHy4A5N70jMRYAROzzC2a6x' });
  const { data } = await instance.init();
  // const fs = require('fs');
  fs.writeFileSync(
    'channel-data.json',
    JSON.stringify(data, (_k, value) => (typeof value === 'bigint' ? value.toString() : value), 2),
    { encoding: 'utf8' }
  );
};

main();
