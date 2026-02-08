"use client";

import Link from "next/link";
import { LayoutDashboard, FileText, Settings, LogOut, Package } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    const handleLogout = async () => {
        await fetch("/api/admin/logout", { method: "POST" });
        router.push("/admin/login");
    };

    return (
        <div className="flex min-h-screen bg-slate-100">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white flex flex-col fixed h-full">
                <div className="p-8 border-b border-slate-800">
                    <h2 className="text-xl font-bold tracking-tight">Koçluk Admin</h2>
                </div>
                <nav className="flex-1 p-6 space-y-2">
                    <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 transition-colors">
                        <LayoutDashboard size={20} /> Dashboard
                    </Link>
                    <Link href="/admin/pages" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 transition-colors">
                        <Package size={20} /> Sayfaları Tasarla
                    </Link>
                    <Link href="/admin/blogs" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 transition-colors">
                        <FileText size={20} /> Blog Yazıları
                    </Link>
                    <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 transition-colors">
                        <Settings size={20} /> Site Ayarları
                    </Link>
                </nav>
                <div className="p-6 border-t border-slate-800">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 text-red-400 w-full transition-colors font-semibold"
                    >
                        <LogOut size={20} /> Çıkış Yap
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-10">
                {children}
            </main>
        </div>
    );
}
