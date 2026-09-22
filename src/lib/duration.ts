// prettier-ignore
const PT_MONTHS: Record<string, number> = {
  jan: 0, fev: 1, mar: 2, abr: 3, mai: 4, jun: 5,
  jul: 6, ago: 7, set: 8, out: 9, nov: 10, dez: 11,
};

export const CURRENT_PERIOD = "Atual";

/** Separador usado nos períodos de `profile.ts` (travessão, não hífen). */
const PERIOD_SEPARATOR = " — ";

export function parseMonthYear(text: string): Date {
  const [monthName, year] = text.toLowerCase().trim().split(/\s+/);
  const month = PT_MONTHS[monthName];
  if (month === undefined || !year || Number.isNaN(Number(year))) {
    throw new Error(`Período inválido: "${text}" (esperado "Mai 2022")`);
  }
  return new Date(Number(year), month, 1);
}

/**
 * Meses decorridos entre dois marcos mensais, contando o mês inicial.
 * Um período que começa e termina no mesmo mês vale 1 mês.
 *
 * Quando o fim é `Atual`, o mês corrente ainda está em curso e não é
 * contado — senão a experiência aparece um mês maior do que é.
 */
export function monthsBetween(startText: string, endText: string, now = new Date()): number {
  const start = parseMonthYear(startText);
  const isOngoing = endText === CURRENT_PERIOD;
  const end = isOngoing ? new Date(now.getFullYear(), now.getMonth(), 1) : parseMonthYear(endText);

  const elapsed =
    (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  return Math.max(isOngoing ? elapsed : elapsed + 1, 0);
}

function pluralize(value: number, singular: string, plural: string): string {
  return `${value} ${value === 1 ? singular : plural}`;
}

export function formatMonths(totalMonths: number): string {
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  const parts: string[] = [];
  if (years > 0) parts.push(pluralize(years, "ano", "anos"));
  if (months > 0) parts.push(pluralize(months, "mês", "meses"));
  if (parts.length === 0) return "menos de 1 mês";
  return parts.join(" e ");
}

export function formatDuration(startText: string, endText: string, now = new Date()): string {
  return formatMonths(monthsBetween(startText, endText, now));
}

function splitPeriod(period: string): [string, string] {
  const [start, end] = period.split(PERIOD_SEPARATOR);
  if (!start || !end) {
    throw new Error(`Período inválido: "${period}" (esperado "Mai 2022 — Atual")`);
  }
  return [start.trim(), end.trim()];
}

/**
 * Duração total na empresa: do início do cargo mais antigo até o fim do mais
 * recente. Não soma os cargos — eles são sequenciais, somar contaria o
 * mesmo tempo duas vezes.
 */
export function computeCompanyDuration(
  roles: readonly { period: string }[],
  now = new Date(),
): string {
  const bounds = roles.map(({ period }) => splitPeriod(period));

  const starts = bounds.map(([start]) => parseMonthYear(start).getTime());
  const earliestStart = bounds[starts.indexOf(Math.min(...starts))][0];

  const ends = bounds.map(([, end]) => end);
  if (ends.includes(CURRENT_PERIOD)) {
    return formatDuration(earliestStart, CURRENT_PERIOD, now);
  }

  const endTimes = ends.map((end) => parseMonthYear(end).getTime());
  const latestEnd = ends[endTimes.indexOf(Math.max(...endTimes))];
  return formatDuration(earliestStart, latestEnd, now);
}

/** Tempo total de carreira, arredondado para baixo: "6+ anos". */
export function formatExperienceYears(careerStart: string, now = new Date()): string {
  const years = Math.floor(monthsBetween(careerStart, CURRENT_PERIOD, now) / 12);
  return `${years}+ ${years === 1 ? "ano" : "anos"}`;
}
