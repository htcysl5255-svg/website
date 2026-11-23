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
 *      { type: "hero",     …, cta: true }   → adds the WhatsApp button
 *      { type: "features", title, items: [{ title, description }] }
 *      { type: "steps",    title, items: [{ title, meta, description }] }
 *      { type: "audience", title, items: [{ icon, title, slogan, description }] }
 *         icon is one of: "target", "compass", "hourglass", "handshake"
 *      { type: "credentials", stats: [{ value, label }], tags, linkLabel, href }
 *      { type: "certificates", title, items: [{ name, badge, org, date, file }] }
 *         file is the certificate image in /public/sertifikalar, e.g. "nlp.jpg"
 *      { type: "cta", text }   → a line of text + the WhatsApp button
 *      { type: "quote",    text, cite }
 *      { type: "contacts", items: [{ label, value, note, linkLabel, href }] }
 *      { type: "contacts", …, image, imageAlt }   → a photo beside the details
 *      { type: "text",     content: "<p>…</p>" }
 *
 *  IMAGES
 *    Put image files in /public and reference them as "/filename.png".
 */

/* ─── Types ────────────────────────────────────────────────── */

export type FeatureItem = {
    title: string;
    /** Small label next to the title, e.g. "1-2 seans". */
    meta?: string;
    description: string;
};

export type AudienceIcon = "target" | "compass" | "hourglass" | "handshake";

export type AudienceItem = {
    icon: AudienceIcon;
    title: string;
    slogan: string;
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

export type CertificateItem = {
    name: string;
    /** Small green label next to the name, e.g. "ICF Level 2". */
    badge?: string;
    org: string;
    date: string;
    /** Image in /public/sertifikalar. Adds a "Belgeyi gör" link. */
    file?: string;
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
        /** Show the "Ücretsiz tanışma görüşmesi" WhatsApp button. */
        cta?: boolean;
    }
    | { type: "features"; title?: string; items: FeatureItem[] }
    | { type: "audience"; title?: string; items: AudienceItem[] }
    | { type: "steps"; title?: string; items: FeatureItem[] }
    | { type: "quote"; text: string; cite?: string }
    | {
        type: "contacts";
        items: ContactItem[];
        /** Optional photo shown beside the details, e.g. "/ofis.webp". Portrait (3:4) works best. */
        image?: string;
        imageAlt?: string;
    }
    | { type: "text"; content: string }
    | {
        type: "credentials";
        stats: { value: string; label: string }[];
        tags: string[];
        linkLabel?: string;
        href?: string;
    }
    | { type: "certificates"; title?: string; items: CertificateItem[] }
    | { type: "cta"; text?: string };

export type Page = {
    slug: string;
    title: string;
    /** Text Google shows under the page title in search results. */
    description?: string;
    content: Block[];
};


/* ─── Global settings ──────────────────────────────────────── */

export const SITE = {
    brandName: "Yöneylem Koçluk",

    /** The live address of the site. Used for link previews and the sitemap. */
    url: "https://yoneylemkocluk.com",

    /** Browser tab + Google title of the home page. */
    title: "Yöneylem Koçluk | Ankara Çukurambar Öğrenci Koçu",
    description:
        "Ankara Çukurambar'da LGS ve YKS öğrencilerine, bölüm ve meslek seçimine, odaklanma güçlüğüne ve velilere yönelik birebir koçluk. Ücretsiz tanışma görüşmesi.",

    /** Image shown when a link to the site is shared (WhatsApp, Instagram…). 1200×630. */
    shareImage: "/og.png",

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
        /** WhatsApp number, digits only with country code (90…). */
        whatsapp: "905445539673",
        whatsappMessage:
            "Merhaba, ücretsiz tanışma görüşmesi hakkında bilgi almak istiyorum.",
    },

    cta: {
        label: "Ücretsiz tanışma görüşmesi",
    },

    certificates: {
        linkLabel: "Belgeyi gör",
    },

    footer: {
        text: "Profesyonel koçluk desteği ile potansiyelinizi keşfedin ve hedeflerinize ulaşın.",
        pagesTitle: "Hızlı Menü",
        contactTitle: "İletişim",
        location: "Çukurambar, Ankara",
    },
};

