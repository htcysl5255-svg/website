import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Star, Instagram, MapPin, Phone } from "lucide-react";
import { DUMMY_ABOUT_PAGE, DUMMY_CONTACT_PAGE } from "@/lib/dummy-data";

const ICON_MAP: Record<string, React.ReactNode> = {
    "ADRES": <MapPin size={26} />,
    "TELEFON": <Phone size={26} />,
    "INSTAGRAM": <Instagram size={26} />,
    "default": <Star size={26} />,
};

const ICON_STYLES: Record<string, { shadow: string; dot: string; text: string }> = {
    blue: { shadow: 'rgba(59,130,246,0.15)', dot: 'bg-blue-500', text: 'text-blue-500' },
    green: { shadow: 'rgba(16,185,129,0.2)', dot: 'bg-emerald-500', text: 'text-emerald-500' },
    pink: { shadow: 'rgba(244,63,94,0.15)', dot: 'bg-pink-500', text: 'text-pink-500' },
    orange: { shadow: 'rgba(245,158,11,0.15)', dot: 'bg-orange-500', text: 'text-orange-500' },
    emerald: { shadow: 'rgba(16,185,129,0.2)', dot: 'bg-emerald-500', text: 'text-emerald-500' },
};

export default async function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    let page: any = null;

    // Force Iletisim to be static
    if (slug === 'iletisim') {
        page = DUMMY_CONTACT_PAGE;
    }

    if (!page) {
        const supabase = await createClient();
        if (supabase) {
            const { data } = await supabase
                .from("pages")
                .select("*")
                .eq("slug", slug)
                .single();
            page = data;
        }
    }

    if (!page && slug === 'hakkimda') {
        page = DUMMY_ABOUT_PAGE;
    }

    if (!page) {
        notFound();
    }

    const blocks = Array.isArray(page.content) ? page.content : [];

    return (
        <div className="min-h-screen bg-transparent">
            {blocks.map((block: any, idx: number) => {

                /* ─── TEXT ─────────────────────────────────── */
                if (block.type === 'text') {
                    return (
                        <section key={idx} className="py-24 px-4 bg-white/60 backdrop-blur-sm">
                            <div className="max-w-3xl mx-auto prose prose-lg prose-emerald font-sans leading-relaxed text-emerald-950/70"
                                dangerouslySetInnerHTML={{ __html: block.content }} />
                        </section>
                    );
                }

                /* ─── HERO ─────────────────────────────────── */
                if (block.type === 'hero') {
                    return (
                        <section key={idx} className="relative overflow-hidden mesh-bg">
                            {/* Vibrant Soft Background Orbs */}
                            <div className="pointer-events-none absolute inset-0 overflow-hidden mix-blend-multiply">
                                <div className="animate-glow absolute -top-40 -left-20 w-[500px] h-[500px] rounded-full"
                                    style={{ background: 'radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, transparent 70%)', animationDelay: '1s' }} />
                                <div className="animate-glow absolute top-1/4 -right-40 w-[600px] h-[600px] rounded-full"
                                    style={{ background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)', animationDelay: '0s' }} />
                                <div className="animate-glow absolute bottom-0 left-1/4 w-[450px] h-[450px] rounded-full"
                                    style={{ background: 'radial-gradient(circle, rgba(244, 63, 94, 0.1) 0%, transparent 70%)', animationDelay: '3s' }} />
                            </div>

                            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-44 text-center">
                                {/* Lively Professional Badge */}
                                {block.badge && (
                                    <div className="animate-fade-up inline-flex items-center gap-3 px-6 py-2.5 rounded-full mb-10 text-[13px] font-bold tracking-widest uppercase text-emerald-900/80 border border-emerald-500/20 bg-white/70 backdrop-blur-md shadow-sm font-sans">
                                        <span className="accent-dot bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)] animate-pulse" />
                                        {block.badge}
                                    </div>
                                )}

                                <h1 className="animate-fade-up text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-8 text-emerald-950 font-display">
                                    {block.title}
                                </h1>

                                {block.subtitle && (
                                    <p className="animate-fade-up text-lg sm:text-xl text-emerald-950/60 max-w-2xl mx-auto leading-relaxed font-medium font-sans">
                                        {block.subtitle}
                                    </p>
                                )}
                            </div>
                        </section>
                    );
                }

                /* ─── FEATURES / CONTACT ITEMS ────────────── */
                if (block.type === 'features') {
                    if (!block.items || block.items.length === 0) return null;

                    return (
                        <section key={idx} className="py-40 bg-white/40 border-t border-emerald-500/5 relative overflow-hidden">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(59,130,246,0.02),transparent_50%)] pointer-events-none" />

                            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
                                    {block.items.map((item: any, i: number) => {
                                        if (!item.title) return null;

                                        const colorKey = item.color || 'blue';
                                        const s = ICON_STYLES[colorKey] || ICON_STYLES.blue;
                                        const icon = ICON_MAP[item.title.toUpperCase()] || ICON_MAP.default;

                                        const isAdres = item.title.toUpperCase() === 'ADRES';
                                        const isPhone = item.title.toUpperCase() === 'TELEFON';
                                        const isInsta = item.title.toUpperCase() === 'INSTAGRAM';

                                        const href = isAdres
                                            ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.description)}`
                                            : isPhone
                                                ? `tel:${item.description.replace(/\s/g, '')}`
                                                : isInsta
                                                    ? `https://instagram.com/${item.description.replace('@', '')}`
                                                    : null;

                                        const CardWrapper = href ? 'a' : 'div';
                                        const wrapperProps = href ? {
                                            href,
                                            target: isPhone ? undefined : "_blank",
                                            rel: isPhone ? undefined : "noopener noreferrer"
                                        } : {};

                                        return (
                                            <CardWrapper
                                                key={i}
                                                {...wrapperProps}
                                                className={`feature-card group flex flex-col items-center text-center transition-all duration-500 ${href ? 'hover:bg-white cursor-pointer' : ''}`}
                                            >
                                                {/* Distinct Colorful Icon Container */}
                                                <div className="mb-10 relative">
                                                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${s.dot} border border-white/20 text-white transition-all duration-500 group-hover:scale-110 shadow-lg`}
                                                        style={{ boxShadow: `0 10px 30px -10px ${s.shadow}` }}>
                                                        {icon}
                                                    </div>
                                                </div>
                                                <h3 className="text-2xl font-bold text-emerald-950 mb-4 font-display transition-colors group-hover:text-emerald-700">{item.title}</h3>
                                                <p className="text-emerald-950/60 leading-relaxed font-sans text-lg font-medium group-hover:text-emerald-800 transition-colors">
                                                    {item.description}
                                                </p>
                                            </CardWrapper>
                                        );
                                    })}
                                </div>
                            </div>
                        </section>
                    );
                }

                return null;
            })}
        </div>
    );
}
