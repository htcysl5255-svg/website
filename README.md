# Yöneylem Koçluk

Yöneylem Koçluk'un tanıtım sitesi. Next.js ile yazılmış, **tamamen statik** bir site: veritabanı yok, sunucu tarafı kod yok, yönetim paneli yok.

---

## Yeni blog yazısı ekleme

Üç adım:

1. `posts/_template.md` dosyasını kopyalayın.
2. Kopyanın adını değiştirin — dosya adı yazının adresi olur.
   `sinav-kaygisi.md` → `yoneylemkocluk.com/blog/sinav-kaygisi`
3. En üstteki başlık ve tarihi güncelleyin, yazınızı yazın, kaydedin.

Dosyanın tamamı şuna benzer:

```markdown
---
title: "Sınav Kaygısıyla Başa Çıkmak"
date: 2026-08-09
image: "/sinav.jpg"
---

Buraya normal şekilde yazmaya başlayın. Yeni paragraf için
aralarına bir boş satır bırakın.

## Ara başlık böyle

Metni **kalın** veya *italik* yapabilirsiniz.

- Liste maddesi
- Başka bir madde

> Alıntı böyle görünür.
```

Başka hiçbir şey yapmanıza gerek yok — yazı otomatik olarak blog sayfasında, en yeniden en eskiye sıralanmış şekilde çıkar.

### Kapak görseli ekleme

1. Görsel dosyasını `public/` klasörünün içine kopyalayın (örn. `public/sinav.jpg`).
2. Yazının en üstündeki bölüme, dosya adını başında `/` ile ekleyin:

```markdown
image: "/sinav.jpg"
```

Görsel hem blog listesindeki kartta hem de yazının en üstünde çıkar. Kapak görseli istemiyorsanız `image:` satırını silin; kart o zaman sade bir arka planla görünür, bozulmaz.

Görseller olduğu gibi yayınlanır, bu yüzden yüklemeden önce boyutlarını makul tutun — genişliği 1600 pikselin altında ve dosya boyutu 300 KB civarında olan JPG dosyaları idealdir. Yatay (geniş) görseller kartlara daha iyi oturur.

### Diğer ayarlar

- **Taslak:** Başlık bölümüne `draft: true` satırı ekleyin; yazı sitede görünmez. Hazır olunca bu satırı silin.
- **Yazar:** Varsayılan olarak Hatice görünür. Değiştirmek için `author: "Başka İsim"` ekleyin.

> Adı `_` ile başlayan dosyalar (`_template.md` gibi) sitede hiç görünmez.

---

## Sayfaları ve menüleri düzenleme

Blog dışındaki **bütün metinler** tek bir dosyada:

```
src/lib/content.ts
```

Bu dosyayı açın, değiştirmek istediğiniz yazıyı bulun, kaydedin ve siteyi yeniden yayınlayın. Dosyanın başında kısa bir rehber var.

### Sayfa yapısı

Her sayfa bir blok listesidir. Üç blok tipi vardır:

| Tip | Alanlar |
| --- | --- |
| `hero` | `badge`, `title`, `subtitle` |
| `features` | `items: [{ title, description, color }]` |
| `text` | `content` (HTML) |

Geçerli `color` değerleri: `blue`, `green`, `pink`, `orange`, `emerald`, `purple`.

### Görseller

Görselleri `public/` klasörüne koyun, `"/dosya-adi.png"` şeklinde referans verin.

---

## Geliştirme

```bash
npm install
npm run dev          # http://localhost:3000
```

## Yayına alma

```bash
npm run build        # statik siteyi ./out klasörüne üretir
npm run preview      # üretilen siteyi yerelde test eder
```

`npm run build` komutu `out/` klasörüne düz HTML/CSS/JS üretir. Bu klasör olduğu gibi herhangi bir statik hostinge yüklenebilir — Vercel, Netlify, GitHub Pages, Cloudflare Pages veya normal bir paylaşımlı hosting.

Vercel veya Netlify'a GitHub deposu bağlanırsa, her `git push` sonrası site otomatik olarak yeniden yayınlanır.

---

## Teknik notlar

- **Next.js 16** (App Router), `output: "export"` ile statik dışa aktarım
- **Tailwind CSS v4**; zengin metin stilleri `globals.css` içindeki `.rich-text` sınıfında
- Yazı tipleri (Inter + Outfit) `globals.css` başında Google Fonts'tan yüklenir
- Çalışma zamanı bağımlılığı yok: veritabanı, ortam değişkeni (`.env`) veya API anahtarı gerekmez

### Sayfalar

| Adres | Kaynak |
| --- | --- |
| `/` | `src/app/page.tsx` + `HOME_PAGE` |
| `/ben-kimim` | `src/app/[slug]/page.tsx` + `ABOUT_PAGE` |
| `/iletisim` | `src/app/[slug]/page.tsx` + `CONTACT_PAGE` |
| `/blog` | `src/app/blog/page.tsx` + `posts/*.md` |
| `/blog/[slug]` | `src/app/blog/[slug]/page.tsx` + `posts/*.md` |

Markdown dosyaları `src/lib/posts.ts` tarafından derleme sırasında okunur ve HTML'e çevrilir; bu dosyayı düzenlemeniz gerekmez.
