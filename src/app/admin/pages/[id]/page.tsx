"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { savePage } from "@/actions/page-actions";
import { Save, Plus, Trash2, ArrowLeft, Type, Layout, Grid, Star, Users, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function PageBuilder({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const isNew = id === "new";
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [inNavbar, setInNavbar] = useState(true);
    const [blocks, setBlocks] = useState<any[]>([]);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        if (!isNew) {
            fetchPage();
        }
    }, []);

    async function fetchPage() {
        const { data } = await supabase.from("pages").select("*").eq("id", id).single();
        if (data) {
            setTitle(data.title);
            setSlug(data.slug);
            setInNavbar(data.in_navbar);
            setBlocks(Array.isArray(data.content) ? data.content : []);
        }
    }

    const addBlock = (type: string) => {
        let newBlock: any;
        if (type === 'text') {
            newBlock = { type: 'text', content: '<p>Yeni metin bloğu...</p>' };
        } else if (type === 'hero') {
            newBlock = { type: 'hero', title: 'Hoş Geldiniz', subtitle: 'Alt başlık buraya gelir.' };
        } else if (type === 'features') {
            newBlock = {
                type: 'features', items: [
                    { title: 'Özellik 1', description: 'Açıklama 1' },
                    { title: 'Özellik 2', description: 'Açıklama 2' },
                    { title: 'Özellik 3', description: 'Açıklama 3' }
                ]
            };
        }
        setBlocks([...blocks, newBlock]);
    };

    const updateBlock = (index: number, content: any) => {
        const newBlocks = [...blocks];
        newBlocks[index] = { ...newBlocks[index], ...content };
        setBlocks(newBlocks);
    };

    const updateFeatureItem = (blockIdx: number, itemIdx: number, field: string, value: string) => {
        const newBlocks = [...blocks];
        newBlocks[blockIdx].items[itemIdx][field] = value;
        setBlocks(newBlocks);
    };

    const removeBlock = (index: number) => {
        setBlocks(blocks.filter((_, i) => i !== index));
    };

    const handleSave = async () => {
        const pageData = { title, slug, in_navbar: inNavbar, content: blocks };

        // Use Server Action
        const result = await savePage(pageData, isNew, id);

        if (result.success) {
            router.push("/admin/pages");
            router.refresh();
        } else {
            alert("Hata oluştu: " + result.error);
        }
    };

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-10">
                <Link href="/admin/pages" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-medium">
                    <ArrowLeft size={20} /> Geri Dön
                </Link>
                <button
                    onClick={handleSave}
                    className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-xl shadow-blue-200"
                >
                    <Save size={20} /> Kaydet
                </button>
            </div>

            <div className="bg-white rounded-3xl p-10 shadow-sm border border-slate-200 mb-10 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Sayfa Başlığı</label>
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-5 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Örn: Hakkımızda"
                            disabled={slug === 'index'}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">URL (Slug)</label>
                        <input
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                            className="w-full px-5 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="hakkimizda"
                            disabled={slug === 'index'}
                        />
                    </div>
                </div>
                {slug !== 'index' && (
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="inNav"
                            checked={inNavbar}
                            onChange={(e) => setInNavbar(e.target.checked)}
                            className="w-5 h-5 accent-blue-600"
                        />
                        <label htmlFor="inNav" className="text-sm font-bold text-slate-700 cursor-pointer">Navigasyon menüsünde göster</label>
                    </div>
                )}
            </div>

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-slate-900">Sayfa Bölümleri</h2>
                    <div className="flex gap-2">
                        <button onClick={() => addBlock('text')} className="bg-slate-50 text-slate-700 px-4 py-2 rounded-lg font-bold border border-slate-200 hover:bg-white transition-all flex items-center gap-2">
                            <Type size={18} /> Metin Ekle
                        </button>
                        <button onClick={() => addBlock('hero')} className="bg-slate-50 text-slate-700 px-4 py-2 rounded-lg font-bold border border-slate-200 hover:bg-white transition-all flex items-center gap-2">
                            <Layout size={18} /> Hero Ekle
                        </button>
                        <button onClick={() => addBlock('features')} className="bg-slate-50 text-slate-700 px-4 py-2 rounded-lg font-bold border border-slate-200 hover:bg-white transition-all flex items-center gap-2">
                            <Grid size={18} /> Özellikler Ekle
                        </button>
                    </div>
                </div>

                {blocks.map((block, idx) => (
                    <div key={idx} className="bg-slate-50 p-8 rounded-3xl border-2 border-dashed border-slate-200 relative group">
                        <button
                            onClick={() => removeBlock(idx)}
                            className="absolute top-4 right-4 p-2 bg-white text-red-500 rounded-xl shadow-sm border border-red-100 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <Trash2 size={18} />
                        </button>

                        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase mb-4 tracking-widest">
                            {block.type === 'text' && <Type size={14} />}
                            {block.type === 'hero' && <Layout size={14} />}
                            {block.type === 'features' && <Grid size={14} />}
                            {block.type} Bloğu
                        </div>

                        {block.type === 'text' && (
                            <textarea
                                value={block.content}
                                onChange={(e) => updateBlock(idx, { content: e.target.value })}
                                className="w-full h-40 bg-white p-5 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        )}

                        {block.type === 'hero' && (
                            <div className="space-y-4">
                                <input
                                    value={block.badge || ""}
                                    onChange={(e) => updateBlock(idx, { badge: e.target.value })}
                                    placeholder="Hero Badge (Örn: Türkiye'nin Lideri)"
                                    className="w-full bg-white p-5 border border-slate-100 rounded-2xl outline-none"
                                />
                                <input
                                    value={block.title}
                                    onChange={(e) => updateBlock(idx, { title: e.target.value })}
                                    placeholder="Hero Başlık"
                                    className="w-full bg-white p-5 border border-slate-100 rounded-2xl outline-none"
                                />
                                <textarea
                                    value={block.subtitle}
                                    onChange={(e) => updateBlock(idx, { subtitle: e.target.value })}
                                    placeholder="Hero Alt Başlık"
                                    className="w-full bg-white p-5 border border-slate-100 rounded-2xl outline-none"
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        value={block.cta1_text || ""}
                                        onChange={(e) => updateBlock(idx, { cta1_text: e.target.value })}
                                        placeholder="Buton 1 Metni"
                                        className="bg-white p-4 border border-slate-100 rounded-xl outline-none"
                                    />
                                    <input
                                        value={block.cta1_link || ""}
                                        onChange={(e) => updateBlock(idx, { cta1_link: e.target.value })}
                                        placeholder="Buton 1 Link (örn: /iletisim)"
                                        className="bg-white p-4 border border-slate-100 rounded-xl outline-none"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        value={block.cta2_text || ""}
                                        onChange={(e) => updateBlock(idx, { cta2_text: e.target.value })}
                                        placeholder="Buton 2 Metni"
                                        className="bg-white p-4 border border-slate-100 rounded-xl outline-none"
                                    />
                                    <input
                                        value={block.cta2_link || ""}
                                        onChange={(e) => updateBlock(idx, { cta2_link: e.target.value })}
                                        placeholder="Buton 2 Link (örn: /hakkimizda)"
                                        className="bg-white p-4 border border-slate-100 rounded-xl outline-none"
                                    />
                                </div>
                            </div>
                        )}

                        {block.type === 'features' && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {block.items.map((item: any, i: number) => (
                                    <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 space-y-4">
                                        <div className="flex items-center gap-2 text-blue-600 font-bold text-sm justify-between">
                                            <div className="flex items-center gap-2">
                                                {i === 0 && <CheckCircle2 size={16} />}
                                                {i === 1 && <Users size={16} />}
                                                {i === 2 && <Star size={16} />}
                                                Özellik {i + 1}
                                            </div>
                                            <select
                                                value={item.color || 'blue'}
                                                onChange={(e) => updateFeatureItem(idx, i, 'color', e.target.value)}
                                                className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 outline-none text-slate-600"
                                            >
                                                <option value="blue">Mavi</option>
                                                <option value="green">Yeşil</option>
                                                <option value="pink">Pembe</option>
                                                <option value="orange">Turuncu</option>
                                                <option value="purple">Mor</option>
                                            </select>
                                        </div>
                                        <input
                                            value={item.title}
                                            onChange={(e) => updateFeatureItem(idx, i, 'title', e.target.value)}
                                            placeholder="Başlık"
                                            className="w-full bg-slate-50 p-3 border border-slate-100 rounded-xl outline-none"
                                        />
                                        <textarea
                                            value={item.description}
                                            onChange={(e) => updateFeatureItem(idx, i, 'description', e.target.value)}
                                            placeholder="Açıklama"
                                            className="w-full bg-slate-50 p-3 border border-slate-100 rounded-xl outline-none h-24"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
