import { type CamelCase } from '@/utils/types';

export function camelCase<Key extends string>(str: Key): CamelCase<Key> {
  return str.replace(/_([a-z])/gu, (g) =>
    g.charAt(1).toUpperCase(),
  ) as CamelCase<Key>;
}
