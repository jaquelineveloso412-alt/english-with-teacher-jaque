import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { plans } from "@/lib/plans";
import { WHATSAPP_URL } from "@/lib/links";

export const Route = createFileRoute("/planos")({
  head: () => ({
    meta: [
      { title: "Planos — Aulas de inglês com Jaque Veloso" },
      { name: "description", content: "Aula particular R$ 499,99/mês ou aula em grupo R$ 280,00/mês. Escolha seu plano." },
      { property: "og:title", content: "Planos de aulas de inglês — Jaque Veloso" },
      { property: "og:description", content: "Particular com WhatsApp ou em grupo com aula ao vivo + gravada." },
    ],
  }),
  component: Planos,
});

function Planos() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-16">
      <h1 className="text-center text-4xl font-extrabold md:text-5xl">Escolha seu plano</h1>
      <p className="mt-3 text-center text-muted-foreground">Mensalidade fixa, sem surpresa. Comece quando quiser.</p>
      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {plans.map((p) => (
          <div key={p.name} className={`flex flex-col rounded-3xl border-2 border-primary p-8 shadow-pop ${p.highlight ? "bg-primary text-primary-foreground" : "bg-card"}`}>
            <span className={`w-fit rounded-full px-3 py-1 text-xs font-bold ${p.highlight ? "bg-lilac text-accent-foreground" : "bg-lilac-soft text-primary"}`}>{p.tag}</span>
            <h2 className="mt-4 text-2xl font-bold">{p.name}</h2>
            <p className="mt-2"><span className="font-display text-5xl font-extrabold">{p.price}</span><span className="opacity-70"> /mês</span></p>
            <ul className="mt-6 flex-1 space-y-3">
              {p.features.map((f) => (
                <li key={f} className="flex gap-2"><Check className="h-5 w-5 shrink-0 text-accent" />{f}</li>
              ))}
            </ul>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
              className="mt-8 rounded-full bg-whatsapp py-3 text-center font-semibold text-primary-foreground transition hover:-translate-y-0.5">
              Quero esse plano
            </a>
          </div>
        ))}
      </div>
      <p className="mt-10 text-center text-sm text-muted-foreground">Pagamento via PIX mensal ou cartão de crédito/débito (sujeito às taxas da operadora).</p>
    </div>
  );
}
