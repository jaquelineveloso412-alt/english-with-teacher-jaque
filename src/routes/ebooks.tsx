import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { BookOpen } from "lucide-react";
import { EbookCard } from "@/components/products";
import { WhatsButton } from "@/components/site";
import { contentQueryOptions } from "@/lib/content";

export const Route = createFileRoute("/ebooks")({
  loader: ({ context }) => context.queryClient.ensureQueryData(contentQueryOptions),
  head: () => ({
    meta: [
      { title: "E-books de inglês — Teacher Jaque Veloso" },
      { name: "description", content: "Materiais digitais gratuitos e pagos para você estudar inglês no seu ritmo." },
      { property: "og:title", content: "E-books da Teacher Jaque Veloso" },
      { property: "og:description", content: "Conteúdo prático para levar seu inglês com você." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Ebooks,
});

function Ebooks() {
  const { data } = useSuspenseQuery(contentQueryOptions);
  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <div className="max-w-2xl">
        <BookOpen className="h-9 w-9 text-accent" />
        <h1 className="mt-4 text-4xl font-extrabold md:text-5xl">Seu inglês, sempre à mão.</h1>
        <p className="mt-4 text-lg text-muted-foreground">Escolha seu material, baixe grátis ou compre online para continuar estudando no seu ritmo.</p>
      </div>
      <div className="mt-12 grid gap-7 lg:grid-cols-2">
        {data.ebooks.map((ebook) => (
          <EbookCard key={ebook.id} ebook={ebook} whatsappUrl={data.settings.whatsapp_url} />
        ))}
      </div>
      {data.ebooks.length === 0 && (
        <div className="mt-12 rounded-3xl bg-lilac-soft p-10 text-center text-primary">Novos materiais estão sendo preparados.</div>
      )}
      <div className="mt-16 rounded-3xl bg-primary p-8 text-center text-primary-foreground md:p-12">
        <h2 className="text-3xl font-bold">Quer praticar com acompanhamento?</h2>
        <p className="mx-auto mt-3 max-w-xl opacity-85">Comece com as aulas e tenha encontros ao vivo, aulas gravadas, material e plataforma de apoio.</p>
        <div className="mt-6"><WhatsButton href={data.settings.whatsapp_url}>Quero conhecer as aulas</WhatsButton></div>
      </div>
    </div>
  );
}
