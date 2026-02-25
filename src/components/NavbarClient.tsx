"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";

interface NavbarClientProps {
    navItems: { title: string; slug: string }[];
}

export default function NavbarClient({ navItems }: NavbarClientProps) {
    const [isOpen, setIsOpen] = useState(false);

    // Lock body scroll when menu is open
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    return (
        <>
            {/* Hamburger button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200"
                style={{ background: isOpen ? 'rgba(99,102,241,0.1)' : 'transparent', color: isOpen ? '#6366f1' : '#475569' }}
                aria-label="Toggle menu"
            >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Backdrop */}
            {isOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm"
                    style={{ zIndex: 40, top: '3px' }}
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Slide-down mobile menu */}
            <div
                className="md:hidden fixed left-0 right-0"
                style={{
                    top: '67px',
                    zIndex: 45,
                    transform: isOpen ? 'translateY(0)' : 'translateY(-16px)',
                    opacity: isOpen ? 1 : 0,
                    pointerEvents: isOpen ? 'auto' : 'none',
                    transition: 'all 0.25s cubic-bezier(0.4,0,0.2,1)',
                    padding: '0 1rem',
                }}
            >
                <div className="rounded-2xl overflow-hidden"
                    style={{
                        background: 'rgba(255,255,255,0.96)',
                        backdropFilter: 'blur(16px)',
                        border: '1px solid rgba(226,232,240,0.8)',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06)',
                    }}>
                    <div className="p-3 space-y-1">
                        {navItems.map((item, i) => (
                            <Link
                                key={item.slug}
                                href={`/${item.slug}`}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-150"
                                style={{
                                    color: '#374151',
                                    transitionDelay: `${i * 30}ms`,
                                }}
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(99,102,241,0.06)';
                                    (e.currentTarget as HTMLAnchorElement).style.color = '#6366f1';
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLAnchorElement).style.background = '';
                                    (e.currentTarget as HTMLAnchorElement).style.color = '#374151';
                                }}
                            >
                                {item.title}
                                <ArrowRight size={16} className="opacity-30" />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
