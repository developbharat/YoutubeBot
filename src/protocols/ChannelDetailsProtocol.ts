import { ChannelAboutDetails, IChannelAboutCombinedDetails } from '../DataClasses/index.js';
import { AboutChannelParser } from '../DataParsers/index.js';
import { HttpRequestMaker } from '../RequestMakers/index.js';
import { IBaseProtocol, IParseResult, extractJSONFromHTML, findKeyInObject } from '../common/index.js';

export class ChannelDetailsProtocol implements IBaseProtocol<IChannelAboutCombinedDetails> {
  constructor(private readonly channelId: string) {}

  public async init(): Promise<IParseResult<IChannelAboutCombinedDetails>> {
    // Make GET Request for Channel Homepage
    const htmlRequestMaker = new HttpRequestMaker();
    const url = `https://www.youtube.com/channel/${this.channelId}`;
    const res1 = await htmlRequestMaker.makeHTMLRequest({ url: url });
    if (!res1.success) throw res1.error!;

    // Parse JSON from HTML and extract details
    const extracted = extractJSONFromHTML(res1.data);
    const basicData = await AboutChannelParser.parseHtmlData(extracted.json);
    if (!basicData.success) throw basicData.error;

    // Find continuation token
    const wrapper = findKeyInObject(JSON.parse(extracted.json) || {}, 'engagementPanelSectionListRenderer');
    const continuationToken = findKeyInObject<{ token: string }>(wrapper || {}, 'continuationCommand')?.token;

    // make API request for about channel dialog box.
    const res2 = await htmlRequestMaker.makeAPIRequest({
      url: `https://www.youtube.com/youtubei/v1/browse?key=${extracted.apiKey}&prettyPrint=false`,
      clientVersion: extracted.clientVersion,
      continuation: continuationToken
    });
    if (!res2.success) throw res2.error;

    // Parse about channel about dialogbox details
    const apiData = await AboutChannelParser.parseAPIData(res2.data);
    if (!apiData.success) throw apiData.error;

    // combine basic and html data to about channel data
    const combinedData = new ChannelAboutDetails({ apiData: apiData.data, htmlData: basicData.data });
    return { success: true, data: combinedData.toJSON() };
  }

  public hasNext(): Boolean {
    return false;
  }

  public async next(): Promise<IParseResult<IChannelAboutCombinedDetails>> {
    throw new Error('Method not implemented.');
  }
}

// const main = async () => {
//   const instance = new ChannelDetailsProtocol('UCMjaue7QI8Y3Ipj0oCxXipw');
//   const { data } = await instance.init();
//   // const fs = require('fs');
//   fs.writeFileSync(
//     'channel-data.json',
//     JSON.stringify(data, (_k, value) => (typeof value === 'bigint' ? value.toString() : value), 2),
//     { encoding: 'utf8' }
//   );
// };

// main();
