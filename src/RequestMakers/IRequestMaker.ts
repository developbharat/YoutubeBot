interface IRequestCommonOptions {
  url: string;
}

export interface IGetRequestOptions extends IRequestCommonOptions {
  qs?: Record<string, any>;
}

export interface IPostRequestOptions<>extends IRequestCommonOptions {
  clientVersion: string;
  continuation?: string;
}

export type IRequestMakerResult = { success: true; data: string } | { success: false; error: Error };

export interface IRequestMaker {
  makeHTMLRequest(options: IGetRequestOptions): Promise<IRequestMakerResult>;
  makeAPIRequest(options: IPostRequestOptions): Promise<IRequestMakerResult>;
}
