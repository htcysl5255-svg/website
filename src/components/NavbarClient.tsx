"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

interface NavbarClientProps {
    navItems: { title: string; slug: string }[];
}

export default function NavbarClient({ navItems }: NavbarClientProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="md:hidden">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-slate-600 p-2"
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-slate-200 shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.slug}
                                href={`/${item.slug}`}
                                className="block px-3 py-4 text-lg font-medium text-slate-700 hover:bg-slate-50 rounded-xl transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.title}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
