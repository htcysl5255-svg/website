import { createClient } from "@/lib/supabase/server";
import { FileText, Package, Users, Eye } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
    const supabase = await createClient();

    const { count: blogCount } = await supabase.from("posts").select("*", { count: 'exact', head: true });
    const { count: pageCount } = await supabase.from("pages").select("*", { count: 'exact', head: true });

    const stats = [
        { name: "Toplam Blog", value: blogCount || 0, icon: FileText, color: "bg-blue-500" },
        { name: "Toplam Sayfa", value: pageCount || 0, icon: Package, color: "bg-indigo-500" },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-3xl font-bold text-slate-900">Hoş Geldiniz</h1>
                <Link href="/" target="_blank" className="flex items-center gap-2 text-blue-600 font-bold hover:underline">
                    Siteyi Görüntüle <Eye size={18} />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {stats.map((stat) => (
                    <div key={stat.name} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-4 rounded-2xl ${stat.color} text-white`}>
                                <stat.icon size={24} />
                            </div>
                        </div>
                        <p className="text-slate-500 font-medium mb-1">{stat.name}</p>
                        <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
