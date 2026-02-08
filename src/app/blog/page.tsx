import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";

export default async function Blog() {
    const supabase = await createClient();
    const { data: posts } = await supabase
        .from("posts")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });

    const { data: settings } = await supabase.from("site_settings").select("*");
    const getSetting = (key: string) => settings?.find(s => s.key === key)?.value;

    const title = getSetting('blog_page_title') || "Blog & Yazılar";
    const subtitle = getSetting('blog_page_subtitle') || "Gelişim yolculuğunuzda size ilham verecek makaleler ve ipuçları.";
    const readMoreLabel = getSetting('blog_read_more_label') || "Devamını Oku";

    return (
        <div className="bg-white min-h-screen">
            <section className="pt-24 pb-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6">{title}</h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">{subtitle}</p>
                </div>
            </section>

            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {posts?.map((post) => (
                            <Link
                                key={post.id}
                                href={`/blog/${post.slug}`}
                                className="group bg-white rounded-[2rem] overflow-hidden border border-slate-100 hover:shadow-2xl transition-all hover:-translate-y-2"
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <Image
                                        src={post.image_url || "/placeholder_1.png"}
                                        alt={post.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-8">
                                    <div className="flex items-center gap-2 text-slate-400 text-sm mb-4 font-semibold">
                                        <Calendar size={16} />
                                        {new Date(post.created_at).toLocaleDateString('tr-TR')}
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                                        {post.title}
                                    </h3>
                                    <div className="flex items-center gap-2 text-blue-600 font-bold">
                                        {readMoreLabel} <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
