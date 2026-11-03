import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type Slide = { src: string; alt: string; fit?: "cover" | "contain" };

export function FotoCarousel({ slides, interval = 3500 }: { slides: Slide[]; interval?: number }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = slides.length;
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((v) => (v + 1) % n), interval);
    return () => clearInterval(t);
  }, [paused, n, interval]);
  const go = (d: number) => setI((v) => (v + d + n) % n);

  return (
    <div className="relative" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl bg-card">
        {slides.map((s, k) => (
          <img key={s.src} src={s.src} alt={s.alt} loading={k === 0 ? "eager" : "lazy"}
            className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${s.fit === "contain" ? "object-contain" : "object-cover"} ${k === i ? "opacity-100" : "opacity-0"}`} />
        ))}
      </div>
      <button aria-label="Anterior" onClick={() => go(-1)}
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 text-primary"><ChevronLeft className="h-5 w-5" /></button>
      <button aria-label="Próxima" onClick={() => go(1)}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 text-primary"><ChevronRight className="h-5 w-5" /></button>
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
        {slides.map((_, k) => (
          <button key={k} aria-label={`Foto ${k + 1}`} onClick={() => setI(k)}
            className={`h-2 rounded-full transition-all ${k === i ? "w-6 bg-accent" : "w-2 bg-background/70"}`} />
        ))}
      </div>
    </div>
  );
}
