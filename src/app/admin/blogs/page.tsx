"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Plus, Edit3, Trash2, FileText, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

export default function BlogsAdmin() {
    const [posts, setPosts] = useState<any[]>([]);
    const supabase = createClient();

    useEffect(() => {
        fetchPosts();
    }, []);

    async function fetchPosts() {
        const { data } = await supabase.from("posts").select("*").order("created_at", { ascending: false });
        if (data) setPosts(data);
    }

    async function deletePost(id: string) {
        if (confirm("Bu yazıyı silmek istediğinize emin misiniz?")) {
            await supabase.from("posts").delete().eq("id", id);
            fetchPosts();
        }
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Blog Yazıları</h1>
                    <p className="text-slate-500 mt-2">Sitenizdeki tüm blog yazılarını buradan yönetin.</p>
                </div>
                <Link
                    href="/admin/blogs/new"
                    className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg"
                >
                    <Plus size={20} /> Yeni Yazı Ekle
                </Link>
            </div>

            <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-8 py-5 font-bold text-slate-700">Başlık</th>
                            <th className="px-8 py-5 font-bold text-slate-700">Tarih</th>
                            <th className="px-8 py-5 font-bold text-slate-700">Durum</th>
                            <th className="px-8 py-5 font-bold text-slate-700 text-right">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {posts.map((post) => (
                            <tr key={post.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-8 py-5 font-medium text-slate-900">{post.title}</td>
                                <td className="px-8 py-5 text-slate-500 text-sm">
                                    {new Date(post.created_at).toLocaleDateString('tr-TR')}
                                </td>
                                <td className="px-8 py-5">
                                    <div className="flex items-center gap-2">
                                        {post.published ? (
                                            <span className="flex items-center gap-1.5 text-green-600 font-bold text-xs uppercase bg-green-50 px-3 py-1 rounded-full">
                                                <CheckCircle size={14} /> Yayında
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-1.5 text-slate-400 font-bold text-xs uppercase bg-slate-50 px-3 py-1 rounded-full">
                                                <XCircle size={14} /> Taslak
                                            </span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-8 py-5 text-right">
                                    <div className="flex justify-end gap-2">
                                        <Link href={`/admin/blogs/${post.id}`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                            <Edit3 size={18} />
                                        </Link>
                                        <button onClick={() => deletePost(post.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {posts.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-8 py-10 text-center text-slate-500">Henüz bir yazı eklenmemiş.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
