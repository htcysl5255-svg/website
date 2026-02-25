import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import NavbarClient from "./NavbarClient";

export default async function Navbar() {
    const supabase = await createClient();

    let pageData: any[] | null = null;
    let settings: any[] | null = null;

    if (supabase) {
        const { data: fetchPageData } = await supabase
            .from("pages")
            .select("title, slug, in_navbar")
            .order("order", { ascending: true });
        pageData = fetchPageData;

        const { data: fetchSettings } = await supabase.from("site_settings").select("*");
        settings = fetchSettings;
    }

    const getSetting = (key: string) => settings?.find(s => s.key === key)?.value;

    const brandName = getSetting('brand_name') || "Yöneylem Koçluk";
    const blogLabel = getSetting('nav_blog_label') || "Yazılarımız";
    const contactLabel = getSetting('nav_contact_label') || "İletişim";

    const showBlog = pageData?.find((p: any) => p.slug === 'blog')?.in_navbar ?? true;
    const showContact = pageData?.find((p: any) => p.slug === 'iletisim')?.in_navbar ?? true;

    const navItems = [
        ...(showBlog ? [{ title: blogLabel, slug: "blog" }] : []),
        ...(showContact ? [{ title: contactLabel, slug: "iletisim" }] : []),
    ];

    return (
        <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-emerald-500/10">
            {/* Colorful Vibrant Accent Line */}
            <div style={{ height: '3px', background: 'linear-gradient(to right, #059669, #3b82f6, #f43f5e, #f59e0b)' }} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">

                    {/* Brand */}
                    <Link href="/" className="flex items-center gap-3.5 group">
                        <div className="relative w-10 h-10 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-6">
                            <Image
                                src="/logo.png"
                                alt="Logo"
                                width={40}
                                height={40}
                                className="object-contain"
                            />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-emerald-950 font-display transition-colors group-hover:text-emerald-700">
                            {brandName}
                        </span>
                    </Link>

                    {/* Desktop nav */}
                    <div className="hidden md:flex items-center gap-2">
                        {navItems.map((item, idx) => {
                            const hoverColors = ['group-hover:text-emerald-600', 'group-hover:text-blue-600', 'group-hover:text-pink-600'];
                            const bgColors = ['group-hover:bg-emerald-50/80', 'group-hover:bg-blue-50/80', 'group-hover:bg-pink-50/80'];
                            return (
                                <Link
                                    key={item.slug}
                                    href={`/${item.slug}`}
                                    className="nav-link relative px-5 py-2.5 text-[15px] font-bold rounded-xl transition-all duration-300 text-slate-700 group flex items-center"
                                >
                                    <div className={`absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 ${bgColors[idx % 3]} group-hover:opacity-100 -z-10`} />
                                    <span className={`${hoverColors[idx % 3]} transition-colors`}>{item.title}</span>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Mobile hamburger */}
                    <NavbarClient navItems={navItems} />
                </div>
            </div>
        </nav>
    );
}
