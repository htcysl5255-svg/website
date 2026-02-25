import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight, BookOpen } from "lucide-react";
import { DUMMY_POSTS, DUMMY_SITE_SETTINGS } from "@/lib/dummy-data";

export default async function Blog() {
    let posts = DUMMY_POSTS;
    let settings = DUMMY_SITE_SETTINGS;

    const supabase = await createClient();

    if (supabase) {
        const { data: fetchedPosts } = await supabase
            .from("posts")
            .select("*")
            .eq("published", true)
            .order("created_at", { ascending: false });
        if (fetchedPosts && fetchedPosts.length > 0) posts = fetchedPosts;

        const { data: fetchedSettings } = await supabase.from("site_settings").select("*");
        if (fetchedSettings && fetchedSettings.length > 0) settings = fetchedSettings;
    }

    const getSetting = (key: string) => settings?.find(s => s.key === key)?.value;

    const title = getSetting('blog_page_title') || "Blog & Yazılar";
    const subtitle = getSetting('blog_page_subtitle') || "Gelişim yolculuğunuzda size ilham verecek makaleler ve ipuçları.";
    const readMoreLabel = getSetting('blog_read_more_label') || "Devamını Oku";

    return (
        <div className="bg-white min-h-screen">

            {/* Hero section */}
            <section className="relative overflow-hidden mesh-bg">
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="animate-float absolute -top-24 -right-24 w-[350px] h-[350px] rounded-full"
                        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)' }} />
                    <div className="animate-float absolute bottom-0 left-1/4 w-[250px] h-[250px] rounded-full"
                        style={{ animationDelay: '3s', background: 'radial-gradient(circle, rgba(244,63,94,0.1) 0%, transparent 70%)' }} />
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 text-center">
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-8 text-sm font-semibold"
                        style={{ background: 'rgba(99,102,241,0.08)', color: '#6366f1', border: '1px solid rgba(99,102,241,0.2)' }}>
                        <BookOpen size={14} />
                        Güncel Yazılar
                    </div>
                    <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-slate-900 mb-5 leading-tight">
                        {title.split(' ').slice(0, -1).join(' ')}{' '}
                        <span className="gradient-text">{title.split(' ').slice(-1)}</span>
                    </h1>
                    <p className="text-lg text-slate-500 max-w-xl mx-auto">{subtitle}</p>
                </div>
            </section>

            {/* Posts grid */}
            <section className="py-20 bg-slate-50/40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {posts && posts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map((post, i) => (
                                <Link
                                    key={post.id}
                                    href={`/blog/${post.slug}`}
                                    className="group bg-white rounded-3xl overflow-hidden border border-slate-100
                                        hover:border-indigo-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
                                >
                                    {/* Image */}
                                    <div className="relative h-56 overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-50">
                                        <Image
                                            src={post.image_url || "/placeholder_1.png"}
                                            alt={post.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        {/* Category tag */}
                                        {i === 0 && (
                                            <div className="absolute top-4 left-4">
                                                <span className="px-3 py-1 rounded-full text-xs font-bold"
                                                    style={{ background: 'rgba(99,102,241,0.9)', color: '#fff' }}>
                                                    Öne Çıkan
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-7 flex flex-col flex-1">
                                        <div className="flex items-center gap-2 text-slate-400 text-xs mb-4 font-semibold uppercase tracking-widest">
                                            <Calendar size={13} />
                                            {new Date(post.created_at).toLocaleDateString('tr-TR', {
                                                year: 'numeric', month: 'long', day: 'numeric'
                                            })}
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug group-hover:text-indigo-600 transition-colors flex-1">
                                            {post.title}
                                        </h3>
                                        <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm mt-auto">
                                            {readMoreLabel}
                                            <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <BookOpen size={48} className="mx-auto text-slate-200 mb-6" />
                            <h3 className="text-xl font-bold text-slate-400 mb-2">Henüz yazı yok</h3>
                            <p className="text-slate-400 text-sm">Yakında yeni içerikler eklenecek.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
