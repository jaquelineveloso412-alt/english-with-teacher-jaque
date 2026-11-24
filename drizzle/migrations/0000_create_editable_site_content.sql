CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read their own roles" ON public.user_roles
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  );
$$;
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;

CREATE TABLE public.site_content (
  id text PRIMARY KEY DEFAULT 'main',
  hero_eyebrow text NOT NULL,
  hero_title text NOT NULL,
  hero_highlight text NOT NULL,
  hero_description text NOT NULL,
  home_photo_url text NOT NULL,
  about_photo_url text NOT NULL,
  about_heading text NOT NULL,
  about_paragraph_one text NOT NULL,
  about_paragraph_two text NOT NULL,
  mission_text text NOT NULL,
  methodology_text text NOT NULL,
  plan_name text NOT NULL,
  plan_tag text NOT NULL,
  plan_price text NOT NULL,
  plan_features text[] NOT NULL,
  whatsapp_url text NOT NULL,
  instagram_url text NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_content TO anon, authenticated;
GRANT UPDATE ON public.site_content TO authenticated;
GRANT ALL ON public.site_content TO service_role;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read site content" ON public.site_content
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins can update site content" ON public.site_content
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  alt_text text NOT NULL DEFAULT 'Depoimento de aluno',
  position integer NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.testimonials TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.testimonials TO authenticated;
GRANT ALL ON public.testimonials TO service_role;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read active testimonials" ON public.testimonials
  FOR SELECT TO anon USING (active = true);
CREATE POLICY "Admins can read all testimonials" ON public.testimonials
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert testimonials" ON public.testimonials
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update testimonials" ON public.testimonials
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete testimonials" ON public.testimonials
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.ebooks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  cover_url text NOT NULL,
  file_url text NOT NULL DEFAULT '',
  is_free boolean NOT NULL DEFAULT true,
  price_text text NOT NULL DEFAULT '',
  checkout_url text NOT NULL DEFAULT '',
  position integer NOT NULL DEFAULT 0,
  visible boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.ebooks TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.ebooks TO authenticated;
GRANT ALL ON public.ebooks TO service_role;
ALTER TABLE public.ebooks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read visible ebooks" ON public.ebooks
  FOR SELECT TO anon USING (visible = true);
CREATE POLICY "Admins can read all ebooks" ON public.ebooks
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert ebooks" ON public.ebooks
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update ebooks" ON public.ebooks
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete ebooks" ON public.ebooks
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can read content files" ON storage.objects
  FOR SELECT TO authenticated
  USING (bucket_id = 'conteudo' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can upload content files" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'conteudo' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update content files" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'conteudo' AND public.has_role(auth.uid(), 'admin'))
  WITH CHECK (bucket_id = 'conteudo' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete content files" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'conteudo' AND public.has_role(auth.uid(), 'admin'));

INSERT INTO public.site_content (
  id, hero_eyebrow, hero_title, hero_highlight, hero_description,
  home_photo_url, about_photo_url, about_heading, about_paragraph_one,
  about_paragraph_two, mission_text, methodology_text, plan_name, plan_tag,
  plan_price, plan_features, whatsapp_url, instagram_url
) VALUES (
  'main',
  'Inglês online para a vida real',
  'Destrave seu inglês',
  'com confiança.',
  'Aprenda em uma turma pequena, pratique toda semana e tenha suporte para usar o inglês em viagens, no trabalho e no dia a dia.',
  '/__l5e/assets-v1/c852ea25-6e44-4252-a174-a598268e8f51/jaque_inicio.jpg',
  '/__l5e/assets-v1/c50cd268-ae07-4855-89d7-7c62171f79b8/jaque_sobre.jpg',
  'Hi, I''m Jaque!',
  'Sou professora de inglês há mais de 5 anos, formada em Letras pela UEMG, com proficiência comprovada pelo TOEFL e pós-graduanda em Ensino de Língua Inglesa pela UFMG.',
  'Minha paixão está na comunicação — por isso minhas aulas são voltadas para você ganhar segurança para falar, desde os primeiros níveis. Também sou apaixonada por viagens e fui intercambista em Cambridge, no Reino Unido.',
  'Te ajudar a transformar o inglês em uma ferramenta para a sua vida — viajar, trabalhar, estudar ou se comunicar com mais confiança.',
  'As aulas priorizam prática de conversação, trabalhando speaking, listening, reading e writing, com foco especial em pronúncia e fala natural.',
  'Aulas em grupo',
  'Turmas com até 6 alunos',
  'R$ 280,00',
  ARRAY['Aulas ao vivo toda semana', 'Aulas gravadas', 'Plataforma de apoio', 'Turmas reduzidas de até 6 alunos', 'Material incluso', 'Situações reais: viagens, trabalho e dia a dia'],
  'https://wa.me/message/CO34TPM7J6K6H1',
  'https://www.instagram.com/teacherjaqueveloso'
);

INSERT INTO public.testimonials (image_url, alt_text, position, active) VALUES
  ('/__l5e/assets-v1/2b046f22-140f-4c82-986f-0fb167c33d3c/depoimento_bruna.jpg', 'Depoimento da aluna Bruna', 0, true),
  ('/__l5e/assets-v1/52d3b211-cb5f-4e86-af56-984591b7b64d/depoimento_bru.png', 'Depoimento da aluna Bru', 1, true),
  ('/__l5e/assets-v1/6b1ace5a-340e-46c7-98ce-240d267d48f3/depoimento_marina.png', 'Depoimento da aluna Marina', 2, true);

INSERT INTO public.ebooks (title, description, cover_url, file_url, is_free, price_text, checkout_url, position, visible) VALUES (
  'Inglês para Viajar Sem Travar',
  'Frases reais para aeroporto, imigração, hotel, restaurante, transporte, compras e emergências — além de checklist de viagem, erros comuns e vocabulário.',
  '/__l5e/assets-v1/1ba36bea-7f15-40a9-b88c-9e161f7ec72d/ebook_viagem_capa.jpg',
  '/__l5e/assets-v1/86ceffed-5f06-4ca1-ac22-9a0945919489/ingles-para-viajar-sem-travar.pdf',
  true, '', '', 0, true
);