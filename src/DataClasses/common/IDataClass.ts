export interface ISerializable {
  toJSON(): any;
}

export abstract class DataClass implements ISerializable {
  abstract isValid(): boolean;
  abstract toJSON(): any;
}
