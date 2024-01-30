import { IPlaylistDetails, PlaylistDetails } from '../DataClasses/PlaylistVideos/index.js';
import { PlaylistVideosParser } from '../DataParsers/PlaylistVideosParser.js';
import { HttpRequestMaker } from '../RequestMakers/index.js';
import { IBaseProtocol, IParseResult } from '../common/IBaseProtocol.js';
import { extractJSONFromHTML } from '../common/utils.js';

interface IContinueDetails {
  clientVersion: string;
  apiKey: string;
  continuationToken: string | null;
}

export class PlaylistVideosProtocol implements IBaseProtocol<IPlaylistDetails> {
  private basicDetails: PlaylistDetails | null = null;
  private continueDetails: IContinueDetails | null = null;
  private htmlRequestMaker = new HttpRequestMaker();

  constructor(private readonly playlistId: string) {}

  public async init(): Promise<IParseResult<IPlaylistDetails>> {
    // Make GET Request for Channel Playlists page

    const url = `https://www.youtube.com/playlist?list=${this.playlistId}`;
    const res1 = await this.htmlRequestMaker.makeHTMLRequest({ url: url });
    if (!res1.success) throw res1.error!;

    // Extract data from Channel Playlists page
    const extracted = extractJSONFromHTML(res1.data);
    const basicData = await PlaylistVideosParser.parseHtmlData(extracted.json);
    if (!basicData.success) throw basicData.error;

    this.continueDetails = {
      apiKey: extracted.apiKey,
      clientVersion: extracted.clientVersion,
      continuationToken: basicData.extras.continuationToken
    };

    // Store basic details we won't be parsing them again.
    this.basicDetails = basicData.data;

    return { success: true, data: basicData.data.toJSON() };
  }

  public hasNext(): Boolean {
    return !!this.continueDetails?.continuationToken;
  }

  public async next(): Promise<IParseResult<IPlaylistDetails>> {
    if (!this.continueDetails) throw new Error('Continue details must be available to make API Request.');
    if (!this.continueDetails.continuationToken) throw new Error('continuation token is required to make API Request.');

    // Make API Request
    const url = `https://www.youtube.com/youtubei/v1/browse?key=${this.continueDetails.apiKey}&prettyPrint=false`;
    const res1 = await this.htmlRequestMaker.makeAPIRequest({
      url: url,
      clientVersion: this.continueDetails.clientVersion,
      continuation: this.continueDetails.continuationToken
    });
    if (!res1.success) throw res1.error!;

    // Parse API Data
    const apiData = await PlaylistVideosParser.parseAPIData(res1.data);
    if (!apiData.success) throw apiData.error;

    // Update Continuation details
    this.continueDetails.continuationToken = apiData.extras.continuationToken;

    // Create playlist details from parsed data.
    if (!this.basicDetails) throw new Error('basic details are missing. You must fetch them first.');
    const details = {
      ...this.basicDetails.toJSON(),
      videos: apiData.data.map((item) => item.toJSON())
    };

    return { success: true, data: details };
  }
}

// const main = async () => {
//   const instance = new PlaylistVideosProtocol('PLxbwE86jKRgMpuZuLBivzlM8s2Dk5lXBQ');
//   const { data } = await instance.init();

//   let count = 0;
//   fs.writeFileSync(`data/${++count}.json`, JSON.stringify(data, null, 2));
//   while (instance.hasNext()) {
//     const { data } = await instance.next();
//     fs.writeFileSync(`data/${++count}.json`, JSON.stringify(data, null, 2));
//   }
// };

// main();
