/** Parse a positive integer route param (`:id`). */
export function parseRouteId(
  raw: string | string[] | undefined,
): number | null {
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (typeof value !== "string" || value === "") {
    return null;
  }
  const id = Number.parseInt(value, 10);
  if (!Number.isFinite(id) || id < 1) {
    return null;
  }
  return id;
}
