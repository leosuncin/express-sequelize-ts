export class NotFoundEntityError extends Error {
  public override readonly name = 'NotFoundEntityError';

  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  constructor(entityName: string, id: number) {
    super(`${entityName} with id ${id} not found`);
  }
}
