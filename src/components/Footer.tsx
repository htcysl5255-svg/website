import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { Instagram, MapPin, Phone, ArrowUpRight } from "lucide-react";

import { DUMMY_SITE_SETTINGS } from "@/lib/dummy-data";

export default async function Footer() {
    let settings = DUMMY_SITE_SETTINGS;

    const supabase = await createClient();
    if (supabase) {
        const { data } = await supabase.from("site_settings").select("*");
        if (data) settings = data;
    }

    const getSetting = (key: string) => settings?.find(s => s.key === key)?.value || "";

    const brandName = getSetting('brand_name') || "Yöneylem Koçluk";
    const footerText = getSetting('footer_text');
    const homeLabel = getSetting('nav_home_label') || "Anasayfa";
    const blogLabel = getSetting('nav_blog_label') || "Yazılarımız";
    const quickMenuTitle = getSetting('footer_quick_menu_title') || "Hızlı Menü";
    const contactLabel = getSetting('nav_contact_label') || "İletişim";

    // Hardcode contact details as requested to be always static
    const address = "Kızılırmak mahallesi 1443. sk. No:31/1 Kat: 3 Daire: 17 1071 Ankara Plaza, 06510 Çankaya/Ankara";
    const phone = "0539 217 62 14";
    const instagram = "@yoneyiem_kocluk";

    return (
        <footer className="bg-slate-50/50 border-t border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24">

                    {/* Brand column */}
                    <div className="md:col-span-5 space-y-8">
                        <Link href="/" className="inline-flex items-center gap-4 group">
                            <div className="relative w-10 h-10 transition-transform duration-300 group-hover:scale-105">
                                <Image
                                    src="/logo.png"
                                    alt="Logo"
                                    width={40}
                                    height={40}
                                    className="object-contain"
                                />
                            </div>
                            <span className="text-xl font-bold text-emerald-950 font-display tracking-tight">
                                {brandName}
                            </span>
                        </Link>

                        {footerText && (
                            <p className="text-slate-500 leading-relaxed text-[15px] max-w-sm font-sans font-medium">
                                {footerText}
                            </p>
                        )}
                    </div>

                    {/* Quick menu */}
                    <div className="md:col-span-3">
                        <h4 className="text-emerald-900 font-bold mb-8 text-[13px] uppercase tracking-widest font-sans">
                            {quickMenuTitle}
                        </h4>
                        <ul className="space-y-4">
                            {[
                                { label: homeLabel, href: '/' },
                                { label: blogLabel, href: '/blog' },
                                { label: contactLabel, href: '/iletisim' },
                            ].map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href}
                                        className="flex items-center gap-2 text-[15px] font-semibold text-slate-500 hover:text-emerald-700 transition-colors group">
                                        <div className="w-1 h-1 rounded-full bg-slate-200 group-hover:bg-emerald-500 transition-colors" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Mini Contact Section */}
                    <div className="md:col-span-4">
                        <h4 className="text-emerald-900 font-bold mb-8 text-[13px] uppercase tracking-widest font-sans">
                            {contactLabel}
                        </h4>
                        <ul className="space-y-6">
                            {address && (
                                <li className="flex items-start gap-4 text-[15px] font-semibold text-slate-500">
                                    <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                                        target="_blank" rel="noopener noreferrer"
                                        className="flex items-start gap-4 hover:text-emerald-700 transition-colors group/link">
                                        <div className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center flex-shrink-0 text-emerald-600 shadow-sm group-hover/link:border-emerald-100">
                                            <MapPin size={16} />
                                        </div>
                                        <span className="mt-1 leading-relaxed">{address}</span>
                                    </a>
                                </li>
                            )}
                            {phone && (
                                <li>
                                    <a href={`tel:${phone.replace(/\s/g, '')}`}
                                        className="flex items-center gap-4 text-[15px] font-semibold text-slate-500 hover:text-emerald-700 transition-colors group">
                                        <div className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center flex-shrink-0 text-emerald-600 shadow-sm transition-colors group-hover:border-emerald-100">
                                            <Phone size={16} />
                                        </div>
                                        <span>{phone}</span>
                                    </a>
                                </li>
                            )}
                            {instagram && (
                                <li>
                                    <a href={`https://instagram.com/${instagram.replace('@', '')}`}
                                        target="_blank" rel="noopener noreferrer"
                                        className="flex items-center gap-4 text-[15px] font-semibold text-slate-500 hover:text-emerald-700 transition-colors group">
                                        <div className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center flex-shrink-0 text-emerald-600 shadow-sm transition-colors group-hover:border-emerald-100">
                                            <Instagram size={16} />
                                        </div>
                                        <span>{instagram}</span>
                                    </a>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>

                {/* Bottom row */}
                <div className="mt-24 pt-10 flex flex-col sm:flex-row justify-between items-center gap-6 border-t border-slate-100">
                    <p className="text-[12px] font-medium text-slate-400">
                        © {new Date().getFullYear()} {brandName} · Tüm hakları saklıdır.
                    </p>
                    <div className="flex items-center gap-8">
                        <span className="text-[12px] font-medium text-slate-400">
                            Profesyonel Koçluk Hizmetleri
                        </span>
                        <div className="w-1 h-1 rounded-full bg-slate-200" />
                        <span className="text-[12px] font-medium text-slate-400">
                            Çukurambar, Ankara
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
