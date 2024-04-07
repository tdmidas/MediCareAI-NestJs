// utils.ts
export function convertToPlainObject(obj: any): { [key: string]: any } {
  return JSON.parse(JSON.stringify(obj));
}
