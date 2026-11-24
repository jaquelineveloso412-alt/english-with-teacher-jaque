import { queryOptions } from "@tanstack/react-query";
import type { Database } from "@/integrations/supabase/types";
import { getPublicContent, getAdminContent } from "@/lib/content.functions";
import homePhoto from "@/assets/jaque_inicio.jpg.asset.json";
import aboutPhoto from "@/assets/jaque_sobre.jpg.asset.json";
import dep1 from "@/assets/depoimento_bruna.jpg.asset.json";
import dep2 from "@/assets/depoimento_bru.png.asset.json";
import dep3 from "@/assets/depoimento_marina.png.asset.json";
import ebookCover from "@/assets/ebook_viagem_capa.jpg.asset.json";
import ebookFile from "@/assets/ebook_viagens.pdf.asset.json";

export type SiteSettings = Database["public"]["Tables"]["site_content"]["Row"];
export type Testimonial = Database["public"]["Tables"]["testimonials"]["Row"];
export type Ebook = Database["public"]["Tables"]["ebooks"]["Row"];
export type PublicContent = {
  settings: SiteSettings;
  testimonials: Testimonial[];
  ebooks: Ebook[];
};

export const fallbackContent: PublicContent = {
  settings: {
    id: "main",
    hero_eyebrow: "Inglês online para a vida real",
    hero_title: "Destrave seu inglês",
    hero_highlight: "com confiança.",
    hero_description:
      "Aprenda em uma turma pequena, pratique toda semana e tenha suporte para usar o inglês em viagens, no trabalho e no dia a dia.",
    home_photo_url: homePhoto.url,
    about_photo_url: aboutPhoto.url,
    about_heading: "Hi, I'm Jaque!",
    about_paragraph_one:
      "Sou professora de inglês há mais de 5 anos, formada em Letras pela UEMG, com proficiência comprovada pelo TOEFL e pós-graduanda em Ensino de Língua Inglesa pela UFMG.",
    about_paragraph_two:
      "Minha paixão está na comunicação — por isso minhas aulas são voltadas para você ganhar segurança para falar, desde os primeiros níveis. Também sou apaixonada por viagens e fui intercambista em Cambridge, no Reino Unido.",
    mission_text:
      "Te ajudar a transformar o inglês em uma ferramenta para a sua vida — viajar, trabalhar, estudar ou se comunicar com mais confiança.",
    methodology_text:
      "As aulas priorizam prática de conversação, trabalhando speaking, listening, reading e writing, com foco especial em pronúncia e fala natural.",
    plan_name: "Aulas em grupo",
    plan_tag: "Turmas com até 6 alunos",
    plan_price: "R$ 280,00",
    plan_features: [
      "Aulas ao vivo toda semana",
      "Aulas gravadas",
      "Plataforma de apoio",
      "Turmas reduzidas de até 6 alunos",
      "Material incluso",
      "Situações reais: viagens, trabalho e dia a dia",
    ],
    whatsapp_url: "https://wa.me/message/CO34TPM7J6K6H1",
    instagram_url: "https://www.instagram.com/teacherjaqueveloso",
    updated_at: "",
  },
  testimonials: [
    { id: "bruna", image_url: dep1.url, alt_text: "Depoimento da aluna Bruna", position: 0, active: true, created_at: "" },
    { id: "bru", image_url: dep2.url, alt_text: "Depoimento da aluna Bru", position: 1, active: true, created_at: "" },
    { id: "marina", image_url: dep3.url, alt_text: "Depoimento da aluna Marina", position: 2, active: true, created_at: "" },
  ],
  ebooks: [
    {
      id: "viagem",
      title: "Inglês para Viajar Sem Travar",
      description:
        "Frases reais para aeroporto, imigração, hotel, restaurante, transporte, compras e emergências — além de checklist de viagem, erros comuns e vocabulário.",
      cover_url: ebookCover.url,
      file_url: ebookFile.url,
      is_free: true,
      price_text: "",
      checkout_url: "",
      position: 0,
      visible: true,
      created_at: "",
    },
  ],
};

export const contentQueryOptions = queryOptions({
  queryKey: ["site-content"],
  queryFn: () => getPublicContent(),
  staleTime: 30 * 60 * 1000,
});

export const adminContentQueryOptions = queryOptions({
  queryKey: ["admin-content"],
  queryFn: () => getAdminContent(),
  staleTime: 0,
  retry: false,
  refetchOnWindowFocus: false,
});
