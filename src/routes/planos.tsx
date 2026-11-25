import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { GroupPlanCard } from "@/components/offer";
import { contentQueryOptions } from "@/lib/content";

export const Route = createFileRoute("/planos")({
  loader: ({ context }) => context.queryClient.ensureQueryData(contentQueryOptions),
  head: () => ({
    meta: [
      { title: "Aulas de inglês online — Teacher Jaque Veloso" },
      { name: "description", content: "Aulas por até R$ 280,00/mês: ao vivo toda semana, gravadas, plataforma de apoio e material incluso." },
      { property: "og:title", content: "Aulas de inglês por até R$ 280,00/mês" },
      { property: "og:description", content: "Pratique toda semana e tenha suporte para destravar seu inglês." },
    ],
  }),
  component: Planos,
});

function Planos() {
  const { data } = useSuspenseQuery(contentQueryOptions);
  return (
    <div className="mx-auto max-w-5xl px-5 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">Comece quando quiser</p>
        <h1 className="mt-3 text-4xl font-extrabold md:text-5xl">Aulas por até R$ 280,00 por mês.</h1>
        <p className="mt-4 text-muted-foreground">Um único plano, com tudo que você precisa para criar uma rotina de inglês e evoluir com confiança.</p>
      </div>
      <div className="mt-12"><GroupPlanCard settings={data.settings} centered /></div>
      <div className="mt-12 rounded-3xl bg-lilac-soft p-7 text-center">
        <h2 className="text-2xl font-bold text-primary">Prefere estudar no seu ritmo?</h2>
        <p className="mt-2 text-muted-foreground">Conheça também os materiais digitais da Teacher.</p>
        <Link to="/ebooks" className="mt-5 inline-flex rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground">Ver e-books</Link>
      </div>
      <p className="mt-10 text-center text-sm text-muted-foreground">Pagamento via PIX mensal ou cartão de crédito/débito (sujeito às taxas da operadora).</p>
    </div>
  );
}
