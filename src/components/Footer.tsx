import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

export default async function Footer() {
    const supabase = await createClient();
    const { data: settings } = await supabase.from("site_settings").select("*");
    const getSetting = (key: string) => settings?.find(s => s.key === key)?.value || "";

    const brandName = getSetting('brand_name') || "";
    const footerText = getSetting('footer_text') || "";
    const homeLabel = getSetting('nav_home_label') || "Anasayfa";
    const blogLabel = getSetting('nav_blog_label') || "Yazılarımız";
    const quickMenuTitle = getSetting('footer_quick_menu_title') || "Hızlı Menü";
    const legalTitle = getSetting('footer_legal_title') || "Yasal";
    const contactLabel = getSetting('nav_contact_label') || "İletişim";
    const kvkkLabel = getSetting('footer_kvkk_label') || "KVKK";
    const termsLabel = getSetting('footer_terms_label') || "Kullanım Koşulları";

    return (
        <footer className="bg-white border-t border-slate-100 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
                    <div className="col-span-1 md:col-span-2 space-y-6">
                        <Link href="/" className="flex items-center justify-center md:justify-start gap-3">
                            <div className="relative w-10 h-10">
                                <Image src="/logo.png" alt="Logo" width={40} height={40} className="object-contain" />
                            </div>
                            <span className="text-2xl font-black tracking-tight text-slate-900">{brandName}</span>
                        </Link>
                        {footerText && (
                            <p className="text-slate-500 max-w-sm mx-auto md:mx-0 leading-relaxed font-medium">
                                {footerText}
                            </p>
                        )}
                    </div>

                    <div>
                        <h4 className="text-slate-900 font-bold mb-6 text-lg">{quickMenuTitle}</h4>
                        <ul className="space-y-3">
                            <li><Link href="/" className="text-slate-500 hover:text-blue-600 transition-colors font-medium">{homeLabel}</Link></li>
                            <li><Link href="/blog" className="text-slate-500 hover:text-pink-600 transition-colors font-medium">{blogLabel}</Link></li>
                            <li><Link href="/iletisim" className="text-slate-500 hover:text-green-600 transition-colors font-medium">{contactLabel}</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-slate-900 font-bold mb-6 text-lg">{legalTitle}</h4>
                        <ul className="space-y-3">
                            <li><Link href="#" className="text-slate-500 hover:text-blue-600 transition-colors font-medium">{kvkkLabel}</Link></li>
                            <li><Link href="#" className="text-slate-500 hover:text-pink-600 transition-colors font-medium">{termsLabel}</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center text-sm font-medium text-slate-400">
                    <p>© {new Date().getFullYear()} {brandName}</p>

                </div>
            </div>
        </footer>
    );
}
