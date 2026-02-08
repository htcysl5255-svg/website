"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Plus, Edit3, Trash2, Layout } from "lucide-react";
import Link from "next/link";

export default function PagesAdmin() {
    const [pages, setPages] = useState<any[]>([]);
    const supabase = createClient();

    useEffect(() => {
        fetchPages();
    }, []);

    async function fetchPages() {
        const { data } = await supabase.from("pages").select("*").order("order", { ascending: true });
        if (data) setPages(data);
    }

    async function deletePage(id: string) {
        if (confirm("Bu sayfayı silmek istediğinize emin misiniz?")) {
            await supabase.from("pages").delete().eq("id", id);
            fetchPages();
        }
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Sayfa Yönetimi</h1>
                    <p className="text-slate-500 mt-2">Sitenizdeki tüm içerik sayfalarını buradan yönetin.</p>
                </div>
                <Link
                    href="/admin/pages/new"
                    className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg"
                >
                    <Plus size={20} /> Yeni Sayfa Ekle
                </Link>
            </div>

            <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-8 py-5 font-bold text-slate-700">Başlık</th>
                            <th className="px-8 py-5 font-bold text-slate-700">Slug</th>
                            <th className="px-8 py-5 font-bold text-slate-700">Menüde?</th>
                            <th className="px-8 py-5 font-bold text-slate-700 text-right">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {pages.map((page) => (
                            <tr key={page.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-8 py-5 font-medium text-slate-900">{page.title}</td>
                                <td className="px-8 py-5 text-slate-500 italic">/{page.slug}</td>
                                <td className="px-8 py-5">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${page.in_navbar ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                                        {page.in_navbar ? 'Evet' : 'Hayır'}
                                    </span>
                                </td>
                                <td className="px-8 py-5 text-right">
                                    <div className="flex justify-end gap-2">
                                        <Link href={`/admin/pages/${page.id}`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                            <Edit3 size={18} />
                                        </Link>
                                        <button onClick={() => deletePage(page.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {pages.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-8 py-10 text-center text-slate-500">Henüz bir sayfa oluşturulmamış.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
