declare class Ok<T> {
  readonly value: T;

  constructor(value: T);

  readonly type: "Ok";

  isOk(): this is Ok<T>;
  isErr(): this is Err<Error>;
}

declare class Err<E extends Error> {
  readonly error: E;

  constructor(error: E);

  readonly type: "Err";

  isOk(): this is Ok<unknown>;
  isErr(): this is Err<E>;
}

type Result<T, E extends Error> = Ok<T> | Err<E>;
