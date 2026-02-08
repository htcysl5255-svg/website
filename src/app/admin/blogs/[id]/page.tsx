"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Save, ArrowLeft, Image as ImageIcon, Send } from "lucide-react";
import Link from "next/link";

export default function BlogEditor({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const isNew = id === "new";
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [author, setAuthor] = useState("Admin");
    const [content, setContent] = useState("");
    const [published, setPublished] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        if (!isNew) {
            fetchPost();
        }
    }, []);

    async function fetchPost() {
        const { data } = await supabase.from("posts").select("*").eq("id", id).single();
        if (data) {
            setTitle(data.title);
            setSlug(data.slug);
            setImageUrl(data.image_url || "");
            setAuthor(data.author || "Admin");
            setContent(data.content);
            setPublished(data.published);
        }
    }

    const handleSave = async () => {
        const postData = { title, slug, image_url: imageUrl, author, content, published };

        let error;
        if (isNew) {
            const { error: err } = await supabase.from("posts").insert([postData]);
            error = err;
        } else {
            const { error: err } = await supabase.from("posts").update(postData).eq("id", id);
            error = err;
        }

        if (!error) {
            router.push("/admin/blogs");
            router.refresh();
        } else {
            alert("Hata oluştu: " + error.message);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-10">
                <Link href="/admin/blogs" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-medium">
                    <ArrowLeft size={20} /> Geri Dön
                </Link>
                <button
                    onClick={handleSave}
                    className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-xl shadow-blue-200"
                >
                    <Save size={20} /> Yazıyı Kaydet
                </button>
            </div>

            <div className="bg-white rounded-3xl p-10 shadow-sm border border-slate-200 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Yazı Başlığı</label>
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-5 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Örn: Başarılı Olmanın Yolları"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">URL (Slug)</label>
                        <input
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                            className="w-full px-5 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="yazi-slug"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Kapak Görseli URL</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                                <ImageIcon size={20} />
                            </span>
                            <input
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                className="w-full pl-12 pr-5 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="https://images.unsplash.com/..."
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Yazar</label>
                        <input
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            className="w-full px-5 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Örn: Admin"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">İçerik (HTML veya Düz Metin)</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full h-80 px-5 py-5 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                        placeholder="Yazı içeriğinizi buraya girin..."
                    />
                </div>

                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl">
                    <input
                        type="checkbox"
                        id="published"
                        checked={published}
                        onChange={(e) => setPublished(e.target.checked)}
                        className="w-6 h-6 accent-green-600"
                    />
                    <label htmlFor="published" className="text-sm font-bold text-slate-700 cursor-pointer flex items-center gap-2">
                        <Send size={16} /> Yazıyı Yayına Al
                    </label>
                </div>
            </div>
        </div>
    );
}
