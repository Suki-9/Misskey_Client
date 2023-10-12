import neverthrow from 'neverthrow'

declare global { 
  type Ok = neverthrow.Ok;
  type Err = neverthrow.Err;
  type Result = neverthrow.Ok<T, E> | neverthrow.Err<T, E>;
  const ok = neverthrow.ok
  const err = neverthrow.err
}
