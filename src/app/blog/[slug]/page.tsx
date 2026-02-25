import { createClient } from "@/lib/supabase/server";
import { ArrowLeft, Calendar, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { DUMMY_POSTS, DUMMY_SITE_SETTINGS, isSupabaseMissing } from "@/lib/dummy-data";

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    let post: any = null;
    let settings = DUMMY_SITE_SETTINGS;
    const supabase = await createClient();

    if (supabase) {
        const { data } = await supabase
            .from("posts")
            .select("*")
            .eq("slug", slug)
            .single();
        post = data;

        const { data: fetchedSettings } = await supabase.from("site_settings").select("*");
        if (fetchedSettings) settings = fetchedSettings;
    } else {
        post = DUMMY_POSTS.find(p => p.slug === slug) || null;
    }

    if (!post) notFound();

    const getSetting = (key: string) => settings?.find(s => s.key === key)?.value;
    const backLabel = getSetting('blog_back_label') || "Geri Dön";

    return (
        <article className="max-w-4xl mx-auto py-20 px-4">
            <Link href="/blog" className="inline-flex items-center gap-2 text-blue-600 font-semibold mb-10 hover:gap-3 transition-all">
                <ArrowLeft size={20} /> {backLabel}
            </Link>

            <div className="relative h-[400px] w-full mb-12 rounded-[2rem] overflow-hidden shadow-2xl">
                <Image
                    src={post.image_url || "/placeholder_1.png"}
                    alt={post.title}
                    fill
                    className="object-cover"
                />
            </div>

            <div className="flex items-center gap-6 text-slate-500 mb-8 font-medium">
                <div className="flex items-center gap-2">
                    <Calendar size={18} />
                    {new Date(post.created_at).toLocaleDateString('tr-TR')}
                </div>
                <div className="flex items-center gap-2">
                    <User size={18} />
                    {post.author || 'Admin'}
                </div>
            </div>

            <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 mb-10 leading-tight">
                {post.title}
            </h1>

            <div
                className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />
        </article>
    );
}
