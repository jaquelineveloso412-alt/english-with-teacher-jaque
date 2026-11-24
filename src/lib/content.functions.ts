import { createServerFn } from "@tanstack/react-start";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Database } from "@/integrations/supabase/types";
import type { PublicContent } from "@/lib/content";

function publicClient() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient<Database>(process.env["SUPABASE_URL"]!, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) {
          headers.delete("Authorization");
        }
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      },
    },
  });
}

async function resolveMedia(admin: SupabaseClient<Database>, value: string) {
  if (!value.startsWith("storage:")) return value;
  const { data, error } = await admin.storage.from("conteudo").createSignedUrl(value.slice(8), 3600);
  if (error || !data?.signedUrl) throw new Error("Não foi possível abrir um arquivo enviado.");
  return data.signedUrl;
}

async function resolveContent(
  admin: SupabaseClient<Database>,
  content: PublicContent,
): Promise<PublicContent> {
  return {
    settings: {
      ...content.settings,
      home_photo_url: await resolveMedia(admin, content.settings.home_photo_url),
      about_photo_url: await resolveMedia(admin, content.settings.about_photo_url),
    },
    testimonials: await Promise.all(
      content.testimonials.map(async (item) => ({
        ...item,
        image_url: await resolveMedia(admin, item.image_url),
      })),
    ),
    ebooks: await Promise.all(
      content.ebooks.map(async (item) => ({
        ...item,
        cover_url: await resolveMedia(admin, item.cover_url),
        file_url: await resolveMedia(admin, item.file_url),
      })),
    ),
  };
}

export const getPublicContent = createServerFn({ method: "GET" }).handler(async (): Promise<PublicContent> => {
  const supabase = publicClient();
  const [settingsResult, testimonialsResult, ebooksResult] = await Promise.all([
    supabase.from("site_content").select("*").eq("id", "main").single(),
    supabase.from("testimonials").select("*").eq("active", true).order("position"),
    supabase.from("ebooks").select("*").eq("visible", true).order("position"),
  ]);
  if (settingsResult.error) throw settingsResult.error;
  if (testimonialsResult.error) throw testimonialsResult.error;
  if (ebooksResult.error) throw ebooksResult.error;

  const content = {
    settings: settingsResult.data,
    testimonials: testimonialsResult.data,
    ebooks: ebooksResult.data,
  };
  const hasPrivateMedia = [
    content.settings.home_photo_url,
    content.settings.about_photo_url,
    ...content.testimonials.map((item) => item.image_url),
    ...content.ebooks.flatMap((item) => [item.cover_url, item.file_url]),
  ].some((url) => url.startsWith("storage:"));
  if (!hasPrivateMedia) return content;

  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return resolveContent(supabaseAdmin, content);
});

export const getAdminContent = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<PublicContent> => {
    const { data: isAdmin, error: roleError } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (roleError) throw roleError;
    if (!isAdmin) throw new Error("Este acesso ainda não foi liberado para edição.");

    const [settingsResult, testimonialsResult, ebooksResult] = await Promise.all([
      context.supabase.from("site_content").select("*").eq("id", "main").single(),
      context.supabase.from("testimonials").select("*").order("position"),
      context.supabase.from("ebooks").select("*").order("position"),
    ]);
    if (settingsResult.error) throw settingsResult.error;
    if (testimonialsResult.error) throw testimonialsResult.error;
    if (ebooksResult.error) throw ebooksResult.error;

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    return resolveContent(supabaseAdmin, {
      settings: settingsResult.data,
      testimonials: testimonialsResult.data,
      ebooks: ebooksResult.data,
    });
  });
