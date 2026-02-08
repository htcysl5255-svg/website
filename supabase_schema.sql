-- Blogs/Posts Table
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  published BOOLEAN DEFAULT false,
  author TEXT DEFAULT 'Admin',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Pages Table (for dynamic navbar and sections)
CREATE TABLE pages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content JSONB NOT NULL DEFAULT '[]',
  "order" INTEGER DEFAULT 0,
  in_navbar BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Profiles Table (for admin access)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  is_admin BOOLEAN DEFAULT false,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Public Read Profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Trigger to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, is_admin)
  VALUES (new.id, false);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Row Level Security (RLS) for Content
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;

-- Policies for Posts
CREATE POLICY "Public Read Posts" ON posts FOR SELECT USING (true);
CREATE POLICY "Admins can insert posts" ON posts FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
);
CREATE POLICY "Admins can update posts" ON posts FOR UPDATE USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
);
CREATE POLICY "Admins can delete posts" ON posts FOR DELETE USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
);

-- Policies for Pages
CREATE POLICY "Public Read Pages" ON pages FOR SELECT USING (true);
CREATE POLICY "Admins can insert pages" ON pages FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
);
CREATE POLICY "Admins can update pages" ON pages FOR UPDATE USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
);
CREATE POLICY "Admins can delete pages" ON pages FOR DELETE USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
);

-- Site Settings (Global texts)
CREATE TABLE site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Site Settings RLS
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Admins can manage settings" ON site_settings FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
);

-- Seed data for Home Page (using a reserved slug 'index')
INSERT INTO pages (title, slug, in_navbar, content, "order")
VALUES (
  'Anasayfa', 
  'index', 
  false, 
  '[
    {"type": "hero", "title": "Hayatınızı ve Kariyerinizi Yeniden Tanımlayın", "subtitle": "Profesyonel koçluk desteği ile engelleri aşın, hedeflerinize odaklanın ve gerçek potansiyelinizi ortaya çıkarın.", "cta1_text": "Hemen Başla", "cta1_link": "/iletisim", "cta2_text": "Daha Fazla Bilgi", "cta2_link": "/hakkimizda"},
    {"type": "features", "items": [
      {"title": "Uzmanlık", "description": "Yılların deneyimi ve uluslararası sertifikalı koçlarımızla size en iyi rehberliği sunuyoruz.", "color": "blue"},
      {"title": "Birlik", "description": "Sadece bir danışan değil, bir yol arkadaşı olarak görüyor; başarınız için her an yanınızda oluyoruz.", "color": "green"},
      {"title": "Sonuç Odaklı", "description": "Somut hedefler koyuyor ve bu hedeflere ulaşmanız için ölçülebilir stratejiler geliştiriyoruz.", "color": "pink"}
    ]}
  ]'::jsonb,
  -1
);

INSERT INTO site_settings (key, value) VALUES ('brand_name', 'yöneylem koçluk');
INSERT INTO site_settings (key, value) VALUES ('footer_text', 'Potansiyelinizi keşfetmeniz ve hedeflerinize ulaşmanız için profesyonel koçluk hizmetleri sunuyoruz.');
INSERT INTO site_settings (key, value) VALUES ('nav_home_label', 'Anasayfa');
INSERT INTO site_settings (key, value) VALUES ('nav_blog_label', 'Yazılarımız');
INSERT INTO site_settings (key, value) VALUES ('footer_quick_menu_title', 'Hızlı Menü');
INSERT INTO site_settings (key, value) VALUES ('footer_legal_title', 'Yasal');
INSERT INTO site_settings (key, value) VALUES ('blog_page_title', 'Blog & Yazılar');
INSERT INTO site_settings (key, value) VALUES ('blog_page_subtitle', 'Gelişim yolculuğunuzda size ilham verecek makaleler ve ipuçları.');
INSERT INTO site_settings (key, value) VALUES ('blog_read_more_label', 'Devamını Oku');
INSERT INTO site_settings (key, value) VALUES ('blog_back_label', 'Geri Dön');
INSERT INTO site_settings (key, value) VALUES ('nav_contact_label', 'İletişim');
INSERT INTO site_settings (key, value) VALUES ('footer_kvkk_label', 'KVKK Aydınlatma Metni');
INSERT INTO site_settings (key, value) VALUES ('footer_terms_label', 'Kullanım Koşulları');
INSERT INTO site_settings (key, value) VALUES ('site_title', 'yöneylem koçluk');
INSERT INTO site_settings (key, value) VALUES ('site_description', 'Bireysel ve kurumsal koçluk hizmetleri ile potansiyelinizi keşfedin.');