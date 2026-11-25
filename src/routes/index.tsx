import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRight, BookOpen, Briefcase, Coffee, Play, Plane, Users } from "lucide-react";
import { WhatsButton, InstaButton } from "@/components/site";
import { DepoimentoCarousel } from "@/components/carousel-fotos";
import { EbookCard } from "@/components/products";
import { GroupPlanCard } from "@/components/offer";
import { contentQueryOptions } from "@/lib/content";
import { PromoTimer } from "@/components/promo-timer";

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(contentQueryOptions),
  head: ({ loaderData }) => {
    const image = loaderData?.settings.home_photo_url;
    const socialImage = image?.startsWith("https://")
      ? [
          { property: "og:image", content: image },
          { name: "twitter:image", content: image },
        ]
      : [];
    return {
      meta: [
        { title: "Teacher Jaque Veloso — Inglês em grupo para a vida real" },
        { name: "description", content: "Turmas online com até 6 alunos, aulas ao vivo e gravadas, plataforma de apoio e material incluso." },
        { property: "og:title", content: "Destrave seu inglês com a Teacher Jaque" },
        { property: "og:description", content: "Prática toda semana, turma reduzida e suporte para você falar com confiança." },
        ...socialImage,
      ],
    };
  },
  component: Index,
});

function Index() {
  const { data } = useSuspenseQuery(contentQueryOptions);
  const { settings, testimonials, ebooks } = data;

  return (
    <>
      <section className="relative isolate min-h-[640px] overflow-hidden bg-primary text-primary-foreground md:min-h-[720px]">
        <img
          src={settings.home_photo_url}
          alt="Teacher Jaque Veloso"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-[70%_center] md:object-right"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-primary via-primary/70 to-primary/10 md:bg-gradient-to-r md:from-primary md:via-primary/75 md:to-transparent" aria-hidden="true" />

        <div className="mx-auto max-w-6xl px-4 pt-4">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-primary-foreground/20 bg-card/90 px-4 py-3 text-foreground shadow-xl backdrop-blur md:px-6">
            <div className="flex items-center gap-3">
              <span className="hidden rounded-full bg-lilac-soft px-4 py-2 text-sm font-semibold text-primary sm:inline">Oferta especial</span>
              <div>
                <p className="text-sm font-bold uppercase tracking-wide">Somente hoje</p>
                <p className="text-sm text-muted-foreground">{settings.plan_name} por <strong className="text-accent">{settings.plan_price}</strong>/mês</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Encerra em</p>
                <PromoTimer />
              </div>
              <a href={settings.whatsapp_url} target="_blank" rel="noopener noreferrer" className="rounded-full bg-primary px-5 py-3 text-sm font-bold uppercase text-primary-foreground transition hover:-translate-y-0.5">
                Garantir agora
              </a>
            </div>
          </div>
        </div>

        <div className="mx-auto flex max-w-6xl flex-col justify-end px-5 pb-14 pt-56 md:justify-center md:pb-24 md:pt-24">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 px-4 py-2 text-sm font-bold backdrop-blur">
              <Users className="h-4 w-4" /> {settings.hero_eyebrow}
            </span>
            <h1 className="mt-6 text-5xl font-extrabold leading-[1.02] md:text-6xl">
              {settings.hero_title} <em className="text-lilac">{settings.hero_highlight}</em>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed opacity-90">{settings.hero_description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <WhatsButton href={settings.whatsapp_url}>Quero entrar para a turma</WhatsButton>
              <a href="#plano" className="inline-flex items-center gap-2 rounded-full border-2 border-current px-6 py-3 font-semibold">
                Conhecer a turma <ArrowRight className="h-5 w-5" />
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium opacity-90">
              <span>✓ Ao vivo + gravadas</span>
              <span>✓ Material incluso</span>
              <span>✓ Até 6 alunos</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">Inglês para usar de verdade</p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">Aprenda o que você vai colocar em prática fora da aula.</h2>
        </div>
        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {[
            { icon: Coffee, title: "Dia a dia", text: "Converse sem travar em situações do cotidiano." },
            { icon: Plane, title: "Viagens", text: "Aeroporto, hotel e restaurante com mais confiança." },
            { icon: Briefcase, title: "Trabalho", text: "Reuniões, e-mails e entrevistas em inglês." },
          ].map(({ icon: Icon, title, text }) => (
            <article key={title} className="rounded-3xl border-2 border-primary bg-card p-6 shadow-pop">
              <Icon className="h-8 w-8 text-accent" />
              <h3 className="mt-4 text-xl font-bold">{title}</h3>
              <p className="mt-2 text-muted-foreground">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="plano" className="bg-lilac-soft px-5 py-16 md:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">Sua rotina de inglês, com acompanhamento</p>
            <h2 className="mt-3 text-3xl font-bold text-primary md:text-4xl">Uma turma pequena para você participar de verdade.</h2>
          </div>
          <GroupPlanCard settings={settings} />
          <p className="mt-5 text-center text-sm text-muted-foreground">Ficou com dúvida? Chame a Teacher no WhatsApp antes de decidir.</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">Quem aprende com a Jaque</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">Resultados contados por quem já está nas aulas.</h2>
          </div>
          <WhatsButton href={settings.whatsapp_url}>Também quero evoluir</WhatsButton>
        </div>
        <div className="mt-9">
          <DepoimentoCarousel testimonials={testimonials} />
        </div>
      </section>

      {ebooks.length > 0 && (
        <section id="ebooks" className="bg-primary px-5 py-16 text-primary-foreground md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
              <div>
                <BookOpen className="h-9 w-9 text-lilac" />
                <p className="mt-5 text-sm font-bold uppercase tracking-[0.18em] text-lilac">Para estudar no seu ritmo</p>
                <h2 className="mt-3 text-3xl font-bold md:text-4xl">Continue evoluindo com os e-books da Teacher.</h2>
                <p className="mt-4 opacity-80">Conteúdo prático para revisar quando quiser — no celular, no computador ou para imprimir.</p>
                <Link to="/ebooks" className="mt-6 inline-flex items-center gap-2 font-bold text-lilac underline">
                  Ver todos os e-books <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
              <div className="grid gap-5">
                {ebooks.slice(0, 2).map((ebook) => (
                  <EbookCard key={ebook.id} ebook={ebook} whatsappUrl={settings.whatsapp_url} compact />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <div className="rounded-3xl border-2 border-primary bg-lilac-soft p-8 text-center shadow-pop md:p-12">
          <Play className="mx-auto h-9 w-9 text-accent" />
          <h2 className="mt-4 text-3xl font-bold text-primary md:text-4xl">Pronto(a) para fazer o inglês caber na sua vida?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">Converse com a Teacher, conte seu objetivo e descubra como a turma pode ajudar você.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <WhatsButton href={settings.whatsapp_url}>Quero conversar sobre a turma</WhatsButton>
            <InstaButton className="text-primary" />
          </div>
        </div>
      </section>
    </>
  );
}
