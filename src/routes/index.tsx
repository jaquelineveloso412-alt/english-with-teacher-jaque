import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRight, Check, X, ShieldCheck } from "lucide-react";
import { DepoimentoCarousel } from "@/components/carousel-fotos";
import { EbookCard } from "@/components/products";
import { contentQueryOptions } from "@/lib/content";
import { PromoTimer } from "@/components/promo-timer";
import { PromotionPrice, TodayPromotion } from "@/components/promotion";

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
        { title: "Teacher Jaque Veloso — Aulas de inglês para a vida real" },
        { name: "description", content: `Aulas ao vivo toda semana, aulas gravadas, plataforma de apoio e material incluso por ${loaderData?.settings.plan_price ?? "R$ 197,00"} no mês.` },
        { property: "og:title", content: "Destrave seu inglês com a Teacher Jaque" },
        { property: "og:description", content: "Prática toda semana e suporte para você falar com confiança." },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        ...socialImage,
      ],
    };
  },
  component: Index,
});

function Cta({ href, children = "Quero começar" }: { href: string; children?: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-lg font-bold uppercase tracking-wide text-primary-foreground shadow-lg transition hover:-translate-y-0.5 sm:w-auto"
    >
      {children} <ArrowRight className="h-5 w-5" />
    </a>
  );
}

function CtaBlock({ href }: { href: string }) {
  return (
    <div className="mx-auto mt-12 max-w-xl text-center">
      <p className="text-muted-foreground">
        Clique no botão abaixo para <strong className="text-foreground">PARAR DE TRAVAR</strong> no inglês e começar a falar com confiança:
      </p>
      <div className="mt-5"><Cta href={href} /></div>
    </div>
  );
}

const capabilities = [
  "Se comunicar em viagens: aeroporto, hotel, restaurante e compras.",
  "Participar de reuniões, entrevistas e conversas no trabalho.",
  "Entender nativos e responder sem traduzir tudo na cabeça.",
  "Melhorar a pronúncia e falar de forma mais natural.",
  "Estudar com constância, mesmo com a rotina corrida.",
  "Perder o medo de errar e ganhar segurança para falar.",
];

const forWho = [
  "Quem realmente necessita do inglês.",
  "Quem vai viajar e quer se virar sozinho(a) com tranquilidade.",
  "Quem precisa do inglês no trabalho ou para crescer na carreira.",
  "Quem quer aulas práticas, com situações reais do dia a dia.",
];
const notForWho = [
  "Quem procura uma fórmula mágica sem praticar.",
  "Quem não tem disponibilidade para 1 aula por semana.",
  "Quem quer só decorar regras de gramática.",
  "Quem não quer sair da zona de conforto.",
];

const faq = [
  { q: "Preciso já saber inglês para começar?", a: "Não. As aulas se adaptam ao seu nível, desde os primeiros passos até a fluência." },
  { q: "Como funcionam as aulas?", a: "Você tem aulas ao vivo toda semana, aulas gravadas para revisar quando quiser e uma plataforma de apoio com material incluso." },
  { q: "E se eu perder uma aula ao vivo?", a: "Você conta com as aulas gravadas e o material da plataforma para não ficar para trás." },
  { q: "Como faço para começar?", a: "É só clicar em qualquer botão da página e falar comigo no WhatsApp. Eu te explico tudo." },
];

