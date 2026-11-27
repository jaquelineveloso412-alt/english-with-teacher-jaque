import { describe, expect, it } from "vitest";
import { promotionDate, splitPrice } from "@/lib/promotion";

describe("Data da promoção no horário de Brasília", () => {
  it("mostra sexta-feira, 27/11 na data informada", () => {
    expect(promotionDate(new Date("2026-11-27T20:54:00Z"))).toBe("sexta-feira, 27/11");
  });
  it("atualiza o dia quando chega a meia-noite em Brasília", () => {
    expect(promotionDate(new Date("2026-11-28T02:59:59Z"))).toBe("sexta-feira, 27/11");
    expect(promotionDate(new Date("2026-11-28T03:00:00Z"))).toBe("sábado, 28/11");
  });
});

it("separa apenas 197 do símbolo monetário e dos centavos", () => {
  expect(splitPrice("R$ 197,00")).toEqual({ prefix: "R$ ", amount: "197", cents: ",00" });
});