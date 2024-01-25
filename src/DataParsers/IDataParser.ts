export type IResult<TData> = { success: true; data: TData } | { success: false; error: Error };

export interface IDataParser<THTMLData, TAPIData> {
  parseHtmlData(json: string): Promise<IResult<THTMLData>>;
  parseAPIData(json: string): Promise<IResult<TAPIData>>;
}
