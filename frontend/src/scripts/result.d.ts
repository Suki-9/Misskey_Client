declare class Ok<T> {
  readonly value: T;

  constructor(value: T);

  readonly type: "Ok";

  isOk(): this is Ok<T>;
  isErr(): this is Err<Error>;
  unwrap(): T;
}

declare class Err<E extends Error> {
  readonly error: E;

  constructor(error: E);

  readonly type: "Err";

  isOk(): this is Ok<unknown>;
  isErr(): this is Err<E>;
  unwrap(): never;
}

type Result<T, E extends Error> = Ok<T> | Err<E>;
