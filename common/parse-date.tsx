import moment from "moment-timezone";

export function dateToISOStringArgentina(dateString: string): string {
  return moment(dateString)
    .parseZone()
    .tz("America/Argentina/Buenos_Aires", true)
    .toISOString(true);
}

export function dateToInputFormat(dateString: string): string {
  return moment(dateString)
    .parseZone()
    .format('YYYY-MM-DD');
}

export function dateToARGFormat(dateString: string): string {
  return new Date(dateString).toLocaleDateString('es-AR');
}
