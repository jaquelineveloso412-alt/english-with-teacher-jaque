import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Testimonial } from "@/lib/content";

export function DepoimentoCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const previous = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi || paused || testimonials.length < 2) return;
    const timer = window.setInterval(() => emblaApi.scrollNext(), 4000);
    return () => window.clearInterval(timer);
  }, [emblaApi, paused, testimonials.length]);

  if (testimonials.length === 0) return null;

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="overflow-hidden" ref={emblaRef} aria-label="Depoimentos de alunos">
        <div className="flex touch-pan-y">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.id}
              className="min-w-0 flex-[0_0_86%] pr-4 sm:flex-[0_0_48%] lg:flex-[0_0_31.5%]"
            >
              <div className="flex aspect-[9/13] items-center justify-center overflow-hidden rounded-3xl border bg-card p-2 shadow-pop">
                <img
                  src={testimonial.image_url}
                  alt={testimonial.alt_text}
                  loading="lazy"
                  className="h-full w-full rounded-2xl object-contain"
                />
              </div>
            </figure>
          ))}
        </div>
      </div>
      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={previous}
          aria-label="Depoimento anterior"
          className="rounded-full border bg-card p-3 text-primary transition hover:bg-lilac-soft"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="text-sm font-medium text-muted-foreground">Arraste para ver mais</span>
        <button
          type="button"
          onClick={next}
          aria-label="Próximo depoimento"
          className="rounded-full border bg-card p-3 text-primary transition hover:bg-lilac-soft"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
