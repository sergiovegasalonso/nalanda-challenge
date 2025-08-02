export function getEnumNameByValue<T extends Record<string, string | number>>(
  enumObj: T,
  value: number
): string {
  const key = Object.keys(enumObj).find(k => enumObj[k] === value);
  return key || '';
}
