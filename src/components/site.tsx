import { Link } from "@tanstack/react-router";
import { Instagram, MessageCircle } from "lucide-react";
import type { ReactNode } from "react";
import { INSTAGRAM_URL, WHATSAPP_URL } from "@/lib/links";
import qr from "@/assets/whatsapp_qrcode.jpg.asset.json";

export function WhatsButton({ children = "Falar no WhatsApp", variant = "solid" }: { children?: ReactNode; variant?: "solid" | "light" }) {
  const cls =
    variant === "solid"
      ? "bg-whatsapp text-primary-foreground"
      : "bg-primary-foreground text-primary";
  return (
    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold transition hover:-translate-y-0.5 ${cls}`}>
      <MessageCircle className="h-5 w-5" /> {children}
    </a>
  );
}

export function InstaButton({ className = "" }: { className?: string }) {
  return (
    <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 rounded-full border-2 border-current px-6 py-3 font-semibold transition hover:-translate-y-0.5 ${className}`}>
      <Instagram className="h-5 w-5" /> @teacherjaqueveloso
    </a>
  );
}

const nav = [
  { to: "/", label: "Início" },
  { to: "/sobre", label: "Sobre mim" },
  { to: "/planos", label: "Planos" },
  { to: "/ebooks", label: "E-books" },
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <Link to="/" className="font-display text-xl font-extrabold text-primary">
          Jaque<span className="text-accent">.</span>Veloso
        </Link>
        <nav className="hidden gap-6 text-sm font-medium md:flex">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: true }}
              className="text-muted-foreground hover:text-primary" activeProps={{ className: "text-primary font-bold" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
            className="rounded-full bg-lilac-soft p-2 text-primary hover:bg-lilac"><Instagram className="h-5 w-5" /></a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
            className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Agendar aula</a>
        </div>
      </div>
      <nav className="flex justify-around border-t py-2 text-sm md:hidden">
        {nav.map((n) => (
          <Link key={n.to} to={n.to} activeOptions={{ exact: true }} className="text-muted-foreground" activeProps={{ className: "text-primary font-bold" }}>{n.label}</Link>
        ))}
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-hero text-primary-foreground">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 py-14 text-center">
        <h2 className="text-3xl font-bold md:text-4xl">Bora destravar seu inglês?</h2>
        <div className="flex flex-wrap justify-center gap-3">
          <WhatsButton>Quero começar</WhatsButton>
          <InstaButton />
        </div>
        <div className="flex flex-col items-center gap-2">
          <img src={qr.url} alt="QR code do WhatsApp da Teacher Jaque" className="w-36 rounded-2xl bg-card p-2" />
          <p className="text-sm opacity-80">Ou aponte a câmera do celular</p>
        </div>
        <p className="text-sm opacity-70">© {new Date().getFullYear()} Teacher Jaque Veloso · Aulas de inglês online</p>
      </div>
    </footer>
  );
}

export function FloatingWhats() {
  return (
    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
      className="fixed bottom-5 right-5 z-50 rounded-full bg-whatsapp p-4 text-primary-foreground shadow-lg transition hover:scale-110">
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
