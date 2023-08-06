class Ok<T> {
  readonly value: T;
  readonly type = "Ok";
  constructor(value: T) {
    this.value = value;
  }
  isOk(): this is Ok<T> {
    return true;
  }
  isErr(): this is Err<Error> {
    return false;
  }
  unwrap_or() {
    return this.value;
  }
  unwrap() {
    return this.value;
  }
}

class Err<E extends Error> {
  readonly error: E;
  readonly type = "Err";
  constructor(error: E) {
    this.error = error;
  }
  isOk(): this is Ok<unknown> {
    return false;
  }
  isErr(): this is Err<E> {
    return true;
  }
  unwrap_or<T>(default_: T): T {
    return default_;
  }
  unwrap(): never {
    throw this.error;
  }
}

(window as any).Ok = Ok;
(window as any).Err = Err;
