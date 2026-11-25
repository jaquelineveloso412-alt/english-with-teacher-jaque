import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { GraduationCap, Award, Globe2, MessagesSquare, Check } from "lucide-react";
import { WhatsButton } from "@/components/site";
import { contentQueryOptions } from "@/lib/content";

export const Route = createFileRoute("/sobre")({
  loader: ({ context }) => context.queryClient.ensureQueryData(contentQueryOptions),
  head: ({ loaderData }) => {
    const image = loaderData?.settings.about_photo_url;
    const socialImage = image?.startsWith("https://")
      ? [{ property: "og:image", content: image }, { name: "twitter:image", content: image }]
      : [];
    return {
      meta: [
        { title: "Sobre mim — Teacher Jaque Veloso" },
        { name: "description", content: "Professora de inglês há mais de 5 anos, formada em Letras pela UEMG, TOEFL e pós-graduanda pela UFMG." },
        { property: "og:title", content: "Conheça a Teacher Jaque Veloso" },
        { property: "og:description", content: "Experiência, metodologia e uma paixão: ajudar você a se comunicar com confiança." },
        ...socialImage,
      ],
    };
  },
  component: Sobre,
});

function Sobre() {
  const { data } = useSuspenseQuery(contentQueryOptions);
  const { settings } = data;
  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <div className="grid items-center gap-12 md:grid-cols-[0.9fr_1.1fr]">
        <div className="relative mx-auto w-full max-w-sm">
          <div className="absolute -inset-3 -rotate-3 rounded-[2rem] bg-lilac" />
          <img src={settings.about_photo_url} alt="Teacher Jaque Veloso em seu ambiente de aulas" className="relative aspect-[4/5] w-full rounded-[2rem] object-cover object-center" />
        </div>
        <div>
          <p className="font-semibold text-accent">Quem vai acompanhar você?</p>
          <h1 className="mt-2 text-4xl font-extrabold md:text-5xl">{settings.about_heading} 👋</h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{settings.about_paragraph_one}</p>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{settings.about_paragraph_two}</p>
          <div className="mt-6 rounded-2xl bg-lilac-soft p-5">
            <p className="font-bold text-primary">Minha missão</p>
            <p className="mt-1 text-primary">{settings.mission_text}</p>
          </div>
        </div>
      </div>

      <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: GraduationCap, title: "Letras — UEMG" },
          { icon: Award, title: "Proficiência TOEFL" },
          { icon: GraduationCap, title: "Pós em Ensino de Inglês — UFMG" },
          { icon: Globe2, title: "Intercambista" },
        ].map(({ icon: Icon, title }) => (
          <div key={title} className="flex items-center gap-3 rounded-2xl border bg-card p-5">
            <Icon className="h-6 w-6 shrink-0 text-accent" /><span className="font-semibold">{title}</span>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-3xl bg-primary p-8 text-primary-foreground md:p-12">
        <MessagesSquare className="h-8 w-8 text-lilac" />
        <h2 className="mt-3 text-3xl font-bold">Minha metodologia</h2>
        <p className="mt-3 max-w-2xl opacity-85">{settings.methodology_text}</p>
        <ul className="mt-6 grid gap-2 sm:grid-cols-2">
          {["Aulas ao vivo toda semana", "Planejamento de acordo com seu objetivo", "Material incluso", "Plataforma de apoio", "Prática de conversação real", "Inglês para viagens, trabalho e dia a dia"].map((feature) => (
            <li key={feature} className="flex gap-2"><Check className="h-5 w-5 shrink-0 text-lilac" />{feature}</li>
          ))}
        </ul>
        <div className="mt-8"><WhatsButton href={settings.whatsapp_url}>Quero aprender com a Jaque</WhatsButton></div>
      </div>
    </div>
  );
}
