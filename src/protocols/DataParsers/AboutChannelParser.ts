import { ChannelAboutDetails } from '../DataClasses/ChannelAboutDetails.js';
import { IDataParser, IResult } from './IDataParser.js';

// TODO: use Omit<> or Pick<> to declare complete typesafe responses.
type IHTMLResult = Partial<ChannelAboutDetails>;
type IAPIResult = Partial<ChannelAboutDetails>;

export class AboutChannelParser implements IDataParser<IHTMLResult, IAPIResult> {
  async parseHtmlData(json: string): Promise<IResult<IHTMLResult>> {
    throw new Error('Method not implemented.');
  }
  async parseAPIData(json: string): Promise<IResult<IAPIResult>> {
    throw new Error('Method not implemented.');
  }
}
