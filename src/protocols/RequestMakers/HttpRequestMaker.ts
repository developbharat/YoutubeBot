import { IGetRequestOptions, IPostRequestOptions, IRequestMaker, IRequestMakerResult } from './IRequestMaker.js';

export class HttpRequestMaker implements IRequestMaker {
  async makeHTMLRequest(options: IGetRequestOptions): Promise<IRequestMakerResult> {
    throw new Error('Method not implemented.');
  }
  async makeAPIRequest<TResult = object>(options: IPostRequestOptions): Promise<IRequestMakerResult> {
    throw new Error('Method not implemented.');
  }
}
