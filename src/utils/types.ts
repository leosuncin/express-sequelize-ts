export type RemovePrefix<
  S extends string,
  Prefix extends string,
> = S extends `${Prefix}${infer Rest}` ? Rest : S;

export type CamelCase<S extends string> =
  S extends `${infer P1}_${infer P2}${infer P3}`
    ? `${Lowercase<P1>}${Uppercase<P2>}${CamelCase<P3>}`
    : Lowercase<S>;

export type Nullish<T> = {
  [K in keyof T]?: T[K] | null | undefined;
} & object;

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & object;
