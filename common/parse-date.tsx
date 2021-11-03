export function dateToISOStringArgentina(dateString: string): string {
  return new Date(new Date(dateString).toISOString().slice(0, -1) + "-03:00").toISOString();
}