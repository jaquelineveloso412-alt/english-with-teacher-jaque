export const PROMOTION_TIME_ZONE = "America/Sao_Paulo";

export function promotionDate(date: Date) {
  const weekday = new Intl.DateTimeFormat("pt-BR", {
    timeZone: PROMOTION_TIME_ZONE,
    weekday: "long",
  }).format(date);
  const day = new Intl.DateTimeFormat("pt-BR", {
    timeZone: PROMOTION_TIME_ZONE,
    day: "2-digit",
    month: "2-digit",
  }).format(date);
  return `${weekday}, ${day}`;
}

export function splitPrice(price: string) {
  const match = /^(.*?)(\d[\d.]*)(,\d{2})?$/.exec(price.trim());
  return match
    ? { prefix: match[1] ?? "", amount: match[2] ?? "", cents: match[3] ?? "" }
    : { prefix: "", amount: price, cents: "" };
}