/** WhatsApp chat link with the greeting message already typed in. */
export const WHATSAPP_URL = `https://wa.me/${SITE.contact.whatsapp}?text=${encodeURIComponent(
    SITE.contact.whatsappMessage
)}`;

/** The WhatsApp number written for people: 905445539673 → 0544 553 96 73. */
export const WHATSAPP_DISPLAY = SITE.contact.whatsapp
    .replace(/^90/, "0")
    .replace(/^(\d{4})(\d{3})(\d{2})(\d{2})$/, "$1 $2 $3 $4");

/* ─── Home page ────────────────────────────────────────────── */

export const HOME_PAGE: Page = {
    slug: "index",
    title: "Anasayfa",
    content: [
        {
            type: "hero",
            eyebrow: "Hedefini belirle, harekete geç!",
            title: "Bugün atılan küçük adım, yarının büyük başarısıdır",
            subtitle:
                "20 yıllık öğretmenlik deneyimi ve ICF Level 2 akrediteli koçluk eğitimiyle, öğrencinizin yönünü bulmasına, harekete geçmesine ve dengesini korumasına eşlik ediyorum.",
            image: "/photo-placeholder.png",
            cta: true,
        },
        {
            type: "credentials",
            stats: [
                { value: "20+ yıl", label: "öğretmenlik ve idarecilik" },
                { value: "ICF Level 2", label: "akrediteli koçluk eğitimi" },
            ],
            tags: [
                "Koçlukta NLP",
                "Öğrenci ve Ebeveyn Koçluğu",
                "Kariyer Koçluğu",
                "Hikâyelerle Koçluk",
            ],
            linkLabel: "Tüm sertifikalar →",
            href: "/ben-kimim/#sertifikalar",
        },
        {
            type: "audience",
            title: "Kimler İçin?",
            items: [
                {
                    icon: "target",
                    title: "LGS ve YKS Öğrencileri",
                    slogan: "Hedefine planla ilerle",
                    description:
                        "Sınav sürecinde hedefini netleştirmek, planlı çalışmak ve motivasyonunu korumak isteyenler için.",
                },
                {
                    icon: "compass",
                    title: "Bölüm ve Meslek Seçimi",
                    slogan: "Yolunu netleştir",
                    description:
                        "“Ne istiyorum, hangi yol bana uygun?” sorusuna kendi cevabını bulmak isteyenler için.",
                },
                {
                    icon: "hourglass",
                    title: "Odaklanmakta Zorlananlar",
                    slogan: "Dikkatini topla, zamanını yönet",
                    description:
                        "Dikkati dağılan, ders başında zor toparlanan ve zamanını verimli kullanmak isteyenler için.",
                },
                {
                    icon: "handshake",
                    title: "Veli Koçluğu",
                    slogan: "Baskı değil, destek",
                    description:
                        "Çocuğunun sürecine nasıl destek olacağını bilmek, iletişimi güçlendirmek ve baskı yapmadan yanında olmak isteyen veliler için.",
                },
            ],
        },
        {
            type: "features",
            title: "Değerlerim",
            items: [
                {
                    title: "Profesyonellik",
                    description:
                        "ICF'nin etik ilkeleri ve standartlarıyla çalışıyoruz. Süreç boyunca güven ve gizlilik önceliğimiz.",
                },
                {
                    title: "İş Birliği",
                    description:
                        "Öğrenci, aile ve koç aynı tarafta. Sadece bir danışan değil, bir yol arkadaşı olarak başarısı için her an yanında oluyoruz.",
                },
                {
                    title: "İnsanlık",
                    description:
                        "Dürüst, şeffaf ve saygılı iletişimle, öğrencinin kendi değerini ve kararlarını önemseven bir koçluk sunuyoruz.",
                },
            ],
        },
        {
            type: "steps",
            title: "Birlikte nasıl çalışıyoruz",
            items: [
                {
                    title: "Hedefi Bul",
                    meta: "1-2 seans",
                    description:
                        "Ne istediğini, neden istediğini ve güçlü yanlarını keşfederiz. Hedefin netleşir.",
                },
                {
                    title: "Yola Çık",
                    meta: "2 seans",
                    description:
                        "Hedefini küçük adımlara böleriz. Sana uygun bir çalışma planı ve ilk küçük deneyler belirlenir.",
                },
                {
                    title: "Yolda Kal",
                    meta: "2-3 seans",
                    description:
                        "Odağını, motivasyonunu ve zamanını nasıl yöneteceğini birlikte çalışırız. Engeller çıktığında çözümü birlikte buluruz.",
                },
                {
                    title: "Rotanı Güncelle",
                    meta: "1 seans",
                    description:
                        "Nelerin işe yaradığına bakarız. Gerekirse planı yenileriz ya da yeni bir hedefe geçeriz.",
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
    description:
        "20 yılı aşkın öğretmenlik ve idarecilik deneyiminin ardından Ankara Çukurambar'da gençlere öğrenci koçu olarak eşlik eden Hatice'yi tanıyın.",
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
        {
            type: "certificates",
            title: "Eğitimler ve Sertifikalar",
            items: [
                {
                    name: "Gelişim Odaklı Profesyonel Koçluk – Temel Eğitim",
                    badge: "ICF Level 2",
                    org: "Focus Coaching Academy",
                    date: "Mayıs 2024",
                    file: "temel-egitim.jpg",
                },
                {
                    name: "Koçlukta NLP",
                    badge: "ICF Level 2",
                    org: "Focus Coaching Academy",
                    date: "Ekim 2024",
                    file: "nlp.jpg",
                },
                {
                    name: "Öğrenci ve Ebeveyn Koçluğu",
                    badge: "ICF Level 2",
                    org: "Focus Coaching Academy",
                    date: "Ekim 2024",
                    file: "ogrenci-ebeveyn.jpg",
                },
                {
                    name: "Kariyer Koçluğu ve İş Geliştirme",
                    badge: "ICF onaylı",
                    org: "Focus Coaching Academy",
                    date: "Mart 2025",
                    file: "kariyer-koclugu.jpg",
                },
                {
                    name: "Hikâyelerle Koçluk",
                    badge: "ICF onaylı",
                    org: "Focus Coaching Academy",
                    date: "Haziran 2025",
                    file: "hikayelerle-kocluk.jpg",
                },
            ],
        },
        {
            type: "cta",
            text: "Öğrencinizi tanımak için ücretsiz bir görüşmeyle başlayalım.",
        },
    ],
};

/* ─── İletişim ─────────────────────────────────────────────── */

export const CONTACT_PAGE: Page = {
    slug: "iletisim",
    title: "İletişim",
    description:
        "Yöneylem Koçluk Çukurambar, Çankaya / Ankara. Adres, WhatsApp ve Instagram üzerinden ücretsiz tanışma görüşmesi için ulaşın.",
    content: [
        {
            type: "hero",
            eyebrow: "Bize Ulaşın",
            title: "Çukurambar'dayız",
            subtitle:
                "Sorularınız, randevu talepleriniz veya koçluk süreci hakkında bilgi almak için bizimle iletişime geçebilirsiniz.",
            cta: true,
        },
        {
            type: "contacts",
            image: "/ofis.webp",
            imageAlt: "Çukurambar'daki ofisimiz: koltuklar, çalışma masası ve balkon kapısı",
            items: [
                {
                    label: "WhatsApp",
                    value: WHATSAPP_DISPLAY,
                    note: "Mesaj yazın, en kısa sürede dönelim.",
                    linkLabel: "WhatsApp'tan yaz",
                    href: WHATSAPP_URL,
                },
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
