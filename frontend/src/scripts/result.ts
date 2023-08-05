type Result<T, E extends Error> = Ok<T> | Err<E>;

class Ok<T> {
  readonly value: T;

  constructor(value: T) {
    this.value = value;
  }

  type = "Ok" as const;

  isOk(): this is Ok<T> {
    return true;
  }
  isErr(): this is Err<Error> {
    return false;
  }
}

class Err<E extends Error> {
  readonly error: E;

  constructor(error: E) {
    this.error = error;
  }

  type = "Err" as const;

  isOk(): this is Ok<unknown> {
    return false;
  }
  isErr(): this is Err<E> {
    return true;
  }
}
