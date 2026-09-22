import { describe, expect, it } from "vitest";

import { profile } from "./profile";
import { CURRENT_PERIOD, monthsBetween, parseMonthYear } from "@/lib/duration";

/**
 * Integridade da linha do tempo profissional. Erro de data em currículo não
 * quebra o build por conta própria — a página renderiza normalmente com um
 * período sobreposto ou uma lacuna que não existiu. Estes testes transformam
 * isso em falha visível.
 */

const NOW = new Date(2026, 8, 22);
const NOW_INDEX = NOW.getFullYear() * 12 + NOW.getMonth();

/** Converte "Mai 2022" no número absoluto de meses, para comparar períodos. */
function monthIndex(text: string): number {
  const date = parseMonthYear(text);
  return date.getFullYear() * 12 + date.getMonth();
}

type Window = { start: number; end: number; label: string };

const windows: Window[] = profile.companyGroups
  .flatMap((group) =>
    group.roles.map((role) => {
      const [start, end] = role.period.split(" — ");
      return {
        start: monthIndex(start),
        // Um cargo em curso vai até o mês anterior ao corrente: o mês atual
        // ainda não terminou.
        end: end === CURRENT_PERIOD ? NOW_INDEX - 1 : monthIndex(end),
        label: `${group.company} · ${role.role}`,
      };
    }),
  )
  .sort((a, b) => a.start - b.start);

describe("linha do tempo profissional", () => {
  it("nenhum período termina antes de começar", () => {
    for (const w of windows) {
      expect(w.end, w.label).toBeGreaterThanOrEqual(w.start);
    }
  });

  it("não há sobreposição entre cargos", () => {
    const overlaps = windows
      .slice(1)
      .map((current, i) => ({ previous: windows[i], current }))
      .filter(({ previous, current }) => current.start <= previous.end)
      .map(({ previous, current }) => `"${previous.label}" x "${current.label}"`);

    expect(overlaps).toEqual([]);
  });

  it("não há lacuna entre cargos", () => {
    const gaps = windows
      .slice(1)
      .map((current, i) => ({ previous: windows[i], current }))
      .filter(({ previous, current }) => current.start - previous.end > 1)
      .map(
        ({ previous, current }) =>
          `${current.start - previous.end - 1} mês(es) entre "${previous.label}" e "${current.label}"`,
      );

    expect(gaps).toEqual([]);
  });

  it("careerStart coincide com o início do cargo mais antigo", () => {
    expect(monthIndex(profile.careerStart)).toBe(windows[0].start);
  });

  it("o tempo derivado bate com a soma dos períodos", () => {
    const worked = windows.reduce((total, w) => total + (w.end - w.start + 1), 0);
    expect(monthsBetween(profile.careerStart, CURRENT_PERIOD, NOW)).toBe(worked);
  });

  it("exatamente um cargo está marcado como atual", () => {
    const current = profile.companyGroups.flatMap((g) => g.roles).filter((r) => r.current);
    expect(current).toHaveLength(1);
  });
});
