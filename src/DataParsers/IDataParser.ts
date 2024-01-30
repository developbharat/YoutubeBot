export type IResult<TData, TExtras> =
  | { success: true; data: TData; extras: TExtras }
  | { success: false; error: Error };

export interface ITokenExtras {
  continuationToken: string | null;
}

export interface IDataParser<THTMLData, TAPIData, THTMLExtras, TAPIExtras> {
  parseHtmlData(json: string): Promise<IResult<THTMLData, THTMLExtras>>;
  parseAPIData(json: string): Promise<IResult<TAPIData, TAPIExtras>>;
}
