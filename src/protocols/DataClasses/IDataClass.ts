export interface ISerializable {
  toJSON(): any;
}

// export interface IDataClass extends ISerializable {}

export abstract class DataClass implements ISerializable {
  static isValid: (data: any, full?: boolean) => boolean;

  abstract toJSON(): any;
}
