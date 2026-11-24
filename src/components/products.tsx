import { ArrowUpRight, Download } from "lucide-react";
import type { Ebook } from "@/lib/content";
import { getEbookAction } from "@/lib/ebook-action";

export function EbookCard({ ebook, whatsappUrl, compact = false }: { ebook: Ebook; whatsappUrl: string; compact?: boolean }) {
  const action = getEbookAction(ebook, whatsappUrl);
  return (
    <article className="grid overflow-hidden rounded-3xl border bg-card shadow-pop sm:grid-cols-[150px_1fr]">
      <div className="flex items-center justify-center bg-lilac-soft p-5">
        <img src={ebook.cover_url} alt={`Capa do e-book ${ebook.title}`} className="w-32 rounded-xl object-cover shadow-lg" />
      </div>
      <div className="flex flex-col p-6">
        <span className="w-fit rounded-full bg-lilac px-3 py-1 text-xs font-bold text-accent-foreground">
          {ebook.is_free ? "Grátis" : ebook.price_text || "E-book"}
        </span>
        <h3 className="mt-3 text-2xl font-bold text-primary">{ebook.title}</h3>
        {!compact && <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{ebook.description}</p>}
        <a
          href={action.href}
          target="_blank"
          rel="noopener noreferrer"
          download={action.download || undefined}
          className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5"
        >
          {action.download ? <Download className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
          {action.label}
        </a>
      </div>
    </article>
  );
}
