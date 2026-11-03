import { createFileRoute, Link } from "@tanstack/react-router";
import { Plane, Briefcase, Coffee, ArrowRight } from "lucide-react";
import foto from "@/assets/jaque_cafe.jpg.asset.json";
import retrato from "@/assets/jaque_retrato.jpg.asset.json";
import aula1 from "@/assets/aula_online_1.jpg.asset.json";
import aula2 from "@/assets/aula_online_2.jpg.asset.json";
import aula3 from "@/assets/aula_online_3.jpg.asset.json";
import dep1 from "@/assets/depoimento_bruna.jpg.asset.json";
import dep2 from "@/assets/depoimento_bru.png.asset.json";
import dep3 from "@/assets/depoimento_marina.png.asset.json";
import { WhatsButton, InstaButton } from "@/components/site";
import { FotoCarousel, type Slide } from "@/components/carousel-fotos";

const slides: Slide[] = [
  { src: foto.url, alt: "Teacher Jaque Veloso" },
  { src: dep3.url, alt: "Depoimento da aluna Marina", fit: "contain" },
  { src: aula1.url, alt: "Aula online com aluna" },
  { src: dep2.url, alt: "Depoimento da aluna Bru", fit: "contain" },
  { src: retrato.url, alt: "Retrato da Teacher Jaque" },
  { src: aula2.url, alt: "Aula online com jogos" },
  { src: dep1.url, alt: "Depoimento da aluna Bruna", fit: "contain" },
  { src: aula3.url, alt: "Aula online de conversação" },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Teacher Jaque Veloso — Destrave seu inglês para a vida real" },
      { name: "description", content: "Aulas de inglês online, particulares ou em grupo, com foco em conversação para viagens, trabalho e dia a dia." },
      { property: "og:title", content: "Teacher Jaque Veloso — Inglês para a vida real" },
      { property: "og:description", content: "Aulas de inglês online com foco em comunicação e confiança." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <section className="bg-hero text-primary-foreground">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-24">
          <div>
            <span className="inline-block rounded-full bg-lilac px-4 py-1 text-sm font-semibold text-accent-foreground">English Teacher ✦ online</span>
            <h1 className="mt-5 text-5xl font-extrabold leading-[1.05] md:text-6xl">
              Destrave seu inglês <span className="text-lilac">para a vida real.</span>
            </h1>
            <p className="mt-5 max-w-md text-lg opacity-85">Aulas com foco em comunicação, confiança e situações reais — do primeiro nível em diante.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <WhatsButton>Quero minha aula</WhatsButton>
              <InstaButton />
            </div>
          </div>
          <div className="relative mx-auto w-72 md:w-80">
            <div className="absolute -inset-3 rotate-6 rounded-3xl bg-lilac" />
            <div className="relative"><FotoCarousel slides={slides} /></div>
            <p className="relative mt-4 text-center text-sm opacity-80">Minhas aulas e o que meus alunos dizem 💜</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-3xl font-bold md:text-4xl">Inglês pra usar de verdade</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[
            { i: Coffee, t: "Dia a dia", d: "Converse sem travar em situações do cotidiano." },
            { i: Plane, t: "Viagens", d: "Aeroporto, hotel, restaurante: viaje com confiança." },
            { i: Briefcase, t: "Trabalho", d: "Reuniões, e-mails e entrevistas em inglês." },
          ].map(({ i: Icon, t, d }) => (
            <div key={t} className="rounded-2xl border-2 border-primary bg-card p-6 shadow-pop">
              <Icon className="h-8 w-8 text-accent" />
              <h3 className="mt-4 text-xl font-bold">{t}</h3>
              <p className="mt-2 text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-5 px-5 pb-20 md:grid-cols-2">
        <Link to="/planos" className="group rounded-3xl bg-primary p-8 text-primary-foreground">
          <p className="text-sm opacity-70">A partir de R$ 280,00/mês</p>
          <h3 className="mt-2 text-3xl font-bold">Conheça os planos</h3>
          <ArrowRight className="mt-6 h-6 w-6 transition group-hover:translate-x-2" />
        </Link>
        <Link to="/ebooks" className="group rounded-3xl bg-lilac-soft p-8 text-primary">
          <p className="text-sm text-muted-foreground">E-book grátis disponível</p>
          <h3 className="mt-2 text-3xl font-bold">Inglês para Viajar Sem Travar</h3>
          <ArrowRight className="mt-6 h-6 w-6 transition group-hover:translate-x-2" />
        </Link>
      </section>
    </>
  );
}
