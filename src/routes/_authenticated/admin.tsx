import { useEffect, useState, type ReactNode } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { LogOut, Plus, Save, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { adminContentQueryOptions, contentQueryOptions, type Ebook, type SiteSettings, type Testimonial } from "@/lib/content";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Editar site — Área da Teacher" },
      { name: "description", content: "Gerencie o conteúdo público do site Teacher Jaque Veloso." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Editar site" },
      { property: "og:description", content: "Área restrita da Teacher Jaque." },
    ],
  }),
  component: Admin,
});

type Tab = "inicio" | "sobre" | "depoimentos" | "ebooks";

function Field({ label, children, help }: { label: string; children: ReactNode; help?: string }) {
  return (
    <label className="block text-sm font-semibold text-primary">
      {label}
      <div className="mt-2 font-normal">{children}</div>
      {help && <span className="mt-1 block text-xs font-normal text-muted-foreground">{help}</span>}
    </label>
  );
}

const inputClass = "w-full rounded-xl border bg-background px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring";
const buttonClass = "inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-50";

function FileUpload({ label, accept, onUploaded }: { label: string; accept: string; onUploaded: (value: string) => void }) {
  const [uploading, setUploading] = useState(false);
  async function upload(file?: File) {
    if (!file) return;
    setUploading(true);
    const extension = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "bin";
    const path = `uploads/${crypto.randomUUID()}.${extension}`;
    const { error } = await supabase.storage.from("conteudo").upload(path, file, { cacheControl: "3600", upsert: false });
    setUploading(false);
    if (error) {
      toast.error("Não foi possível enviar. Confira o formato e o tamanho de até 20 MB.");
      return;
    }
    onUploaded(`storage:${path}`);
    toast.success("Arquivo enviado. Clique em Salvar para publicar a alteração.");
  }
  return (
    <label className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm font-semibold text-primary">
      <Upload className="h-4 w-4" /> {uploading ? "Enviando..." : label}
      <input type="file" accept={accept} disabled={uploading} onChange={(event) => void upload(event.target.files?.[0])} className="hidden" />
    </label>
  );
}

function ImagePreview({ src, alt }: { src: string; alt: string }) {
  if (!src || src.startsWith("storage:")) return <p className="mt-3 text-sm text-muted-foreground">Novo arquivo pronto. Salve para atualizar a visualização.</p>;
  return <img src={src} alt={alt} className="mt-3 h-44 rounded-2xl object-cover" />;
}

