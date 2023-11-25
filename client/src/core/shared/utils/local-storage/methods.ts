export class LocalStorage {
  private static _localStorage: Storage = localStorage;
  static store<T>(key: string, value: T): void {
    try {
      if (typeof value === 'string') {
        this._localStorage.setItem(key, value);
      } else if (typeof value === 'number') {
        this._localStorage.setItem(key, value.toString());
      } else if (typeof value === 'boolean') {
        this._localStorage.setItem(key, value.toString());
      } else if (Array.isArray(value)) {
        this._localStorage.setItem(key, JSON.stringify(value));
      } else {
        throw new NotAllowedDataTypeException();
      }
    } catch (error) {
      throw new SomethingWrongException();
    }
  }

  static fetch<T>(key: string): T | null {
    try {
      const storedValue = this._localStorage.getItem(key);

      if (storedValue === null) {
        return null;
      }

      if (typeof storedValue === 'string') {
        return storedValue as unknown as T;
      } else if (typeof storedValue === 'number') {
        return parseFloat(storedValue) as unknown as T;
      } else if (typeof storedValue === 'boolean') {
        return (storedValue === 'true') as unknown as T;
      } else {
        return JSON.parse(storedValue) as unknown as T;
      }
    } catch (error) {
      throw new SomethingWrongException();
    }
  }
}

class NotAllowedDataTypeException extends Error {
  constructor() {
    super('The data type is not allowed for storage');
    this.name = 'NotAllowedDataTypeException';
  }
}

class SomethingWrongException extends Error {
  constructor() {
    super('Something went wrong while accessing storage');
    this.name = 'SomethingWrongException';
  }
}
