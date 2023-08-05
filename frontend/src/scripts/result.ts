export type Result<T, E extends Error> = Ok<T> | Err<E>;

export class Ok<T> {
  readonly value: T;

  constructor(value: T) {
    this.value = value;
  }
  isOk(): this is Ok<T> {
    return true;
  }
  isErr(): this is Err<Error> {
    return false;
  }
}

export class Err<E extends Error> {
  readonly error: E;

  constructor(error: E) {
    this.error = error;
  }
  isOk(): this is Ok<unknown> {
    return false;
  }
  isErr(): this is Err<E> {
    return true;
  }
}
