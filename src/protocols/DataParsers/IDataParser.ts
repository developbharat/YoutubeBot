export interface IResult<TData> {
  success: boolean;
  data: TData;
  error: Error | null;
}

export interface IDataParser<THTMLData, TAPIData> {
  parseHtmlData(json: string): Promise<IResult<THTMLData>>;
  parseAPIData(json: string): Promise<IResult<TAPIData>>;
}
