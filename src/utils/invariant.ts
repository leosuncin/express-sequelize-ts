export function invariant<Data>(
  data?: Data,
  message = 'Invariant violation',
): asserts data {
  if (!data) {
    throw new Error(message);
  }
}
