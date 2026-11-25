import { useEffect, useState } from "react";

const CYCLE = 12 * 60 * 60; // 12h, then restarts

function remaining() {
  const s = Math.floor(Date.now() / 1000);
  return CYCLE - 1 - (s % CYCLE);
}

export function PromoTimer() {
  const [left, setLeft] = useState<number | null>(null);
  useEffect(() => {
    setLeft(remaining());
    const t = window.setInterval(() => setLeft(remaining()), 1000);
    return () => window.clearInterval(t);
  }, []);
  const v = left ?? CYCLE - 1;
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <span className="font-display text-2xl font-bold tabular-nums tracking-wider" aria-live="off">
      {pad(Math.floor(v / 3600))}:{pad(Math.floor((v % 3600) / 60))}:{pad(v % 60)}
    </span>
  );
}
