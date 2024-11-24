export type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };

export const Result = {
  Ok: <T>(value: T): Result<T> => ({ ok: true, value }),
  Error: <E>(error: E): Result<never, E> => ({ ok: false, error }),
};