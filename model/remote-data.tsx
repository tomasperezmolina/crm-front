export interface Loading {
  state: "loading";
}

export interface Success<T> {
  state: "success";
  value: T;
}

export interface Error<T> {
  state: "error";
  error: T;
}

export interface NotAsked {
  state: "not-asked";
}

export type RemoteData<E, V> = Loading | Success<V> | Error<E> | NotAsked;

export function notAsked<E, V>(): RemoteData<E, V> {
  return {
    state: "not-asked",
  };
}

export function error<E, V>(error: E): RemoteData<E, V> {
  return {
    state: "error",
    error,
  };
}

export function success<E, V>(value: V): RemoteData<E, V> {
  return {
    state: "success",
    value,
  };
}

export function loading<E, V>(): RemoteData<E, V> {
  return {
    state: "loading",
  };
}
