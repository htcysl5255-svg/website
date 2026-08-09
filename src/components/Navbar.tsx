import Link from "next/link";
import Image from "next/image";
import NavbarClient from "./NavbarClient";
import NavLink from "./NavLink";
import { SITE, NAV_ITEMS } from "@/lib/content";

export default function Navbar() {
    return (
        <header
            style={{
                position: "sticky",
                top: 0,
                zIndex: 30,
                background: "color-mix(in srgb, var(--color-bg) 92%, transparent)",
                backdropFilter: "blur(8px)",
                borderBottom: "1px solid var(--color-divider)",
            }}
        >
            <div
                className="wrap"
                style={{
                    height: 84,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 24,
                }}
            >
                <Link
                    href="/"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                        color: "var(--color-text)",
                    }}
                >
                    <Image
                        src="/logo-mark.png"
                        alt=""
                        width={42}
                        height={42}
                        style={{ height: 42, width: "auto", display: "block" }}
                    />
                    <span
                        style={{
                            fontFamily: "var(--font-heading)",
                            fontSize: 21,
                            letterSpacing: "-0.015em",
                        }}
                    >
                        {SITE.brandName}
                    </span>
                </Link>

                {/* Desktop nav */}
                <nav className="nav-desktop" style={{ alignItems: "center", gap: 6 }}>
                    {NAV_ITEMS.map((item) => (
                        <NavLink key={item.slug} href={`/${item.slug}`} title={item.title} />
                    ))}
                </nav>

                {/* Mobile menu */}
                <NavbarClient navItems={NAV_ITEMS} />
            </div>
        </header>
    );
}
