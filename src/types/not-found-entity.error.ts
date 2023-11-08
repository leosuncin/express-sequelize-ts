export class NotFoundEntityError extends Error {
  public override readonly name = 'NotFoundEntityError';

  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  constructor(
    entityName: string,
    id: number | Record<string, number | string>,
  ) {
    if (typeof id === 'object' && id !== null) {
      const pairs = Object.entries(id);

      if (pairs.length !== 1) {
        super(`${entityName} not found`);
      }

      const [key, value] = pairs[0] as [string, number | string];

      super(`${entityName} with ${key} ${value} not found`);
      return;
    }

    super(`${entityName} with id ${id} not found`);
  }
}
