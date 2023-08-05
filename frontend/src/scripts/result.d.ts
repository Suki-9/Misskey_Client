declare class Ok<T> {
  readonly value: T;

  constructor(value: T);

  readonly type: "Ok";

  isOk(): this is Ok<T>;
  isErr(): this is Err<Error>;
  unwrap_or(default_: T): T; // エラー時引数の値を返す
  unwrap(): T; // エラー時例外を投げる
}

declare class Err<E extends Error> {
  readonly error: E;

  constructor(error: E);

  readonly type: "Err";

  isOk(): this is Ok<unknown>;
  isErr(): this is Err<E>;
  unwrap_or(default_: T): T;
  unwrap(): never;
}

type Result<T, E extends Error> = Ok<T> | Err<E>;
