import { describe, expect, it } from "vitest";

import {
  computeCompanyDuration,
  formatDuration,
  formatExperienceYears,
  formatMonths,
  monthsBetween,
  parseMonthYear,
} from "./duration";

/** Data fixa: duração que depende de "hoje" não pode variar com o relógio do CI. */
const NOW = new Date(2026, 8, 22); // 22 de setembro de 2026

describe("parseMonthYear", () => {
  it("lê mês abreviado em português, sem diferenciar maiúsculas", () => {
    expect(parseMonthYear("Mai 2022")).toEqual(new Date(2022, 4, 1));
    expect(parseMonthYear("dez 2019")).toEqual(new Date(2019, 11, 1));
  });

  it("rejeita mês desconhecido em vez de cair em janeiro silenciosamente", () => {
    expect(() => parseMonthYear("Mar? 2022")).toThrow(/Período inválido/);
    expect(() => parseMonthYear("Mai")).toThrow(/Período inválido/);
  });
});

describe("monthsBetween", () => {
  it("conta o mês inicial e o final em períodos encerrados", () => {
    expect(monthsBetween("Jan 2022", "Jan 2022")).toBe(1);
    expect(monthsBetween("Jan 2022", "Mar 2022")).toBe(3);
    expect(monthsBetween("Nov 2019", "Set 2020")).toBe(11);
  });

  it("não conta o mês corrente quando o período está em curso", () => {
    // Set/2026 ainda está acontecendo: de Ago/2024 até aqui são 25 meses
    // completos, não 26 — era o bug que inflava o tempo de casa.
    expect(monthsBetween("Ago 2024", "Atual", NOW)).toBe(25);
    expect(monthsBetween("Set 2026", "Atual", NOW)).toBe(0);
  });

  it("nunca devolve valor negativo", () => {
    expect(monthsBetween("Jan 2030", "Atual", NOW)).toBe(0);
  });
});

describe("formatMonths", () => {
  it("usa singular e plural corretamente", () => {
    expect(formatMonths(1)).toBe("1 mês");
    expect(formatMonths(2)).toBe("2 meses");
    expect(formatMonths(12)).toBe("1 ano");
    expect(formatMonths(13)).toBe("1 ano e 1 mês");
    expect(formatMonths(26)).toBe("2 anos e 2 meses");
  });

  it("omite a parte zerada", () => {
    expect(formatMonths(24)).toBe("2 anos");
    expect(formatMonths(0)).toBe("menos de 1 mês");
  });
});

describe("formatDuration", () => {
  it("formata um período encerrado", () => {
    expect(formatDuration("Nov 2019", "Set 2020")).toBe("11 meses");
    expect(formatDuration("Set 2020", "Abr 2021")).toBe("8 meses");
  });
});

describe("computeCompanyDuration", () => {
  it("vai do início mais antigo ao fim mais recente, sem somar cargos", () => {
    const roles = [
      { period: "Ago 2024 — Atual" },
      { period: "Mai 2022 — Jul 2024" },
      { period: "Mai 2021 — Abr 2022" },
    ];
    // Mai/2021 → Set/2026 em curso = 64 meses = 5 anos e 4 meses.
    // Somar os cargos daria mais de 8 anos: o mesmo tempo contado duas vezes.
    expect(computeCompanyDuration(roles, NOW)).toBe("5 anos e 4 meses");
  });

  it("não depende da ordem dos cargos na lista", () => {
    const ascending = [{ period: "Set 2020 — Abr 2021" }, { period: "Mai 2021 — Dez 2021" }];
    const descending = [...ascending].reverse();
    expect(computeCompanyDuration(ascending, NOW)).toBe(computeCompanyDuration(descending, NOW));
  });

  it("funciona com um cargo só", () => {
    expect(computeCompanyDuration([{ period: "Set 2020 — Abr 2021" }], NOW)).toBe("8 meses");
  });

  it("rejeita período sem o separador esperado", () => {
    expect(() => computeCompanyDuration([{ period: "Set 2020 - Abr 2021" }], NOW)).toThrow(
      /Período inválido/,
    );
  });
});

describe("formatExperienceYears", () => {
  it("arredonda os anos de carreira para baixo", () => {
    // Nov/2019 → Set/2026 = 82 meses = 6 anos e 10 meses.
    expect(formatExperienceYears("Nov 2019", NOW)).toBe("6+ anos");
  });

  it("usa singular no primeiro ano", () => {
    expect(formatExperienceYears("Mai 2025", NOW)).toBe("1+ ano");
  });
});
