import { Check } from "lucide-react";
import type { SiteSettings } from "@/lib/content";

export function GroupPlanCard({ settings, centered = false }: { settings: SiteSettings; centered?: boolean }) {
  return (
    <article className={`rounded-3xl bg-primary p-7 text-primary-foreground shadow-pop md:p-10 ${centered ? "mx-auto max-w-3xl" : ""}`}>
      <div className="grid gap-8 md:grid-cols-[1fr_1.2fr] md:items-center">
        <div>
          <span className="inline-block rounded-full bg-lilac px-4 py-1 text-xs font-bold text-accent-foreground">{settings.plan_tag}</span>
          <h3 className="mt-4 text-3xl font-bold">{settings.plan_name}</h3>
          <p className="mt-5">
            <span className="block text-xs font-bold uppercase tracking-[0.18em] opacity-75">Aulas por até</span>
            <span className="font-display text-5xl font-extrabold">{settings.plan_price}</span>
            <span className="opacity-75"> /mês</span>
          </p>
          <p className="mt-3 text-sm opacity-75">Mensalidade fixa, sem surpresa. Comece quando quiser.</p>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
          {settings.plan_features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm font-medium">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-lilac" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <a
        href={settings.whatsapp_url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 flex items-center justify-center rounded-full bg-whatsapp px-6 py-4 text-center font-bold text-primary-foreground transition hover:-translate-y-0.5"
      >
        Quero começar as aulas
      </a>
    </article>
  );
}
