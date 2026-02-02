export function toISODate(date: string): string {
  // date: "2026-01-29"
  return new Date(`${date}T00:00:00Z`).toISOString();
}
