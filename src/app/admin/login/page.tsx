"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, ShieldCheck } from "lucide-react";

export default function AdminLogin() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch("/api/admin/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password }),
        });

        if (res.ok) {
            router.push("/admin/dashboard");
        } else {
            setError("Hatalı şifre. Lütfen tekrar deneyin.");
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-[2rem] shadow-2xl p-10">
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Lock size={32} />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Yönetici Girişi</h1>
                    <p className="text-slate-500">Lütfen devam etmek için şifrenizi girin.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Şifre</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm font-medium text-center">{error}</p>}

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                    >
                        <ShieldCheck size={20} />
                        Giriş Yap
                    </button>
                </form>
            </div>
        </div>
    );
}
