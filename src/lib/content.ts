/**
 * ─────────────────────────────────────────────────────────────
 *  SITE CONTENT — edit this file to change the website
 * ─────────────────────────────────────────────────────────────
 *
 *  This file holds the pages, menus and labels. There is no database
 *  and no admin panel: change the text below, save, commit, redeploy.
 *
 *  BLOG POSTS ARE NOT IN THIS FILE.
 *    They live in the /posts folder, one Markdown file per post.
 *    To add one, copy posts/_template.md and rename it.
 *
 *  HOW TO EDIT A PAGE
 *    Each page is a list of blocks, rendered top to bottom:
 *      { type: "hero",     eyebrow, title, subtitle, image }
 *      { type: "features", items: [{ title, description }] }
 *      { type: "steps",    title, items: [{ title, description }] }
 *      { type: "quote",    text, cite }
 *      { type: "contacts", items: [{ label, value, note, linkLabel, href }] }
 *      { type: "text",     content: "<p>…</p>" }
 *
 *  IMAGES
 *    Put image files in /public and reference them as "/filename.png".
 */

/* ─── Types ────────────────────────────────────────────────── */

export type FeatureItem = {
    title: string;
    description: string;
};

export type ContactItem = {
    /** Small uppercase label above the value, e.g. "Adres". */
    label: string;
    value: string;
    note?: string;
    linkLabel?: string;
    href?: string;
};

export type Block =
    | {
        type: "hero";
        eyebrow?: string;
        title: string;
        subtitle?: string;
        image?: string;
        /** "large" is the big circular portrait, "small" a 200px avatar. */
        imageSize?: "large" | "small";
    }
    | { type: "features"; items: FeatureItem[] }
    | { type: "steps"; title?: string; items: FeatureItem[] }
    | { type: "quote"; text: string; cite?: string }
    | { type: "contacts"; items: ContactItem[] }
    | { type: "text"; content: string };

export type Page = {
    slug: string;
    title: string;
    content: Block[];
};


/* ─── Global settings ──────────────────────────────────────── */

export const SITE = {
    brandName: "Yöneylem Koçluk",
    title: "Yöneylem Koçluk",
    description:
        "Bireysel ve kurumsal koçluk hizmetleri ile potansiyelinizi keşfedin.",

    /** Shown as the author of blog posts that don't name one. */
    author: "Hatice",

    nav: {
        home: "Anasayfa",
        about: "Ben Kimim?",
        blog: "Yazılarımız",
        contact: "İletişim",
    },

    blog: {
        eyebrow: "Güncel Yazılar",
        pageTitle: "Blog & Yazılar",
        pageSubtitle:
            "Gelişim yolculuğunuzda size ilham verecek makaleler ve ipuçları.",
        backLabel: "Geri Dön",
        emptyTitle: "Henüz yazı yok",
        emptyText: "Yakında yeni içerikler eklenecek.",
    },

    contact: {
        address: "Kızılırmak mahallesi 1443. sk. No:31/1",
        city: "Çankaya / Ankara",
        instagram: "@yoneylemkocluk",
    },

    footer: {
        text: "Profesyonel koçluk desteği ile potansiyelinizi keşfedin ve hedeflerinize ulaşın.",
        pagesTitle: "Hızlı Menü",
        contactTitle: "İletişim",
        location: "Çukurambar, Ankara",
    },
};

/* ─── Home page ────────────────────────────────────────────── */

export const HOME_PAGE: Page = {
    slug: "index",
    title: "Anasayfa",
    content: [
        {
            type: "hero",
            eyebrow: "Hedefini Belirle, Harekete Geç",
            title: "Hayatınızı ve Kariyerinizi Yeniden Tanımlayın",
            subtitle:
                "Profesyonel koçluk desteği ile engelleri aşın, hedeflerinize odaklanın ve gerçek potansiyelinizi ortaya çıkarın.",
            image: "/photo-placeholder.png",
        },
        {
            type: "features",
            items: [
                {
                    title: "Profesyonellik",
                    description:
                        "ICF temel değerleri ve etik ilkeleri ile tutarlı davranış standartları ile sizleri destekliyoruz.",
                },
                {
                    title: "İş Birliği",
                    description:
                        "Sadece bir danışan değil, bir yol arkadaşı olarak görüyor; başarınız için her an yanınızda oluyoruz.",
                },
                {
                    title: "İnsanlık",
                    description:
                        "Dürüst, şeffaf ve net iletişimle kapsayıcı, saygılı, öz-değer ve insan haklarına bağlı bir koçlukla gelişiminize katkı sunuyoruz.",
                },
            ],
        },
        {
            type: "steps",
            title: "Birlikte nasıl çalışıyoruz",
            items: [
                {
                    title: "Hedefini bul",
                    description:
                        "İlgi alanlarını ve güçlü yönlerini keşfederek sana gerçekten uygun hedefleri birlikte belirliyoruz.",
                },
                {
                    title: "Yola çık",
                    description:
                        "Hedefini belirledikten sonra, sana uygun bir yol haritası oluşturuyoruz. Ertelemeden, planlı şekilde ilerle.",
                },
                {
                    title: "Yolda kal",
                    description:
                        "Yolda karşılaşacağın zorlanmalarda motivasyonunu canlı tutman ve istikrarlı ilerlemen için yanında oluyorum.",
                },
                {
                    title: "Yönünü güncelle",
                    description:
                        "Süreç içinde değişen koşullara göre hedeflerini revize eder, yolunu yeniden netleştiririz.",
                },
            ],
        },
        {
            type: "quote",
            text: "“Açılmamış kanatların genişliğini bilemezsiniz.”",
            cite: "André Gide",
        },
    ],
};

