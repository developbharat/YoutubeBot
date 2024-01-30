import { IGetRequestOptions, IPostRequestOptions, IRequestMaker, IRequestMakerResult } from './IRequestMaker.js';
import miniget from 'miniget';

export class HttpRequestMaker implements IRequestMaker {
  async makeHTMLRequest(options: IGetRequestOptions): Promise<IRequestMakerResult> {
    try {
      /**
       * Prepare URL with search params
       */
      const url = new URL(options.url);
      if (!!options.qs) Object.entries(options.qs).forEach(([key, value]) => url.searchParams.set(key, value));

      /**
       * Make HTML Request
       */
      const html = await miniget(url, { method: 'GET' }).text();
      return { success: true, data: html };
    } catch (err) {
      return { success: false, error: new Error(err) };
    }
  }

  async makeAPIRequest(options: IPostRequestOptions): Promise<IRequestMakerResult> {
    try {
      /**
       * Prepare post request
       */
      const payload = `{ 
        "context": {
          "client": { "utcOffsetMinutes": 0, "gl": "US", "hl": "en", "clientName": "WEB", "clientVersion": "${options.clientVersion}" },
          "user": {}, "request": {}
        },
        "continuation": "${options.continuation}"
      }`;

      const req = miniget(options.url, { method: 'POST' });
      req.once('request', (r) => r.write(payload));

      /**
       * Wait for request response
       */
      const result = await req.text();
      return { success: true, data: result };
    } catch (err) {
      return { success: false, error: new Error(err) };
    }
  }
}
