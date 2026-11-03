import { createFileRoute } from "@tanstack/react-router";
import { Download, Lock } from "lucide-react";
import capa from "@/assets/ebook_viagem_capa.jpg.asset.json";
import pdf from "@/assets/ebook_viagens.pdf.asset.json";
import { WHATSAPP_URL } from "@/lib/links";

export const Route = createFileRoute("/ebooks")({
  head: () => ({
    meta: [
      { title: "E-books de inglês — Teacher Jaque Veloso" },
      { name: "description", content: "Baixe grátis o e-book Inglês para Viajar Sem Travar e conheça os e-books pagos." },
      { property: "og:title", content: "E-books grátis e pagos — Jaque Veloso" },
      { property: "og:description", content: "Inglês para Viajar Sem Travar: frases reais para sua viagem." },
    ],
  }),
  component: Ebooks,
});

function Ebooks() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <h1 className="text-4xl font-extrabold md:text-5xl">E-books</h1>
      <p className="mt-3 text-muted-foreground">Materiais pra você estudar no seu ritmo.</p>

      <h2 className="mt-12 text-2xl font-bold">Grátis 🎁</h2>
      <div className="mt-5 grid items-center gap-8 rounded-3xl bg-lilac-soft p-6 md:grid-cols-[220px_1fr] md:p-10">
        <img src={capa.url} alt="Capa do e-book Inglês para Viajar Sem Travar" className="w-48 rounded-xl shadow-pop md:w-full" />
        <div>
          <h3 className="text-3xl font-bold text-primary">Inglês para Viajar Sem Travar</h3>
          <p className="mt-3 text-primary/80">Frases reais para aeroporto, imigração, hotel, restaurante, transporte, compras e emergências — além de checklist de viagem, 20 erros comuns de brasileiros e vocabulário.</p>
          <a href={pdf.url} target="_blank" rel="noopener noreferrer" download
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:-translate-y-0.5">
            <Download className="h-5 w-5" /> Baixar grátis
          </a>
        </div>
      </div>

      <h2 className="mt-14 text-2xl font-bold">Pagos 💜</h2>
      <div className="mt-5 grid gap-5 md:grid-cols-3">
        {["Em breve", "Em breve", "Em breve"].map((t, i) => (
          <div key={i} className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed p-10 text-center text-muted-foreground">
            <Lock className="h-8 w-8" />
            <p className="mt-3 font-semibold">{t}</p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="mt-2 text-sm text-accent underline">Quero ser avisado(a)</a>
          </div>
        ))}
      </div>
    </div>
  );
}
