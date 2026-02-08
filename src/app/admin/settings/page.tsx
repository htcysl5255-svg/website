"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function SiteSettings() {
    const [settings, setSettings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        fetchSettings();
    }, []);

    async function fetchSettings() {
        const { data } = await supabase.from("site_settings").select("*");
        if (data) setSettings(data);
        setLoading(false);
    }

    const updateValue = (key: string, value: string) => {
        setSettings(settings.map(s => s.key === key ? { ...s, value } : s));
    };

    const handleSave = async () => {
        const { error } = await supabase.from("site_settings").upsert(settings);
        if (!error) {
            alert("Ayarlar başarıyla kaydedildi.");
        } else {
            alert("Hata: " + error.message);
        }
    };

    if (loading) return <div>Yükleniyor...</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-10">
                <h1 className="text-3xl font-bold text-slate-900">Site Ayarları</h1>
                <button
                    onClick={handleSave}
                    className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-xl shadow-blue-200"
                >
                    <Save size={20} /> Kaydet
                </button>
            </div>

            <div className="bg-white rounded-3xl p-10 shadow-sm border border-slate-200 space-y-8">
                {settings.map((setting) => (
                    <div key={setting.key}>
                        <label className="block text-sm font-bold text-slate-700 mb-2 capitalize">
                            {setting.key.replace('_', ' ')}
                        </label>
                        {setting.key.includes('text') ? (
                            <textarea
                                value={setting.value}
                                onChange={(e) => updateValue(setting.key, e.target.value)}
                                className="w-full px-5 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                            />
                        ) : (
                            <input
                                value={setting.value}
                                onChange={(e) => updateValue(setting.key, e.target.value)}
                                className="w-full px-5 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
