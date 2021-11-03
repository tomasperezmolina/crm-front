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

export function map<E, V1, V2>(d: RemoteData<E,V1>, f: (v: V1) => V2): RemoteData<E, V2> {
  if (d.state === 'success') {
    return success(f(d.value));
  }
  return d;
}

export function andThen<E, V1, V2>(d: RemoteData<E,V1>, f: (v: V1) => RemoteData<E, V2>): RemoteData<E, V2> {
  if (d.state === 'success') {
    return f(d.value);
  }
  return d;
}
