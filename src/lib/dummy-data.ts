/**
 * Dummy data used when Supabase environment variables are not set.
 * Replace this content via the admin panel once Supabase is configured.
 */

export const DUMMY_INDEX_PAGE = {
    slug: "index",
    content: [
        {
            type: "hero",
            badge: "Hedefini Belirle, Harekete Geç",
            title: "Hayatınızı ve Kariyerinizi Yeniden Tanımlayın",
            subtitle:
                "Profesyonel koçluk desteği ile engelleri aşın, hedeflerinize odaklanın ve gerçek potansiyelinizi ortaya çıkarın.",
        },
        {
            type: "features",
            title: "",
            subtitle: "",
            items: [
                {
                    title: "Profesyonellik",
                    description:
                        "ICF temel değerleri ve etik ilkeleri ile tutarlı davranış standartları ile sizleri destekliyoruz.",
                    color: "purple",
                },
                {
                    title: "İş Birliği",
                    description:
                        "Sadece bir danışan değil, bir yol arkadaşı olarak görüyor; başarınız için her an yanınızda oluyoruz.",
                    color: "green",
                },
                {
                    title: "İnsanlık",
                    description:
                        "Dürüst, şeffaf ve net iletişimle kapsayıcı, saygılı, öz-değer ve insan haklarına bağlı bir koçlukla gelişiminize katkı sunuyoruz.",
                    color: "orange",
                },
            ],
        },
    ],
};

export const DUMMY_CONTACT_PAGE = {
    slug: "iletisim",
    content: [
        {
            type: "hero",
            badge: "Bize Ulaşın",
            title: "ÇUKURAMBAR'DAYIZ",
            subtitle: "Sorularınız, randevu talepleriniz veya koçluk süreci hakkında bilgi almak için bizimle iletişime geçebilirsiniz.",
        },
        {
            type: "features",
            title: "",
            subtitle: "",
            items: [
                {
                    title: "ADRES",
                    description: "Kızılırmak mahallesi 1443. sk. No:31/1",
                    color: "blue",
                },
                {
                    title: "INSTAGRAM",
                    description: "yoneylemkocu",
                    color: "pink",
                },
            ],
        },
    ],
};

export const DUMMY_POSTS = [
    {
        id: "1",
        slug: "kisisel-gelisimde-ilk-adim",
        title: "Kişisel Gelişimde İlk Adım: Kendinizi Tanıyın",
        content: `<p>Kişisel gelişim yolculuğu, her şeyden önce kendinizi tanımakla başlar. Güçlü yönlerinizi, zayıf yönlerinizi ve değerlerinizi keşfetmek, doğru hedefler koymanızı sağlar.</p>
<h2>Güçlü Yönlerinizi Keşfedin</h2>
<p>Güçlü yönlerinizi bulmak için geçmişteki başarılarınıza bakın. Kolaylıkla yaptığınız şeyler genellikle doğal yeteneklerinizi yansıtır.</p>
<h2>Hedef Belirleme</h2>
<p>SMART hedefler koyun: Spesifik, Ölçülebilir, Ulaşılabilir, İlgili ve Zamanlı. Bu çerçeve, hedeflerinizi somutlaştırmanıza yardımcı olur.</p>
<p>Unutmayın, büyük değişimler küçük adımlarla başlar. Her gün biraz daha iyi olmak, zamanla büyük dönüşümlere yol açar.</p>`,
        image_url: "/placeholder_1.png",
        published: true,
        author: "Admin",
        created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: "2",
        slug: "kariyer-degisimi-nasil-yapilir",
        title: "Kariyer Değişimi: Doğru Zamanı Nasıl Anlarsınız?",
        content: `<p>Kariyer değişimi düşünüyor musunuz? Bu büyük adımı atmadan önce bazı önemli soruları kendinize sormanız gerekir.</p>
<h2>İşaretleri Tanıyın</h2>
<p>Motivasyon eksikliği, her sabah işe gitmek istememe ve yaptığınız işten anlam çıkaramama, değişim için işaretler olabilir.</p>
<h2>Hazırlık Süreci</h2>
<p>Kariyer değişimi için finansal hazırlık yapın, yeni alanınızda network oluşturun ve gerekli becerileri kazanın.</p>`,
        image_url: "/placeholder_1.png",
        published: true,
        author: "Admin",
        created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: "3",
        slug: "is-yasam-dengesi",
        title: "İş-Yaşam Dengesi Kurmanın 5 Pratik Yolu",
        content: `<p>Modern iş dünyasında iş-yaşam dengesi giderek daha zor hale gelmektedir. Ancak küçük değişiklikler büyük farklar yaratabilir.</p>
<h2>Sınırlar Belirleyin</h2>
<p>İş saatlerinize net sınırlar koyun. Mesai saatleri bittiğinde e-postaları kontrol etmeyi bırakın.</p>
<h2>Önceliklendirin</h2>
<p>Her gün en önemli 3 görevi belirleyin ve önce onları tamamlayın. Bu, odak ve verimlilik sağlar.</p>
<h2>Kendinize Zaman Ayırın</h2>
<p>Hobiler, egzersiz ve sevdiklerinizle geçirilen zaman, ruh sağlığınız için vazgeçilmezdir.</p>`,
        image_url: "/placeholder_1.png",
        published: true,
        author: "Admin",
        created_at: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
    },
];

export const DUMMY_SITE_SETTINGS = [
    { key: "blog_page_title", value: "Blog & Yazılar" },
    { key: "blog_page_subtitle", value: "Gelişim yolculuğunuzda size ilham verecek makaleler ve ipuçları." },
    { key: "blog_read_more_label", value: "Devamını Oku" },
    { key: "blog_back_label", value: "Geri Dön" },
    { key: "contact_address", value: "Kızılırmak mahallesi 1443. sk. No:31/1" },
    { key: "contact_instagram", value: "yoneylemkocu" },
    { key: "footer_text", value: "Profesyonel koçluk desteği ile potansiyelinizi keşfedin ve hedeflerinize ulaşın." },
];

/** Returns true when Supabase env vars are not configured. */
export function isSupabaseMissing(): boolean {
    return (
        !process.env.NEXT_PUBLIC_SUPABASE_URL ||
        !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
        process.env.NEXT_PUBLIC_SUPABASE_URL === "" ||
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY === ""
    );
}
