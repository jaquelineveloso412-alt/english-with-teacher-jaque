import { createFileRoute } from "@tanstack/react-router";
import { GraduationCap, Award, Globe2, MessagesSquare, Check } from "lucide-react";
import foto from "@/assets/jaque_retrato.jpg.asset.json";
import { WhatsButton } from "@/components/site";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre mim — Teacher Jaque Veloso" },
      { name: "description", content: "Professora de inglês há mais de 5 anos, formada em Letras (UEMG), TOEFL e pós-graduanda pela UFMG." },
      { property: "og:title", content: "Sobre a Teacher Jaque Veloso" },
      { property: "og:description", content: "Conheça minha trajetória e metodologia focada em conversação." },
    ],
  }),
  component: Sobre,
});

function Sobre() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <div className="grid items-center gap-12 md:grid-cols-[1fr_1.3fr]">
        <div className="relative mx-auto w-72">
          <div className="absolute -inset-3 -rotate-6 rounded-full bg-lilac" />
          <img src={foto.url} alt="Jaque Veloso" className="relative aspect-square w-full rounded-full object-cover" />
        </div>
        <div>
          <p className="font-semibold text-accent">Quem sou eu?</p>
          <h1 className="mt-2 text-4xl font-extrabold md:text-5xl">Hi, I'm Jaque! 👋</h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Sou professora de inglês há mais de 5 anos, formada em Letras pela UEMG, com proficiência comprovada pelo TOEFL e pós-graduanda em Ensino de Língua Inglesa pela UFMG.
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            Minha paixão está na comunicação — por isso minhas aulas são voltadas para você ganhar segurança para falar, desde os primeiros níveis. Também sou apaixonada por viagens: meu primeiro intercâmbio foi em Cambridge, no Reino Unido.
          </p>
          <div className="mt-6 rounded-2xl bg-lilac-soft p-5">
            <p className="font-bold text-primary">Minha missão</p>
            <p className="mt-1 text-primary">Te ajudar a transformar o inglês em uma ferramenta para a sua vida — viajar, trabalhar, estudar ou se comunicar com mais confiança.</p>
          </div>
        </div>
      </div>

      <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { i: GraduationCap, t: "Letras — UEMG" },
          { i: Award, t: "Proficiência TOEFL" },
          { i: GraduationCap, t: "Pós em Ensino de Inglês — UFMG" },
          { i: Globe2, t: "Intercâmbio em Cambridge" },
        ].map(({ i: Icon, t }) => (
          <div key={t} className="flex items-center gap-3 rounded-2xl border bg-card p-5">
            <Icon className="h-6 w-6 shrink-0 text-accent" /><span className="font-semibold">{t}</span>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-3xl bg-primary p-8 text-primary-foreground md:p-12">
        <MessagesSquare className="h-8 w-8 text-lilac" />
        <h2 className="mt-3 text-3xl font-bold">Minha metodologia</h2>
        <p className="mt-3 max-w-2xl opacity-85">80% das aulas são prática de conversação, trabalhando as quatro habilidades — speaking, listening, reading e writing — com foco especial em pronúncia e fala natural.</p>
        <ul className="mt-6 grid gap-2 sm:grid-cols-2">
          {["Aulas personalizadas", "Planejamento de acordo com seu objetivo", "Material complementar preparado por mim", "Acompanhamento da sua evolução", "Prática de conversação real", "Inglês para viagens, trabalho e dia a dia"].map((f) => (
            <li key={f} className="flex gap-2"><Check className="h-5 w-5 shrink-0 text-lilac" />{f}</li>
          ))}
        </ul>
        <div className="mt-8"><WhatsButton>Bora conversar</WhatsButton></div>
      </div>
    </div>
  );
}
