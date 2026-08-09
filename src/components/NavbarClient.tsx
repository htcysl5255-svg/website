"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

interface NavbarClientProps {
    navItems: { title: string; slug: string }[];
}

export default function NavbarClient({ navItems }: NavbarClientProps) {
    const pathname = usePathname();

    // Track which route the menu was opened on, so navigating away closes it
    // without needing an effect to reset the state.
    const [openFor, setOpenFor] = useState<string | null>(null);
    const isOpen = openFor !== null && openFor === pathname;

    const setIsOpen = (open: boolean) => setOpenFor(open ? pathname : null);

    // Lock body scroll while the menu is open.
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="nav-toggle"
                aria-label={isOpen ? "Menüyü kapat" : "Menüyü aç"}
                aria-expanded={isOpen}
                style={{
                    background: isOpen
                        ? "color-mix(in srgb, var(--color-accent) 14%, transparent)"
                        : "transparent",
                    color: isOpen ? "var(--color-accent-700)" : "var(--color-neutral-800)",
                }}
            >
                {isOpen ? <X size={22} strokeWidth={2.75} /> : <Menu size={22} strokeWidth={2.75} />}
            </button>

            {isOpen && (
                <div
                    className="nav-backdrop"
                    onClick={() => setIsOpen(false)}
                    aria-hidden="true"
                />
            )}

            <div className="nav-sheet" data-open={isOpen}>
                <div
                    style={{
                        background: "var(--color-bg)",
                        border: "1px solid var(--color-divider)",
                        borderRadius: "var(--radius-lg)",
                        boxShadow: "var(--shadow-lg)",
                        overflow: "hidden",
                        padding: "var(--space-3)",
                        display: "flex",
                        flexDirection: "column",
                        gap: 4,
                    }}
                >
                    {navItems.map((item) => (
                        <Link
                            key={item.slug}
                            href={`/${item.slug}`}
                            onClick={() => setIsOpen(false)}
                            style={{
                                padding: "14px 16px",
                                borderRadius: 999,
                                fontSize: 17,
                                color: "var(--color-neutral-800)",
                            }}
                        >
                            {item.title}
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}