function Admin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery(adminContentQueryOptions);
  const [tab, setTab] = useState<Tab>("inicio");
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [ebooks, setEbooks] = useState<Ebook[]>([]);
  const [saving, setSaving] = useState("");

  useEffect(() => {
    if (!data) return;
    setSettings(data.settings);
    setTestimonials(data.testimonials);
    setEbooks(data.ebooks);
  }, [data]);

  async function refresh() {
    await queryClient.invalidateQueries({ queryKey: contentQueryOptions.queryKey });
    await queryClient.invalidateQueries({ queryKey: adminContentQueryOptions.queryKey });
  }

  async function saveSettings() {
    if (!settings) return;
    setSaving("settings");
    const { error: saveError } = await supabase.from("site_content").update({
      hero_eyebrow: settings.hero_eyebrow,
      hero_title: settings.hero_title,
      hero_highlight: settings.hero_highlight,
      hero_description: settings.hero_description,
      home_photo_url: settings.home_photo_url,
      about_photo_url: settings.about_photo_url,
      about_heading: settings.about_heading,
      about_paragraph_one: settings.about_paragraph_one,
      about_paragraph_two: settings.about_paragraph_two,
      mission_text: settings.mission_text,
      methodology_text: settings.methodology_text,
      plan_name: settings.plan_name,
      plan_tag: settings.plan_tag,
      plan_price: settings.plan_price,
      plan_features: settings.plan_features,
      whatsapp_url: settings.whatsapp_url,
      instagram_url: settings.instagram_url,
      updated_at: new Date().toISOString(),
    }).eq("id", "main");
    setSaving("");
    if (saveError) return toast.error("Não foi possível salvar. Tente novamente.");
    await refresh();
    toast.success("Textos, fotos e turma atualizados no site.");
  }

  async function saveTestimonial(item: Testimonial) {
    setSaving(item.id);
    const payload = { image_url: item.image_url, alt_text: item.alt_text, position: item.position, active: item.active };
    const result = item.id.startsWith("new-")
      ? await supabase.from("testimonials").insert(payload)
      : await supabase.from("testimonials").update(payload).eq("id", item.id);
    setSaving("");
    if (result.error) return toast.error("Não foi possível salvar o depoimento.");
    await refresh();
    toast.success("Depoimento salvo.");
  }

  async function removeTestimonial(item: Testimonial) {
    if (!window.confirm("Remover este depoimento?")) return;
    if (!item.id.startsWith("new-")) {
      const { error: deleteError } = await supabase.from("testimonials").delete().eq("id", item.id);
      if (deleteError) return toast.error("Não foi possível remover o depoimento.");
    }
    setTestimonials((current) => current.filter((entry) => entry.id !== item.id));
    await refresh();
    toast.success("Depoimento removido.");
  }

  async function saveEbook(item: Ebook) {
    setSaving(item.id);
    const payload = {
      title: item.title,
      description: item.description,
      cover_url: item.cover_url,
      file_url: item.file_url,
      is_free: item.is_free,
      price_text: item.price_text,
      checkout_url: item.checkout_url,
      position: item.position,
      visible: item.visible,
    };
    const result = item.id.startsWith("new-")
      ? await supabase.from("ebooks").insert(payload)
      : await supabase.from("ebooks").update(payload).eq("id", item.id);
    setSaving("");
    if (result.error) return toast.error("Não foi possível salvar o e-book.");
    await refresh();
    toast.success("E-book salvo e atualizado no site.");
  }

  async function removeEbook(item: Ebook) {
    if (!window.confirm("Remover este e-book?")) return;
    if (!item.id.startsWith("new-")) {
      const { error: deleteError } = await supabase.from("ebooks").delete().eq("id", item.id);
      if (deleteError) return toast.error("Não foi possível remover o e-book.");
    }
    setEbooks((current) => current.filter((entry) => entry.id !== item.id));
    await refresh();
    toast.success("E-book removido.");
  }

  async function signOut() {
    await supabase.auth.signOut();
    await navigate({ to: "/entrar" });
  }

  if (isLoading) return <div className="mx-auto max-w-5xl px-5 py-16">Carregando sua área de edição...</div>;
  if (error || !settings) {
    return (
      <div className="mx-auto max-w-lg px-5 py-16 text-center">
        <h1 className="text-3xl font-bold">Acesso ainda não liberado</h1>
        <p className="mt-3 text-muted-foreground">Este login existe, mas ainda não tem permissão de criadora. Entre com a conta liberada para editar.</p>
        <button onClick={signOut} className={`${buttonClass} mt-6`}><LogOut className="h-4 w-4" /> Trocar de conta</button>
        <Link to="/" className="mt-5 block text-sm text-primary underline">Voltar ao site</Link>
      </div>
    );
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: "inicio", label: "Página inicial" },
    { id: "sobre", label: "Sobre e turma" },
    { id: "depoimentos", label: "Depoimentos" },
    { id: "ebooks", label: "E-books" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-accent">Área da Teacher</p>
          <h1 className="mt-2 text-3xl font-extrabold">Edite seu site sem complicação.</h1>
          <p className="mt-2 text-sm text-muted-foreground">Faça as alterações e clique em Salvar em cada seção.</p>
        </div>
        <div className="flex gap-2">
          <Link to="/" className="inline-flex items-center rounded-full border px-5 py-3 text-sm font-semibold text-primary">Ver site</Link>
          <button onClick={signOut} className="inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold text-primary"><LogOut className="h-4 w-4" /> Sair</button>
        </div>
      </div>

      <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
        {tabs.map((item) => (
          <button key={item.id} onClick={() => setTab(item.id)} className={`whitespace-nowrap rounded-full px-5 py-3 text-sm font-bold ${tab === item.id ? "bg-primary text-primary-foreground" : "bg-lilac-soft text-primary"}`}>{item.label}</button>
        ))}
      </div>

      {(tab === "inicio" || tab === "sobre") && (
        <section className="mt-6 rounded-3xl border bg-card p-6 md:p-8">
          {tab === "inicio" ? (
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Chamada pequena"><input className={inputClass} value={settings.hero_eyebrow} onChange={(e) => setSettings({ ...settings, hero_eyebrow: e.target.value })} /></Field>
              <Field label="Título principal"><input className={inputClass} value={settings.hero_title} onChange={(e) => setSettings({ ...settings, hero_title: e.target.value })} /></Field>
              <Field label="Destaque do título"><input className={inputClass} value={settings.hero_highlight} onChange={(e) => setSettings({ ...settings, hero_highlight: e.target.value })} /></Field>
              <Field label="Texto de apresentação"><textarea rows={4} className={inputClass} value={settings.hero_description} onChange={(e) => setSettings({ ...settings, hero_description: e.target.value })} /></Field>
              <div>
                <span className="text-sm font-semibold text-primary">Foto da página inicial</span>
                <ImagePreview src={settings.home_photo_url} alt="Foto atual da página inicial" />
                <FileUpload label="Trocar foto do início" accept="image/jpeg,image/png,image/webp" onUploaded={(url) => setSettings({ ...settings, home_photo_url: url })} />
              </div>
              <div className="space-y-5">
                <Field label="Link do WhatsApp"><input type="url" className={inputClass} value={settings.whatsapp_url} onChange={(e) => setSettings({ ...settings, whatsapp_url: e.target.value })} /></Field>
                <Field label="Link do Instagram"><input type="url" className={inputClass} value={settings.instagram_url} onChange={(e) => setSettings({ ...settings, instagram_url: e.target.value })} /></Field>
              </div>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Título da biografia"><input className={inputClass} value={settings.about_heading} onChange={(e) => setSettings({ ...settings, about_heading: e.target.value })} /></Field>
              <div className="md:row-span-3">
                <span className="text-sm font-semibold text-primary">Foto do Sobre mim</span>
                <ImagePreview src={settings.about_photo_url} alt="Foto atual da biografia" />
                <FileUpload label="Trocar foto do Sobre mim" accept="image/jpeg,image/png,image/webp" onUploaded={(url) => setSettings({ ...settings, about_photo_url: url })} />
              </div>
              <Field label="Primeiro parágrafo"><textarea rows={4} className={inputClass} value={settings.about_paragraph_one} onChange={(e) => setSettings({ ...settings, about_paragraph_one: e.target.value })} /></Field>
              <Field label="Segundo parágrafo"><textarea rows={4} className={inputClass} value={settings.about_paragraph_two} onChange={(e) => setSettings({ ...settings, about_paragraph_two: e.target.value })} /></Field>
              <Field label="Missão"><textarea rows={3} className={inputClass} value={settings.mission_text} onChange={(e) => setSettings({ ...settings, mission_text: e.target.value })} /></Field>
              <Field label="Metodologia"><textarea rows={3} className={inputClass} value={settings.methodology_text} onChange={(e) => setSettings({ ...settings, methodology_text: e.target.value })} /></Field>
              <Field label="Nome da turma"><input className={inputClass} value={settings.plan_name} onChange={(e) => setSettings({ ...settings, plan_name: e.target.value })} /></Field>
              <Field label="Destaque da turma"><input className={inputClass} value={settings.plan_tag} onChange={(e) => setSettings({ ...settings, plan_tag: e.target.value })} /></Field>
              <Field label="Preço mensal"><input className={inputClass} value={settings.plan_price} onChange={(e) => setSettings({ ...settings, plan_price: e.target.value })} /></Field>
              <Field label="O que está incluso" help="Escreva um tópico por linha."><textarea rows={8} className={inputClass} value={settings.plan_features.join("\n")} onChange={(e) => setSettings({ ...settings, plan_features: e.target.value.split("\n") })} /></Field>
            </div>
          )}
          <button onClick={saveSettings} disabled={saving === "settings"} className={`${buttonClass} mt-7`}><Save className="h-4 w-4" />{saving === "settings" ? "Salvando..." : "Salvar alterações"}</button>
        </section>
      )}

      {tab === "depoimentos" && (
        <section className="mt-6">
          <button onClick={() => setTestimonials([...testimonials, { id: `new-${Date.now()}`, image_url: "", alt_text: "Depoimento de aluno", position: testimonials.length, active: true, created_at: "" }])} className={buttonClass}><Plus className="h-4 w-4" /> Adicionar depoimento</button>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {testimonials.map((item, index) => (
              <article key={item.id} className="rounded-3xl border bg-card p-6">
                <ImagePreview src={item.image_url} alt={item.alt_text} />
                <FileUpload label="Enviar print do depoimento" accept="image/jpeg,image/png,image/webp" onUploaded={(url) => setTestimonials(testimonials.map((entry) => entry.id === item.id ? { ...entry, image_url: url } : entry))} />
                <div className="mt-5 grid gap-4">
                  <Field label="Nome ou descrição"><input className={inputClass} value={item.alt_text} onChange={(e) => setTestimonials(testimonials.map((entry) => entry.id === item.id ? { ...entry, alt_text: e.target.value } : entry))} /></Field>
                  <Field label="Posição no carrossel"><input type="number" min={0} className={inputClass} value={item.position} onChange={(e) => setTestimonials(testimonials.map((entry) => entry.id === item.id ? { ...entry, position: Number(e.target.value) } : entry))} /></Field>
                  <label className="flex items-center gap-3 text-sm font-semibold text-primary"><input type="checkbox" checked={item.active} onChange={(e) => setTestimonials(testimonials.map((entry) => entry.id === item.id ? { ...entry, active: e.target.checked } : entry))} className="h-5 w-5" /> Mostrar no site</label>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  <button disabled={!item.image_url || saving === item.id} onClick={() => saveTestimonial(item)} className={buttonClass}><Save className="h-4 w-4" /> Salvar</button>
                  <button onClick={() => removeTestimonial(item)} className="inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold text-destructive"><Trash2 className="h-4 w-4" /> Remover</button>
                </div>
                <p className="mt-3 text-xs text-muted-foreground">Depoimento {index + 1}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {tab === "ebooks" && (
        <section className="mt-6">
          <div className="rounded-2xl bg-lilac-soft p-5 text-sm text-primary">
            Para vender, escolha <strong>Pago</strong>, informe o preço e cole o link de pagamento da Hotmart, Kiwify ou da plataforma que preferir. O botão Comprar agora abrirá esse link.
          </div>
          <button onClick={() => setEbooks([...ebooks, { id: `new-${Date.now()}`, title: "Novo e-book", description: "", cover_url: "", file_url: "", is_free: true, price_text: "", checkout_url: "", position: ebooks.length, visible: false, created_at: "" }])} className={`${buttonClass} mt-5`}><Plus className="h-4 w-4" /> Adicionar e-book</button>
          <div className="mt-5 grid gap-6">
            {ebooks.map((item) => (
              <article key={item.id} className="rounded-3xl border bg-card p-6">
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Nome do e-book"><input className={inputClass} value={item.title} onChange={(e) => setEbooks(ebooks.map((entry) => entry.id === item.id ? { ...entry, title: e.target.value } : entry))} /></Field>
                  <Field label="Como será oferecido?"><select className={inputClass} value={item.is_free ? "free" : "paid"} onChange={(e) => setEbooks(ebooks.map((entry) => entry.id === item.id ? { ...entry, is_free: e.target.value === "free" } : entry))}><option value="free">Grátis para baixar</option><option value="paid">Pago, com botão de compra</option></select></Field>
                  <Field label="Descrição"><textarea rows={4} className={inputClass} value={item.description} onChange={(e) => setEbooks(ebooks.map((entry) => entry.id === item.id ? { ...entry, description: e.target.value } : entry))} /></Field>
                  <div>
                    <span className="text-sm font-semibold text-primary">Capa</span>
                    <ImagePreview src={item.cover_url} alt={`Capa de ${item.title}`} />
                    <FileUpload label="Enviar capa" accept="image/jpeg,image/png,image/webp" onUploaded={(url) => setEbooks(ebooks.map((entry) => entry.id === item.id ? { ...entry, cover_url: url } : entry))} />
                  </div>
                  {item.is_free ? (
                    <div>
                      <span className="text-sm font-semibold text-primary">Arquivo para download</span>
                      <p className="mt-2 break-all text-xs text-muted-foreground">{item.file_url ? "PDF ou link cadastrado." : "Nenhum arquivo cadastrado."}</p>
                      <FileUpload label="Enviar PDF" accept="application/pdf" onUploaded={(url) => setEbooks(ebooks.map((entry) => entry.id === item.id ? { ...entry, file_url: url } : entry))} />
                    </div>
                  ) : (
                    <>
                      <Field label="Preço exibido"><input className={inputClass} placeholder="Ex.: R$ 29,90" value={item.price_text} onChange={(e) => setEbooks(ebooks.map((entry) => entry.id === item.id ? { ...entry, price_text: e.target.value } : entry))} /></Field>
                      <Field label="Link de pagamento" help="Cole o link completo da página de checkout."><input type="url" className={inputClass} placeholder="https://" value={item.checkout_url} onChange={(e) => setEbooks(ebooks.map((entry) => entry.id === item.id ? { ...entry, checkout_url: e.target.value } : entry))} /></Field>
                    </>
                  )}
                  <Field label="Posição"><input type="number" min={0} className={inputClass} value={item.position} onChange={(e) => setEbooks(ebooks.map((entry) => entry.id === item.id ? { ...entry, position: Number(e.target.value) } : entry))} /></Field>
                  <label className="flex items-center gap-3 text-sm font-semibold text-primary"><input type="checkbox" checked={item.visible} onChange={(e) => setEbooks(ebooks.map((entry) => entry.id === item.id ? { ...entry, visible: e.target.checked } : entry))} className="h-5 w-5" /> Mostrar no site</label>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  <button disabled={!item.cover_url || !item.title || saving === item.id} onClick={() => saveEbook(item)} className={buttonClass}><Save className="h-4 w-4" /> Salvar e-book</button>
                  <button onClick={() => removeEbook(item)} className="inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold text-destructive"><Trash2 className="h-4 w-4" /> Remover</button>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
