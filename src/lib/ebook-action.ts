import type { Ebook } from "@/lib/content";

export type EbookAction = {
  href: string;
  label: string;
  download: boolean;
};

export function getEbookAction(ebook: Pick<Ebook, "is_free" | "file_url" | "checkout_url">, whatsappUrl: string): EbookAction {
  if (ebook.is_free) {
    return { href: ebook.file_url || whatsappUrl, label: "Baixar grátis", download: Boolean(ebook.file_url) };
  }
  if (ebook.checkout_url) {
    return { href: ebook.checkout_url, label: "Comprar agora", download: false };
  }
  return { href: whatsappUrl, label: "Quero comprar", download: false };
}
