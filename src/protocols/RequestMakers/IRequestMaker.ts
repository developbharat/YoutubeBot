interface IRequestCommonOptions {
  url: string;
}

export interface IGetRequestOptions extends IRequestCommonOptions {
  method?: 'GET';
  qs?: Record<string, any>;
}

export interface IPostRequestOptions<>extends IRequestCommonOptions {
  method?: 'POST';
  clientVersion: string;
  continuation?: string;
}

export interface IRequestMakerResult {
  success: boolean;
  data: string;
  error: Error | null;
}

export interface IRequestMaker {
  makeHTMLRequest(options: IGetRequestOptions): Promise<IRequestMakerResult>;
  makeAPIRequest(options: IPostRequestOptions): Promise<IRequestMakerResult>;
}
