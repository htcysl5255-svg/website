import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { CheckCircle2, Users, Star, ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const supabase = await createClient();

    const { data: page } = await supabase
        .from("pages")
        .select("*")
        .eq("slug", slug)
        .single();

    if (!page) {
        notFound();
    }

    const blocks = Array.isArray(page.content) ? page.content : [];

    return (
        <div className="min-h-screen bg-white">
            {blocks.map((block: any, idx: number) => {
                if (block.type === 'text') {
                    return (
                        <section key={idx} className="py-20 px-4">
                            <div className="max-w-4xl mx-auto prose prose-lg prose-slate" dangerouslySetInnerHTML={{ __html: block.content }} />
                        </section>
                    );
                }

                if (block.type === 'hero') {
                    return (
                        <section key={idx} className="relative pt-20 pb-32 lg:pt-32 lg:pb-40 text-center px-4 overflow-hidden">
                            {/* Subtle Background Elements */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[800px] bg-gradient-to-b from-blue-50/50 via-pink-50/30 to-white -z-10 opacity-70 pointer-events-none" />
                            <div className="absolute top-20 right-[10%] w-64 h-64 bg-blue-100/40 rounded-full blur-3xl -z-10" />
                            <div className="absolute bottom-20 left-[10%] w-64 h-64 bg-pink-100/40 rounded-full blur-3xl -z-10" />

                            <div className="max-w-4xl mx-auto relative z-10">
                                {block.badge && (
                                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-100 shadow-sm text-sm font-semibold text-slate-600 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                                        <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                                        {block.badge}
                                    </div>
                                )}

                                <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 tracking-tight mb-8 leading-[1.1]">
                                    {block.title}
                                </h1>

                                {block.subtitle && (
                                    <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
                                        {block.subtitle}
                                    </p>
                                )}

                                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                    {block.cta1_text && block.cta1_link && (
                                        <Link
                                            href={block.cta1_link}
                                            className="px-8 py-4 bg-slate-900 text-white rounded-xl font-semibold text-lg hover:bg-slate-800 transition-all hover:translate-y-px shadow-lg hover:shadow-xl shadow-slate-900/10 flex items-center gap-2"
                                        >
                                            {block.cta1_text} <ArrowRight size={18} />
                                        </Link>
                                    )}
                                    {block.cta2_text && block.cta2_link && (
                                        <Link
                                            href={block.cta2_link}
                                            className="px-8 py-4 bg-white text-slate-600 border border-slate-200 rounded-xl font-semibold text-lg hover:bg-slate-50 transition-all hover:border-slate-300"
                                        >
                                            {block.cta2_text}
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </section>
                    );
                }

                if (block.type === 'features') {
                    if (!block.items || block.items.length === 0) return null;

                    return (
                        <section key={idx} className="py-24 bg-white relative">
                            <div className="absolute inset-0 bg-slate-50/50 -z-10 skew-y-3 transform origin-top-left scale-110" />
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                                    {block.items.map((item: any, i: number) => {
                                        if (!item.title) return null;

                                        const colorMap: Record<string, string> = {
                                            blue: 'bg-blue-50 text-blue-600',
                                            green: 'bg-green-50 text-green-600',
                                            pink: 'bg-pink-50 text-pink-600',
                                            orange: 'bg-orange-50 text-orange-600',
                                            purple: 'bg-purple-50 text-purple-600',
                                        };
                                        const colorClass = colorMap[item.color || 'blue'] || colorMap['blue'];

                                        return (
                                            <div key={i} className="bg-white p-8 lg:p-10 rounded-3xl border border-slate-100 hover:border-blue-100 hover:shadow-xl transition-all duration-300 group">
                                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors ${colorClass}`}>
                                                    {i === 0 && <Star size={28} />}
                                                    {i === 1 && <Users size={28} />}
                                                    {i === 2 && <CheckCircle2 size={28} />}
                                                </div>
                                                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                                                <p className="text-slate-500 leading-relaxed">
                                                    {item.description}
                                                </p>
                                            </div>
                                        )
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
