import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Instagram, MessageCircle, Settings } from "lucide-react";
import type { ReactNode } from "react";
import qr from "@/assets/whatsapp_qrcode.jpg.asset.json";
import { contentQueryOptions, fallbackContent } from "@/lib/content";

function useLinks() {
  const { data = fallbackContent } = useQuery(contentQueryOptions);
  return data.settings;
}

export function WhatsButton({ children = "Falar no WhatsApp", variant = "solid", href }: { children?: ReactNode; variant?: "solid" | "light"; href?: string }) {
  const settings = useLinks();
  const cls = variant === "solid" ? "bg-whatsapp text-primary-foreground" : "bg-primary-foreground text-primary";
  return (
    <a
      href={href ?? settings.whatsapp_url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold transition hover:-translate-y-0.5 ${cls}`}
    >
      <MessageCircle className="h-5 w-5" /> {children}
    </a>
  );
}

export function InstaButton({ className = "" }: { className?: string }) {
  const settings = useLinks();
  return (
    <a
      href={settings.instagram_url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full border-2 border-current px-6 py-3 font-semibold transition hover:-translate-y-0.5 ${className}`}
    >
      <Instagram className="h-5 w-5" /> @teacherjaqueveloso
    </a>
  );
}

const nav = [
  { to: "/", label: "Início" },
  { to: "/sobre", label: "Sobre mim" },
  { to: "/planos", label: "Turma" },
  { to: "/ebooks", label: "E-books" },
] as const;

export function Header() {
  const settings = useLinks();
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <a
        href={settings.whatsapp_url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 bg-primary px-4 py-2 text-center text-xs font-semibold text-primary-foreground sm:text-sm"
      >
        Turmas com até 6 alunos · material incluso <span className="underline">Quero minha vaga</span>
      </a>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <Link to="/" className="font-display text-xl font-extrabold text-primary">
          Jaque<span className="text-accent">.</span>Veloso
        </Link>
        <nav className="hidden gap-6 text-sm font-medium md:flex" aria-label="Navegação principal">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: true }}
              className="text-muted-foreground hover:text-primary"
              activeProps={{ className: "text-primary font-bold" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={settings.instagram_url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="rounded-full bg-lilac-soft p-2 text-primary hover:bg-lilac"
          >
            <Instagram className="h-5 w-5" />
          </a>
          <a
            href={settings.whatsapp_url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
          >
            Entrar na turma
          </a>
        </div>
      </div>
      <nav className="flex justify-around border-t py-2 text-sm md:hidden" aria-label="Navegação móvel">
        {nav.map((item) => (
          <Link key={item.to} to={item.to} activeOptions={{ exact: true }} className="text-muted-foreground" activeProps={{ className: "text-primary font-bold" }}>
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export function Footer() {
  const settings = useLinks();
  return (
    <footer className="bg-hero text-primary-foreground">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 py-14 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-lilac">Seu inglês pode começar hoje</p>
        <h2 className="max-w-2xl text-3xl font-bold md:text-4xl">Escolha seu próximo passo: entre na turma ou comece com um e-book.</h2>
        <div className="flex flex-wrap justify-center gap-3">
          <WhatsButton href={settings.whatsapp_url}>Quero entrar na turma</WhatsButton>
          <Link to="/ebooks" className="inline-flex items-center rounded-full border-2 border-current px-6 py-3 font-semibold">
            Ver e-books
          </Link>
          <InstaButton />
        </div>
        <div className="flex flex-col items-center gap-2">
          <img src={qr.url} alt="QR code do WhatsApp da Teacher Jaque" className="w-32 rounded-2xl bg-card p-2" />
          <p className="text-sm opacity-80">Ou aponte a câmera do celular</p>
        </div>
        <Link to="/entrar" className="inline-flex items-center gap-2 text-sm opacity-70 underline hover:opacity-100">
          <Settings className="h-4 w-4" /> Área da Teacher
        </Link>
        <p className="text-sm opacity-70">© {new Date().getFullYear()} Teacher Jaque Veloso · Aulas de inglês online</p>
      </div>
    </footer>
  );
}

export function FloatingWhats() {
  const settings = useLinks();
  return (
    <a
      href={settings.whatsapp_url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Quero entrar na turma pelo WhatsApp"
      className="fixed bottom-5 right-5 z-50 rounded-full bg-whatsapp p-4 text-primary-foreground shadow-lg transition hover:scale-110"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
