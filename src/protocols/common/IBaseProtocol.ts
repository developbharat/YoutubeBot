export interface IInitResult {
  success: boolean
  html: string
}

export interface IParseResult<T = object> {
  success: boolean
  data: T
}

export interface IBaseProtocol<T> {
  init(): Promise<IParseResult<T>>
  hasNext(): Boolean
  next(): Promise<IParseResult<T>>
}
