import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRight, Check, X, ShieldCheck, Sparkles, Video, PlayCircle, LayoutGrid, BookOpen, Plane, Briefcase, MessageCircle, Ear, Mic, Heart, Star, Flame } from "lucide-react";
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

function Cta({ href, children = "Quero começar", light = false }: { href: string; children?: React.ReactNode; light?: boolean }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-lg font-bold shadow-lg transition hover:-translate-y-0.5 sm:w-auto ${light ? "bg-primary-foreground text-primary" : "bg-accent text-primary-foreground"}`}
    >
      {children} <ArrowRight className="h-5 w-5" />
    </a>
  );
}

function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p className={`inline-flex rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] ${dark ? "bg-primary-foreground/10 text-lilac" : "bg-lilac-soft text-primary"}`}>
      {children}
    </p>
  );
}

const myths = ["“Inglês não é pra mim”", "“Não tenho jeito pra idiomas”", "“Já tentei e não consegui”"];
const truths = [
  "Qualquer pessoa pode aprender inglês",
  "Com prática toda semana, fica muito mais fácil",
  "Errar faz parte — e é assim que você evolui",
  "Você não precisa fazer isso sozinho(a)",
];

const imagine = [
  { icon: MessageCircle, t: "Falar com confiança", d: "Converse sem travar nem sentir vergonha de errar." },
  { icon: Plane, t: "Viajar sem perrengue", d: "Aeroporto, hotel, restaurante e compras sem depender de tradutor." },
  { icon: Briefcase, t: "Crescer no trabalho", d: "Reuniões, entrevistas e oportunidades que pedem inglês." },
  { icon: Ear, t: "Entender nativos", d: "Pare de entrar em pânico quando alguém fala rápido." },
  { icon: Mic, t: "Pronúncia natural", d: "Fale de um jeito mais natural, com foco em pronúncia." },
  { icon: Heart, t: "Constância de verdade", d: "Estude mesmo com a rotina corrida, sem ansiedade." },
];

const featureIcons = [Video, PlayCircle, LayoutGrid, BookOpen, Plane];

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
      <section className="relative isolate overflow-hidden bg-hero text-primary-foreground">
        <div className="pointer-events-none absolute -right-40 -top-40 -z-10 h-[28rem] w-[28rem] rounded-full bg-lilac/15" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-40 -left-32 -z-10 h-80 w-80 rounded-full bg-lilac/10" aria-hidden="true" />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-14 md:py-20 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="inline-flex flex-wrap items-center gap-3 rounded-full bg-accent px-4 py-1.5 text-sm font-bold">
              <Flame className="h-4 w-4" /> Oferta por tempo limitado · <PromoTimer />
            </div>
            <h1 className="mt-6 text-5xl font-extrabold leading-[1.02] md:text-6xl">
              {settings.hero_title} <span className="text-lilac">{settings.hero_highlight}</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed opacity-85">{settings.hero_description}</p>

            <div className="mt-8 inline-block rounded-3xl bg-card p-6 text-card-foreground shadow-2xl">
              <div className="text-sm font-semibold text-accent"><TodayPromotion /></div>
              <p className="mt-2 text-2xl text-primary"><PromotionPrice price={settings.plan_price} /></p>
              <p className="mt-3 inline-flex rounded-full bg-lilac-soft px-3 py-1 text-xs font-semibold text-primary">Material incluso</p>
            </div>

            <div className="mt-8"><Cta href={wa}>Quero começar agora</Cta></div>
            <p className="mt-4 flex items-center gap-2 text-sm opacity-75"><ShieldCheck className="h-4 w-4" /> Tire todas as dúvidas antes pelo WhatsApp</p>

            <div className="mt-8 flex flex-wrap gap-3">
              {settings.plan_features.slice(0, 4).map((f) => (
                <span key={f} className="rounded-2xl border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-2 text-sm font-semibold">{f}</span>
              ))}
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-md">
            <img src={settings.home_photo_url} alt="Teacher Jaque Veloso" fetchPriority="high" className="aspect-[4/5] w-full rounded-[2rem] object-cover shadow-2xl" />
            <p className="absolute bottom-5 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-primary px-5 py-2.5 text-sm font-bold shadow-lg">
              <Star className="h-4 w-4 text-lilac" /> +5 anos ensinando inglês
            </p>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 bg-primary-foreground/5">
          <p className="mx-auto max-w-6xl px-5 py-4 text-center text-sm font-semibold tracking-wide opacity-85">
            Formada em Letras (UEMG) · Proficiência TOEFL · Pós-graduanda em Ensino de Língua Inglesa (UFMG) · Intercambista
          </p>
        </div>
      </section>

      {/* MENTIRA */}
      <section className="px-5 py-20">
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2 md:items-center">
          <div>
            <Eyebrow>Você não está sozinho(a)</Eyebrow>
            <h2 className="mt-4 text-4xl font-extrabold leading-tight text-primary md:text-5xl">Te contaram uma mentira sobre inglês</h2>
            <p className="mt-5 text-lg text-muted-foreground">Durante muito tempo, você provavelmente ouviu uma dessas frases:</p>
            <div className="mt-5 space-y-3">
              {myths.map((m) => (
                <p key={m} className="rounded-2xl bg-lilac-soft px-5 py-3 font-serif text-lg italic text-primary line-through decoration-accent">{m}</p>
              ))}
            </div>
            <p className="mt-6 text-lg"><strong>O problema nunca foi você — foi a falta de prática.</strong></p>
          </div>
          <div className="rounded-3xl bg-primary p-8 text-primary-foreground shadow-2xl">
            <p className="text-2xl font-bold">A verdade é:</p>
            <ul className="mt-6 space-y-4">
              {truths.map((t) => (
                <li key={t} className="flex gap-3 text-lg"><Check className="mt-1 h-5 w-5 shrink-0 text-lilac" />{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* IMAGINE */}
      <section className="bg-lilac-soft px-5 py-20">
        <div className="mx-auto max-w-6xl text-center">
          <Eyebrow>Sua vida com inglês</Eyebrow>
          <h2 className="mt-4 text-4xl font-extrabold text-primary md:text-5xl">Imagine viver isso com o inglês…</h2>
          <div className="mt-12 grid gap-5 text-left sm:grid-cols-2 lg:grid-cols-3">
            {imagine.map(({ icon: Icon, t, d }) => (
              <div key={t} className="rounded-3xl bg-card p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <span className="inline-flex rounded-2xl bg-primary p-3 text-primary-foreground"><Icon className="h-6 w-6" /></span>
                <p className="mt-5 text-xl font-bold text-primary">{t}</p>
                <p className="mt-2 text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INCLUÍDO */}
      <section className="px-5 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <Eyebrow>O que está incluído</Eyebrow>
            <h2 className="mt-4 text-4xl font-extrabold text-primary md:text-5xl">Tudo o que você vai encontrar nas aulas</h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {settings.plan_features.map((f, i) => {
              const Icon = featureIcons[i % featureIcons.length] ?? Check;
              return (
                <div key={f} className="flex gap-4 rounded-3xl border border-border bg-card p-6">
                  <span className="h-fit rounded-2xl bg-lilac-soft p-3 text-primary"><Icon className="h-6 w-6" /></span>
                  <p className="self-center text-lg font-bold text-primary">{f}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* MÉTODO */}
      <section className="bg-hero px-5 py-20 text-primary-foreground">
        <div className="mx-auto max-w-5xl text-center">
          <Eyebrow dark>Como funciona</Eyebrow>
          <h2 className="mt-4 text-4xl font-extrabold md:text-5xl">Comunicação desde o primeiro nível</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg opacity-85">{settings.methodology_text}</p>
          <div className="mt-12 grid gap-5 text-left md:grid-cols-3">
            {[
              ["01", "Você começa do seu nível", "Sem comparações: as aulas se adaptam ao seu momento."],
              ["02", "Prática toda semana", "Aula ao vivo, aulas gravadas e material para revisar."],
              ["03", "Fala com confiança", "Você percebe que consegue usar o inglês na vida real."],
            ].map(([n, t, d]) => (
              <div key={n} className="rounded-3xl border border-primary-foreground/15 bg-primary-foreground/5 p-7">
                <p className="text-4xl font-extrabold text-lilac">{n}</p>
                <p className="mt-3 text-xl font-bold">{t}</p>
                <p className="mt-2 opacity-80">{d}</p>
              </div>
            ))}
          </div>
          <div className="mt-10"><Cta href={wa} light>Quero aprender assim</Cta></div>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="px-5 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <Eyebrow>Prova social</Eyebrow>
            <h2 className="mt-4 text-4xl font-extrabold text-primary md:text-5xl">Quem estuda com a Teacher Jaque sente a diferença</h2>
          </div>
          <div className="mt-10"><DepoimentoCarousel testimonials={testimonials} /></div>
        </div>
      </section>

      {/* PARA QUEM */}
      <section className="bg-lilac-soft px-5 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-4xl font-extrabold text-primary md:text-5xl">Antes de começar, veja se as aulas são para você</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl bg-card p-7 shadow-sm">
              <p className="text-2xl font-bold text-primary">É para quem…</p>
              <ul className="mt-5 space-y-4">
                {forWho.map((t) => (
                  <li key={t} className="flex gap-3"><Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />{t}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl bg-primary p-7 text-primary-foreground">
              <p className="text-2xl font-bold">Não é para quem…</p>
              <ul className="mt-5 space-y-4 opacity-90">
                {notForWho.map((t) => (
                  <li key={t} className="flex gap-3"><X className="mt-0.5 h-5 w-5 shrink-0 text-lilac" />{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PROFESSORA */}
      <section className="px-5 py-20">
        <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-[0.9fr_1.1fr]">
          <div className="relative">
            <img src={settings.about_photo_url} alt="Jaque Veloso" loading="lazy" className="aspect-[4/5] w-full rounded-[2rem] object-cover shadow-xl" />
            <p className="absolute -bottom-4 right-4 rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-lg">Intercambista ✈️</p>
          </div>
          <div>
            <Eyebrow>Conheça sua professora</Eyebrow>
            <h2 className="mt-4 text-4xl font-extrabold leading-tight text-primary md:text-5xl">{settings.about_heading}</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{settings.about_paragraph_one}</p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{settings.about_paragraph_two}</p>
            <blockquote className="mt-6 border-l-4 border-accent pl-5 font-serif text-xl italic text-primary">{settings.mission_text}</blockquote>
            <div className="mt-8"><Cta href={wa}>Quero aprender com a Jaque</Cta></div>
          </div>
        </div>
      </section>

      {/* OFERTA */}
      <section id="plano" className="bg-hero px-5 py-20 text-primary-foreground">
        <div className="mx-auto max-w-xl text-center">
          <Eyebrow dark>Condição especial</Eyebrow>
          <h2 className="mt-4 text-4xl font-extrabold md:text-5xl">Comece hoje as suas aulas</h2>
          <div className="mt-10 rounded-[2rem] bg-card p-8 text-left text-card-foreground shadow-2xl md:p-10">
            <p className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-xs font-bold uppercase text-primary-foreground"><Sparkles className="h-4 w-4" /> Oferta especial</p>
            <p className="mt-4 text-2xl font-bold text-primary">{settings.plan_name}</p>
            <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">{settings.plan_tag}</p>
            <ul className="mt-6 space-y-3">
              {settings.plan_features.map((f) => (
                <li key={f} className="flex gap-3"><Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />{f}</li>
              ))}
            </ul>
            <div className="mt-8 border-t border-border pt-6 text-center">
              <div className="flex justify-center text-sm font-semibold text-accent"><TodayPromotion /></div>
              <p className="mt-2 text-3xl text-primary"><PromotionPrice price={settings.plan_price} /></p>
              <div className="mt-4 flex items-center justify-center gap-2 text-sm">
                <span className="text-muted-foreground">Oferta encerra em</span> <PromoTimer />
              </div>
              <div className="mt-6"><Cta href={wa}>Garantir minha vaga</Cta></div>
            </div>
          </div>
        </div>
      </section>

      {/* EBOOKS */}
      {ebooks.length > 0 && (
        <section id="ebooks" className="bg-lilac-soft px-5 py-20">
          <div className="mx-auto max-w-6xl">
            <Eyebrow>Materiais</Eyebrow>
            <h2 className="mt-4 text-4xl font-extrabold text-primary md:text-5xl">E-books para estudar no seu ritmo</h2>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {ebooks.slice(0, 4).map((e) => <EbookCard key={e.id} ebook={e} whatsappUrl={wa} compact />)}
            </div>
            <Link to="/ebooks" className="mt-8 inline-flex items-center gap-2 font-bold text-primary underline">Ver todos os e-books <ArrowRight className="h-5 w-5" /></Link>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="px-5 py-20">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <Eyebrow>Dúvidas frequentes</Eyebrow>
            <h2 className="mt-4 text-4xl font-extrabold text-primary">Perguntas frequentes</h2>
          </div>
          <div className="mt-10 space-y-3">
            {[...faq, { q: "Quanto custa?", a: `De R$ 337,00 por ${settings.plan_price} no mês. Chame no WhatsApp para saber mais.` }].map(({ q, a }) => (
              <details key={q} className="rounded-2xl border border-border bg-card p-5">
                <summary className="cursor-pointer list-none text-lg font-semibold text-primary marker:hidden">{q}</summary>
                <p className="mt-3 text-muted-foreground">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL */}
      <section className="bg-lilac-soft px-5 py-20 text-center">
        <h2 className="mx-auto max-w-2xl text-4xl font-extrabold text-primary md:text-5xl">O inglês sempre foi pra você. Agora é a sua vez.</h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">Sem medo de errar. Sem achar que é só para os outros.</p>
        <div className="mt-8"><Cta href={wa}>Quero começar as aulas</Cta></div>
      </section>
    </div>
  );
}
