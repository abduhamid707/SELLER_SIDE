export function cleanObject<T extends object>(obj: T, keysToRemove: (keyof T)[]): Partial<T> {
  const cleaned = { ...obj };
  keysToRemove.forEach((key) => {
    delete cleaned[key];
  });
  return cleaned;
}
