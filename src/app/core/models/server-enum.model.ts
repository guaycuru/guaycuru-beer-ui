import { Utils } from '../../shared/utils';

export class EnumName<T> {
  id: T;
  key: string;
  name: string;

  constructor(id: T, key: string, name: string) {
    this.id = id;
    this.key = key;
    this.name = name;
  }
}

interface ServerEnumData<T, D extends EnumName<T>> {
  // ToDo: Why can't this be { [key in keyof T]: D }?
  [key: string]: D;
}

export class ServerEnumList<T, D extends EnumName<T>> {
  private readonly _type: any;
  private readonly _data: ServerEnumData<T, D>;

  constructor(type: any, data: ServerEnumData<T, D>) {
    this._type = type;
    this._data = data;
  }

  get ids(): T[] {
    return Object.values(this._type).filter((key) => !isNaN(Number(key))) as T[];
  }

  get values(): string[] {
    return Object.values(this._type).filter((key) => isNaN(Number(key))) as string[];
  }

  get data(): EnumName<T>[] {
    return this.values.map(key => this._data[key]);
  }

  getName(key: T|string): string {
    const enumKey = Utils.ensureEnumKey(this._type, key);
    return this._data[this._type[enumKey]]?.name;
  }

  getData(key: T|string): D {
    const enumKey = Utils.ensureEnumKey(this._type, key);
    return this._data[this._type[enumKey]];
  }
}

/**
 * Wrapper for enum values that are received as strings from the server, which allow the app to
 * handle unknown values while still preserving the original string.
 *
 * To learn why we have to use "any" as some types see: https://stackoverflow.com/a/50396312/1934772
 *
 * @param <T> the wrapped enum type
 */
export class ServerEnum<T> {
  matched: T;
  rawValue: string;

  constructor(type: any, value?: T) {
    if (value !== null) {
      this.rawValue = type[value];
      this.matched = value;
    } else {
      this.matched = this.rawValue = null;
    }
  }

  /**
   * Creates a wrapped enum value from the raw string, matching it to an existing enum case if possible
   *
   * @param rawValue the raw value as a string to wrap
   * @param type     the enum to be used for matching
   * @return wrapped enum if passed value
   */
  static from<T>(rawValue: string, type: any): ServerEnum<T> {
    return new ServerEnum<T>(type, type[rawValue]);
  }

  /**
   * Creates a wrapped enum value from the raw string, matching it to an existing enum case if possible.
   * Return null if the input is null or undefined
   *
   * @param rawValue the raw value as a string to wrap
   * @param type     the enum to be used for matching
   * @return wrapped enum if passed value
   */
  static fromOrNull<T>(rawValue: string, type: any): ServerEnum<T> {
    return (rawValue !== null && rawValue !== undefined) ? new ServerEnum<T>(type, type[rawValue]) : null;
  }

  toString(): string {
    return this.rawValue;
  }

  /**
   * Checks if this ServerEnum instance matches the given one
   *
   * @param other ServerEnum instance to compare
   * @return true if it matches, false otherwise
   */
  equals(other: ServerEnum<T>): boolean {
    if (other === null) {
      return false;
    }

    return this === other || this.matched === other.matched;
  }

  /**
   * Checks if the enum value matches the given value
   *
   * @param value enum value to match
   * @return true if it matches, false otherwise
   */
  matches(value: T): boolean {
    return this.matched !== null && this.matched === value;
  }

  /**
   * Checks if the enum value matches any of the given values
   *
   * @param values list of enum values to match
   * @return true if it matches, false otherwise
   */
  matchesAny(values: T[]): boolean {
    return this.matched !== null && values.includes(this.matched);
  }

  /**
   * Returns the name of the enum value that matches the given id, or the raw value if no match is found
   *
   * @param names
   */
  getMatchedName(names: EnumName<T>[]): string {
    const found = names.find(t => this.matched === t.id);
    return found?.name ?? this.rawValue;
  }
}
