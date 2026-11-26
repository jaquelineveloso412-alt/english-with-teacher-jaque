import { useEffect, useState } from "react";

export const CYCLE = 15 * 60; // 15min, then restarts

// Each visitor starts at 15:00 when they open the page, then it restarts.
export function remaining(start = Date.now()) {
  const s = Math.floor((Date.now() - start) / 1000);
  return CYCLE - 1 - (s % CYCLE);
}

export function PromoTimer() {
  const [left, setLeft] = useState<number | null>(null);
  useEffect(() => {
    const start = Date.now();
    setLeft(remaining(start));
    const t = window.setInterval(() => setLeft(remaining(start)), 1000);
    return () => window.clearInterval(t);
  }, []);
  const v = left ?? CYCLE - 1;
  const pad = (n: number) => String(n).padStart(2, "0");
  const showHours = v >= 3600;
  return (
    <span className="font-display text-2xl font-bold tabular-nums tracking-wider" aria-live="off">
      {showHours ? `${pad(Math.floor(v / 3600))}:` : ""}
      {pad(showHours ? Math.floor((v % 3600) / 60) : Math.floor(v / 60))}:{pad(v % 60)}
    </span>
  );
}
