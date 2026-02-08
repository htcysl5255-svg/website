import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import NavbarClient from "./NavbarClient";

export default async function Navbar() {
    const supabase = await createClient();

    const { data: pageData } = await supabase
        .from("pages")
        .select("title, slug, in_navbar")
        .order("order", { ascending: true });

    const { data: settings } = await supabase.from("site_settings").select("*");
    const getSetting = (key: string) => settings?.find(s => s.key === key)?.value;

    const brandName = getSetting('brand_name') || "Yöneylem Koçluk";
    const homeLabel = getSetting('nav_home_label') || "Anasayfa";
    const blogLabel = getSetting('nav_blog_label') || "Yazılarımız";
    const contactLabel = getSetting('nav_contact_label') || "İletişim";

    const dynamicPages = pageData?.filter((p: any) => p.in_navbar !== false && p.slug !== 'index' && p.slug !== 'iletisim' && p.slug !== 'blog') || [];

    const indexPage = pageData?.find((p: any) => p.slug === 'index');
    const showHome = indexPage ? indexPage.in_navbar : true;

    const blogPage = pageData?.find((p: any) => p.slug === 'blog');
    const showBlog = blogPage ? blogPage.in_navbar : true;

    const contactPage = pageData?.find((p: any) => p.slug === 'iletisim');
    const showContact = contactPage ? contactPage.in_navbar : true;

    const navItems = [
        ...(showHome ? [{ title: homeLabel, slug: "" }] : []),
        ...dynamicPages,
        ...(showBlog ? [{ title: blogLabel, slug: "blog" }] : []),
        ...(showContact ? [{ title: contactLabel, slug: "iletisim" }] : []),
    ];

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="flex items-center gap-3 group">
                            {/* Simplified Logo: No heavy gradient box, just the image */}
                            <div className="relative w-10 h-10">
                                <Image src="/logo.png" alt="Logo" width={40} height={40} className="object-contain" />
                            </div>
                            <span className="text-xl font-bold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors duration-300">
                                {brandName}
                            </span>
                        </Link>
                    </div>

                    <div className="hidden md:flex space-x-2 items-center">
                        {navItems.map((item) => (
                            <Link
                                key={item.slug}
                                href={`/${item.slug}`}
                                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50/50 rounded-xl transition-all duration-200"
                            >
                                {item.title}
                            </Link>
                        ))}
                    </div>

                    <NavbarClient navItems={navItems} />
                </div>
            </div>
        </nav>
    );
}
