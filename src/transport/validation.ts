// У PostgreSQL тип Int зберігає числа до 2147483647.
export function isValidId(value: unknown): boolean {
  return (
    (typeof value === "number" || typeof value === "string") &&
    /^[1-9]\d*$/.test(String(value)) &&
    Number(value) <= 2147483647
  );
}