/* ─── Ben Kimim? ───────────────────────────────────────────── */

export const ABOUT_PAGE: Page = {
    slug: "ben-kimim",
    title: "Ben Kimim?",
    content: [
        {
            type: "hero",
            eyebrow: "Ben Kimim?",
            title: "Merhaba, ben Hatice",
            subtitle:
                "20 yılı aşkın öğretmenlik ve idarecilik tecrübesinin ardından, gençlere koç olarak eşlik ediyorum.",
            image: "/photo-placeholder.png",
            imageSize: "small",
        },
        {
            type: "text",
            content: `
<p>Yaklaşık 20 yılı aşkın süre eğitim sektöründe öğretmen ve idareci olarak çalıştım. Bu sektöre girerken eğitime ve insana duyduğum sevgi ve inanç beni motive etti.</p>

<p>Bununla birlikte zaman içerisinde eğitim sektöründe gördüğüm, öğrencilerin geleceklerini şekillendirecek zorlu sınav süreçlerinin olması, bu noktada mevcut sistemin yetersiz kalması ve öğrenci profilinin de gelişen teknoloji ile birlikte değişmesi (odak ve dikkat problemleri ve benzeri gibi) beni öğrencilere farklı bir şekilde destek olmak gerektiği düşüncesine sevk etti.</p>

<p>Bu arayışla yolum koçluk eğitimleri ile kesişti. NLP, Mindfulness, Kariyer ve Meslek Seçimi, Öğrenci ve Ebeveyn Koçluğu, P4C derken eğitimlerin getirdiği farkındalıkla gençlere yeni faydalı olma teknikleri geliştirdim.</p>

<blockquote>“Her insan keşfedilmemiş bir potansiyeldir.”</blockquote>

<p>İnsana dair, insanlığa dair her şeyin kıymetini bilmekle faydalı olmaya, üretmeye ve toplumsal katkıya devam edebilmek adına <strong>Yöneylem Koçluk</strong>'u kurdum. Bu şekilde daha önce öğretmen olarak sunduğum katkıyı şimdi koç olarak sunuyorum.</p>

<p>Tecrübelerimi yeni nesil ihtiyaçlarla geliştirerek; bağ kurucu, anlayışlı, kişiye özel, farkındalıklı, prensipli ve geliştirici bir yaklaşımla gençlerin kendi yönlerini bulmalarına, bu noktada eylem adımlarına geçecekleri anlamlı bir yol haritası oluşturmalarına ve bu süreci dengeyle götürebilmelerine eşlik ediyorum.</p>

<p>Yürekten inanıyorum ki; desteklenen, yüreklendirilen, potansiyeli keşfettirilen ve inanılan değerleri ile buluşturulan her çocuk, hayatında gerçekleştirmek istediklerine emin adımlarla ilerleyecektir.</p>

<p>Ben de bu yolda destek olmak niyetiyle, potansiyel keşfiyle yol haritanızı çizmeniz için buradayım ve sizleri bekliyorum.</p>

<p class="signature">Sevgiyle kalın…</p>
`,
        },
    ],
};

/* ─── İletişim ─────────────────────────────────────────────── */

export const CONTACT_PAGE: Page = {
    slug: "iletisim",
    title: "İletişim",
    content: [
        {
            type: "hero",
            eyebrow: "Bize Ulaşın",
            title: "Çukurambar'dayız",
            subtitle:
                "Sorularınız, randevu talepleriniz veya koçluk süreci hakkında bilgi almak için bizimle iletişime geçebilirsiniz.",
        },
        {
            type: "contacts",
            items: [
                {
                    label: "Adres",
                    value: "Kızılırmak mahallesi 1443. sk. No:31/1",
                    note: "Çankaya / Ankara",
                    linkLabel: "Haritada aç",
                    href:
                        "https://www.google.com/maps/search/?api=1&query=" +
                        encodeURIComponent(
                            "Kızılırmak mahallesi 1443. sk. No:31/1 Çankaya Ankara"
                        ),
                },
                {
                    label: "Instagram",
                    value: "@yoneylemkocluk",
                    linkLabel: "Profili aç",
                    href: "https://www.instagram.com/yoneylemkocluk/",
                },
            ],
        },
    ],
};

/**
 * Every page reachable at /<slug>. The home page is rendered
 * separately at "/", so it is not listed here.
 */
export const PAGES: Page[] = [ABOUT_PAGE, CONTACT_PAGE];

/** Pages shown in the navbar, in order. */
export const NAV_ITEMS = [
    { title: SITE.nav.about, slug: "ben-kimim" },
    { title: SITE.nav.blog, slug: "blog" },
    { title: SITE.nav.contact, slug: "iletisim" },
];
