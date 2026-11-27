import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { LovableMark } from "@lovable.dev/cloud-auth-js/react";
import { LockKeyhole } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/entrar")({
  head: () => ({
    meta: [
      { title: "Área da Teacher — Jaque Veloso" },
      { name: "description", content: "Acesso protegido para edição do site da Teacher Jaque Veloso." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Área da Teacher" },
      { property: "og:description", content: "Acesso restrito para gerenciar o conteúdo do site." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Login,
});

function GoogleMark() {
  return (
    <svg aria-hidden="true" className="h-[18px] w-[18px]" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z" />
      <path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z" />
      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z" />
    </svg>
  );
}

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  async function signIn(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) {
      setMessage("Não foi possível entrar. Confira seu e-mail e sua senha.");
      return;
    }
    await navigate({ to: "/admin" });
  }

  async function social(provider: "google" | "lovable") {
    setBusy(true);
    setMessage("");
    const result = await lovable.auth.signInWithOAuth(provider, { redirect_uri: window.location.origin });
    if (result.error) {
      setBusy(false);
      setMessage("Não foi possível abrir o acesso. Tente novamente.");
    }
  }

  async function forgotPassword() {
    if (!email) {
      setMessage("Digite seu e-mail acima para receber o link de nova senha.");
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setBusy(false);
    setMessage(error ? "Não foi possível enviar o e-mail agora." : "Enviamos um link para você criar uma nova senha.");
  }

  return (
    <div className="mx-auto flex max-w-md flex-col px-5 py-14">
      <div className="rounded-3xl border bg-card p-7 shadow-pop">
        <LockKeyhole className="h-9 w-9 text-accent" />
        <h1 className="mt-4 text-3xl font-extrabold">Área da Teacher</h1>
        <p className="mt-2 text-sm text-muted-foreground">Entre para editar textos, fotos, depoimentos, aulas e e-books.</p>
        <form onSubmit={signIn} className="mt-7 space-y-4">
          <label className="block text-sm font-semibold">
            E-mail
            <input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full rounded-xl border bg-background px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-ring" />
          </label>
          <label className="block text-sm font-semibold">
            Senha
            <input type="password" required value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full rounded-xl border bg-background px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-ring" />
          </label>
          <Button type="submit" disabled={busy} className="w-full rounded-full py-6">Entrar para editar</Button>
        </form>
        <button type="button" onClick={forgotPassword} className="mt-3 w-full text-sm font-medium text-primary underline">Esqueci minha senha</button>
        <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground"><span className="h-px flex-1 bg-border" />ou<span className="h-px flex-1 bg-border" /></div>
        <div className="space-y-3">
          <Button type="button" disabled={busy} onClick={() => social("google")} className="w-full rounded-full border border-google-border bg-google py-6 font-medium text-google-foreground hover:bg-google-muted">
            <GoogleMark /> Continuar com Google
          </Button>
          <Button type="button" disabled={busy} variant="outline" onClick={() => social("lovable")} className="w-full rounded-full py-6">
            <LovableMark /> Continuar com Lovable
          </Button>
        </div>
        {message && <p role="status" className="mt-5 rounded-xl bg-lilac-soft p-3 text-center text-sm text-primary">{message}</p>}
      </div>
    </div>
  );
}
