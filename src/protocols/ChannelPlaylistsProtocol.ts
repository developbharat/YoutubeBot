import { IPlaylistItem } from '../DataClasses/ChannelPlaylists/index.js';
import { ChannelPlaylistsParser } from '../DataParsers/ChannelPlaylistsParser.js';
import { HttpRequestMaker } from '../RequestMakers/index.js';
import { IBaseProtocol, IParseResult } from '../common/IBaseProtocol.js';
import { extractJSONFromHTML } from '../common/utils.js';

interface IContinueDetails {
  clientVersion: string;
  apiKey: string;
  continuationToken: string | null;
}

export class ChannelPlaylistsProtocol implements IBaseProtocol<IPlaylistItem[]> {
  private continueDetails: IContinueDetails | null = null;
  private htmlRequestMaker = new HttpRequestMaker();

  constructor(private readonly channelId: string) {}

  public async init(): Promise<IParseResult<IPlaylistItem[]>> {
    // Make GET Request for Channel Playlists page
    const url = `https://www.youtube.com/channel/${this.channelId}/playlists`;
    const res1 = await this.htmlRequestMaker.makeHTMLRequest({ url: url });
    if (!res1.success) throw res1.error!;

    // Extract data from Channel Playlists page
    const extracted = extractJSONFromHTML(res1.data);
    const basicData = await ChannelPlaylistsParser.parseHtmlData(extracted.json);
    if (!basicData.success) throw basicData.error;

    this.continueDetails = {
      apiKey: extracted.apiKey,
      clientVersion: extracted.clientVersion,
      continuationToken: basicData.extras.continuationToken
    };

    return { success: true, data: basicData.data.map((item) => item.toJSON()) };
  }

  public hasNext(): Boolean {
    return !!this.continueDetails?.continuationToken;
  }

  public async next(): Promise<IParseResult<IPlaylistItem[]>> {
    if (!this.continueDetails) throw new Error('Continue details must be available to make API Request.');
    if (!this.continueDetails.continuationToken) throw new Error('continuation token is required to make API Request.');

    // Make GET Request for Channel Playlists page
    const url = `https://www.youtube.com/youtubei/v1/browse?key=${this.continueDetails.apiKey}&prettyPrint=false`;
    const res1 = await this.htmlRequestMaker.makeAPIRequest({
      url: url,
      clientVersion: this.continueDetails.clientVersion,
      continuation: this.continueDetails.continuationToken
    });
    if (!res1.success) throw res1.error!;

    // Parse API Data
    const basicData = await ChannelPlaylistsParser.parseAPIData(res1.data);
    if (!basicData.success) throw basicData.error;

    // Update Continuation details
    this.continueDetails.continuationToken = basicData.extras.continuationToken;

    return { success: true, data: basicData.data.map((item) => item.toJSON()) };
  }
}

// const main = async () => {
//   const instance = new ChannelPlaylistsProtocol('UCBVCi5JbYmfG3q5MEuoWdOw');
//   const { data } = await instance.init();

//   let count = 0;
//   // const fs = require('fs');
//   fs.writeFileSync(`data/PlaylistArray/${++count}.json`, JSON.stringify(data, null, 2));
//   while (instance.hasNext()) {
//     const { data } = await instance.next();
//     fs.writeFileSync(`data/PlaylistArray/${++count}.json`, JSON.stringify(data, null, 2));
//   }
// };

// main();
