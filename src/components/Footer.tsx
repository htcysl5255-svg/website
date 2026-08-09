import Link from "next/link";
import Image from "next/image";
import { SITE, NAV_ITEMS } from "@/lib/content";

export default function Footer() {
    const links = [{ title: SITE.nav.home, slug: "" }, ...NAV_ITEMS];

    return (
        <footer className="site-footer band-dark">
            <div
                className="wrap grid-footer"
                style={{ paddingTop: 72, paddingBottom: 40 }}
            >
                <div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            marginBottom: "var(--space-4)",
                        }}
                    >
                        <Image
                            src="/logo-mark.png"
                            alt=""
                            width={36}
                            height={36}
                            style={{ height: 36, width: "auto", display: "block" }}
                        />
                        <span style={{ fontFamily: "var(--font-heading)", fontSize: 19 }}>
                            {SITE.brandName}
                        </span>
                    </div>
                    <p
                        style={{
                            margin: 0,
                            fontSize: 16,
                            lineHeight: 1.7,
                            color: "var(--on-dark-muted)",
                            maxWidth: "38ch",
                        }}
                    >
                        {SITE.footer.text}
                    </p>
                </div>

                <div>
                    <p className="footer-label">{SITE.footer.pagesTitle}</p>
                    <div
                        className="footer-nav"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 10,
                            alignItems: "flex-start",
                        }}
                    >
                        {links.map((link) => (
                            <Link key={link.slug} href={`/${link.slug}`} style={{ fontSize: 16 }}>
                                {link.title}
                            </Link>
                        ))}
                    </div>
                </div>

                <div>
                    <p className="footer-label">{SITE.footer.contactTitle}</p>
                    <p
                        style={{
                            margin: "0 0 var(--space-2)",
                            fontSize: 16,
                            lineHeight: 1.6,
                            color: "var(--on-dark)",
                        }}
                    >
                        {SITE.contact.address}
                        <br />
                        {SITE.contact.city}
                    </p>
                    <a
                        href={`https://www.instagram.com/${SITE.contact.instagram.replace("@", "")}/`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontSize: 16 }}
                    >
                        {SITE.contact.instagram}
                    </a>
                </div>
            </div>

            <div className="wrap" style={{ paddingBottom: 48 }}>
                <div
                    style={{
                        borderTop: "1px solid var(--on-dark-rule)",
                        paddingTop: 24,
                        display: "flex",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: 24,
                        fontSize: 13,
                        color: "var(--color-accent-300)",
                    }}
                >
                    <span>
                        © {new Date().getFullYear()} {SITE.brandName}
                    </span>
                    <span>{SITE.footer.location}</span>
                </div>
            </div>
        </footer>
    );
}