function Index() {
  const { data } = useSuspenseQuery(contentQueryOptions);
  const { settings, testimonials, ebooks } = data;
  const wa = settings.whatsapp_url;

  return (
    <div className="bg-background">
      {/* HERO */}
      <section className="relative isolate min-h-[680px] overflow-hidden md:min-h-[760px]">
        <img src={settings.home_photo_url} alt="Teacher Jaque Veloso" className="absolute inset-0 -z-20 h-full w-full object-cover object-[70%_center] md:object-right" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/80 to-background/5 md:bg-gradient-to-r md:from-background md:via-background/80 md:to-transparent" aria-hidden="true" />

        <div className="mx-auto max-w-6xl px-4 pt-4">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card/80 px-4 py-3 shadow-lg backdrop-blur-md md:px-6">
            <div className="flex items-center gap-3">
              <span className="hidden rounded-full bg-lilac-soft px-3 py-1.5 text-xs font-semibold text-primary sm:inline">Oferta especial</span>
              <div className="text-sm">
                <TodayPromotion />
                <p className="mt-1 text-primary"><PromotionPrice price={settings.plan_price} /></p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Encerra em</p>
                <PromoTimer />
              </div>
              <a href={wa} target="_blank" rel="noopener noreferrer" className="rounded-full bg-primary px-5 py-3 text-sm font-bold uppercase text-primary-foreground">Garantir agora</a>
            </div>
          </div>
        </div>

        <div className="mx-auto flex max-w-6xl flex-col px-5 pb-14 pt-64 md:pb-24 md:pt-20">
          <div className="max-w-xl">
            <p className="font-serif text-xl italic text-accent">Teacher Jaque Veloso</p>
            <h1 className="mt-4 font-serif text-5xl font-normal leading-[1.05] tracking-tight text-primary md:text-6xl">
              {settings.hero_title} <em className="font-semibold">{settings.hero_highlight}</em>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">{settings.hero_description}</p>
            <div className="mt-8"><Cta href={wa}>Quero começar</Cta></div>
          </div>
        </div>
      </section>

      {/* CAPACIDADES */}
      <section className="bg-lilac-soft px-5 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="max-w-2xl font-serif text-4xl font-normal leading-tight text-primary md:text-5xl">
            Com as aulas da Teacher Jaque, você vai ser capaz de:
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {capabilities.map((c) => (
              <div key={c} className="flex gap-4 rounded-2xl bg-card p-5 shadow-sm">
                <Check className="mt-1 h-5 w-5 shrink-0 text-accent" />
                <p className="text-lg font-medium">{c}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="px-5 py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-center font-serif text-2xl italic text-muted-foreground">Veja o que os alunos estão dizendo</p>
          <div className="mt-10"><DepoimentoCarousel testimonials={testimonials} /></div>
          <CtaBlock href={wa} />
        </div>
      </section>

      {/* PARA QUEM */}
      <section className="bg-primary px-5 py-20 text-primary-foreground">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-serif text-4xl font-normal md:text-5xl">
            <strong>ATENÇÃO!</strong> Antes de começar, veja se as aulas são para você…
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl bg-card p-7 text-card-foreground">
              <p className="font-serif text-2xl text-primary">É para quem…</p>
              <ul className="mt-5 space-y-4">
                {forWho.map((t) => (
                  <li key={t} className="flex gap-3"><Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />{t}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-primary-foreground/20 p-7">
              <p className="font-serif text-2xl">Não é para quem…</p>
              <ul className="mt-5 space-y-4 opacity-90">
                {notForWho.map((t) => (
                  <li key={t} className="flex gap-3"><X className="mt-0.5 h-5 w-5 shrink-0 text-lilac" />{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* O QUE RECEBE + OFERTA */}
      <section id="plano" className="px-5 py-20">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-serif text-4xl font-normal leading-tight text-primary md:text-5xl">Tudo o que você vai receber:</h2>
            <ul className="mt-8 space-y-4">
              {settings.plan_features.map((f) => (
                <li key={f} className="flex gap-3 border-b border-border pb-4 text-lg">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-accent" /> {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-border bg-card p-8 text-center shadow-2xl md:p-10">
            <p className="font-serif text-3xl text-primary">{settings.plan_name}</p>
            <p className="mt-2 text-sm uppercase tracking-[0.2em] text-muted-foreground">{settings.plan_tag}</p>
            <div className="mt-8 flex justify-center"><TodayPromotion /></div>
            <p className="mt-3 font-serif text-3xl text-primary"><PromotionPrice price={settings.plan_price} /></p>
            <div className="mt-6 flex items-center justify-center gap-2 text-sm">
              <span className="text-muted-foreground">Oferta encerra em</span> <PromoTimer />
            </div>
            <div className="mt-6"><Cta href={wa}>Garantir minha vaga</Cta></div>
            <p className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground"><ShieldCheck className="h-4 w-4" /> Tire todas as dúvidas antes pelo WhatsApp</p>
          </div>
        </div>
      </section>

      {/* EBOOKS */}
      {ebooks.length > 0 && (
        <section id="ebooks" className="bg-lilac-soft px-5 py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-serif text-4xl font-normal text-primary md:text-5xl">E-books para estudar no seu ritmo</h2>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {ebooks.slice(0, 4).map((e) => <EbookCard key={e.id} ebook={e} whatsappUrl={wa} compact />)}
            </div>
            <Link to="/ebooks" className="mt-8 inline-flex items-center gap-2 font-bold text-primary underline">Ver todos os e-books <ArrowRight className="h-5 w-5" /></Link>
          </div>
        </section>
      )}

      {/* SOBRE */}
      <section className="px-5 py-20">
        <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-[0.9fr_1.1fr]">
          <img src={settings.about_photo_url} alt="Jaque Veloso" className="aspect-[4/5] w-full rounded-3xl object-cover shadow-xl" />
          <div>
            <h2 className="font-serif text-4xl font-normal leading-tight text-primary md:text-5xl">{settings.about_heading}</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{settings.about_paragraph_one}</p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{settings.about_paragraph_two}</p>
            <div className="mt-8"><Cta href={wa}>Quero aprender com a Jaque</Cta></div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-lilac-soft px-5 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center font-serif text-4xl font-normal text-primary">Perguntas frequentes</h2>
          <div className="mt-10 space-y-3">
            {[...faq, { q: "Quanto custa?", a: `De R$ 337,00 por ${settings.plan_price} no mês. Chame no WhatsApp para saber mais.` }].map(({ q, a }) => (
              <details key={q} className="group rounded-2xl bg-card p-5 shadow-sm">
                <summary className="cursor-pointer list-none text-lg font-semibold marker:hidden">{q}</summary>
                <p className="mt-3 text-muted-foreground">{a}</p>
              </details>
            ))}
          </div>
          <CtaBlock href={wa} />
        </div>
      </section>
    </div>
  );
}
