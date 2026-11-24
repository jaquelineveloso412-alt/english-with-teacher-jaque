import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Nova senha — Área da Teacher" },
      { name: "description", content: "Crie uma nova senha para acessar a área de edição." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Nova senha" },
      { property: "og:description", content: "Recuperação do acesso da Teacher." },
    ],
  }),
  component: ResetPassword,
});

function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [validLink, setValidLink] = useState(true);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setValidLink(window.location.hash.includes("type=recovery"));
  }, []);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) {
      setMessage("Não foi possível trocar a senha. Abra novamente o link recebido por e-mail.");
      return;
    }
    await supabase.auth.signOut();
    await navigate({ to: "/entrar" });
  }

  return (
    <div className="mx-auto max-w-md px-5 py-16">
      <form onSubmit={submit} className="rounded-3xl border bg-card p-7 shadow-pop">
        <h1 className="text-3xl font-extrabold">Criar nova senha</h1>
        {!validLink && <p className="mt-3 text-sm text-muted-foreground">Abra esta página pelo link recebido no seu e-mail.</p>}
        <label className="mt-6 block text-sm font-semibold">
          Nova senha
          <input type="password" minLength={6} required value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full rounded-xl border bg-background px-4 py-3 font-normal" />
        </label>
        <Button type="submit" disabled={busy || !validLink} className="mt-5 w-full rounded-full py-6">Salvar nova senha</Button>
        {message && <p className="mt-4 text-sm text-destructive">{message}</p>}
        <Link to="/entrar" className="mt-5 block text-center text-sm text-primary underline">Voltar para o acesso</Link>
      </form>
    </div>
  );
}
