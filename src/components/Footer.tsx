import Link from "next/link";
import Image from "next/image";
import { SITE, NAV_ITEMS } from "@/lib/content";

const labelStyle = {
    margin: "0 0 var(--space-3)",
    fontSize: 12.5,
    letterSpacing: "0.14em",
    textTransform: "uppercase" as const,
    color: "var(--color-neutral-600)",
};

export default function Footer() {
    const links = [{ title: SITE.nav.home, slug: "" }, ...NAV_ITEMS];

    return (
        <footer className="section-quiet">
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
                            src="/logo.png"
                            alt=""
                            width={34}
                            height={34}
                            style={{ objectFit: "contain" }}
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
                            color: "var(--color-neutral-700)",
                            maxWidth: "38ch",
                        }}
                    >
                        {SITE.footer.text}
                    </p>
                </div>

                <div>
                    <p style={labelStyle}>{SITE.footer.pagesTitle}</p>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 10,
                            alignItems: "flex-start",
                        }}
                    >
                        {links.map((link) => (
                            <Link
                                key={link.slug}
                                href={`/${link.slug}`}
                                style={{ fontSize: 16, color: "var(--color-neutral-800)" }}
                            >
                                {link.title}
                            </Link>
                        ))}
                    </div>
                </div>

                <div>
                    <p style={labelStyle}>{SITE.footer.contactTitle}</p>
                    <p
                        style={{
                            margin: "0 0 var(--space-2)",
                            fontSize: 16,
                            lineHeight: 1.6,
                            color: "var(--color-neutral-800)",
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
                    className="rule"
                    style={{
                        paddingTop: 24,
                        display: "flex",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: 24,
                        fontSize: 13,
                        color: "var(--color-neutral-600)",
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
