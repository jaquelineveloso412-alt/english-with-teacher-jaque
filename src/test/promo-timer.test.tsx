import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CYCLE, PromoTimer, remaining } from "@/components/promo-timer";

describe("Cronômetro da oferta", () => {
  it("reinicia a cada 15 minutos", () => {
    expect(CYCLE).toBe(15 * 60);
  });

  it("nunca mostra um tempo maior que o ciclo", () => {
    const left = remaining();
    expect(left).toBeGreaterThanOrEqual(0);
    expect(left).toBeLessThan(CYCLE);
  });

  it("mostra o tempo em minutos e segundos, sem horas", () => {
    render(<PromoTimer />);
    const value = document.querySelector("span.tabular-nums")?.textContent ?? "";
    expect(value).toMatch(/^\d{2}:\d{2}$/);
    const [min, sec] = value.split(":").map(Number);
    expect(min).toBeLessThan(15);
    expect(sec).toBeLessThan(60);
  });
});
