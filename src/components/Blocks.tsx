import Image from "next/image";
import { Award, Compass, FileText, Handshake, Hourglass, Target } from "lucide-react";
import { SITE, WHATSAPP_URL, type AudienceIcon, type Block } from "@/lib/content";

const AUDIENCE_ICONS: Record<AudienceIcon, typeof Target> = {
    target: Target,
    compass: Compass,
    hourglass: Hourglass,
    handshake: Handshake,
};

/** WhatsApp logo (Simple Icons, CC0). Takes the button's text color. */
function WhatsAppLogo({ size = 20 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
    );
}

function WhatsAppButton() {
    return (
        <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-cta"
        >
            <WhatsAppLogo size={20} />
            {SITE.cta.label}
        </a>
    );
}

/** Shared look for section headings (steps, values, audience). */
const sectionTitleStyle = {
    fontFamily: "var(--font-heading)",
    fontSize: "clamp(30px, 4.4vw, 38px)",
    margin: "0 0 var(--space-8)",
    color: "var(--color-text)",
    maxWidth: "20ch",
    lineHeight: 1.15,
} as const;

/**
 * Renders the content blocks defined in src/lib/content.ts.
 * Shared by the home page and every page under /<slug>.
 */
export default function Blocks({ blocks }: { blocks: Block[] }) {
    return (
        <>
            {blocks.map((block, i) => (
                <BlockView key={i} block={block} first={i === 0} />
            ))}
        </>
    );
}

function BlockView({ block, first }: { block: Block; first: boolean }) {
    switch (block.type) {
        case "hero":
            return <Hero block={block} />;
        case "features":
            return <Features block={block} first={first} />;
        case "steps":
            return <Steps block={block} />;
        case "audience":
            return <Audience block={block} />;
        case "credentials":
            return <Credentials block={block} />;
        case "certificates":
            return <Certificates block={block} />;
        case "cta":
            return <Cta block={block} />;
        case "quote":
            return <Quote block={block} />;
        case "contacts":
            return <Contacts block={block} />;
        case "text":
            return <Text block={block} />;
    }
}

/* ─── Hero ─────────────────────────────────────────────────── */

function Hero({ block }: { block: Extract<Block, { type: "hero" }> }) {
    const small = block.imageSize === "small";

    return (
        <section style={{ position: "relative", overflow: "hidden" }}>
            {/* A single soft accent disc bleeding off the top-right corner. */}
            <div
                className="blob"
                style={{
                    top: small ? -170 : -140,
                    right: small ? -120 : -120,
                    width: small ? 420 : 520,
                    height: small ? 420 : 520,
                    background: "var(--color-accent-300)",
                }}
            />

            <div
                className={`wrap ${small ? "grid-hero-compact" : "grid-hero"}`}
                style={{
                    position: "relative",
                    paddingTop: small ? 96 : "var(--hero-pad-top, 104px)",
                    paddingBottom: small ? 56 : 88,
                }}
            >
                <div>
                    {block.eyebrow && <p className="eyebrow">{block.eyebrow}</p>}
                    <h1 className={small ? "display-sm" : "display"}>{block.title}</h1>
                    {block.subtitle && <p className="lede">{block.subtitle}</p>}
                    {block.cta && <WhatsAppButton />}
                </div>

                {block.image && (
                    <figure
                        className="hero-figure portrait"
                        style={{ width: small ? 200 : "100%" }}
                    >
                        {/* The large portrait gets discs layered behind it. */}
                        {!small && (
                            <>
                                <div className="portrait-disc" />
                                <div className="portrait-dot" />
                            </>
                        )}
                        <div
                            className="washed portrait-photo"
                            style={{
                                boxShadow: small ? "var(--shadow-sm)" : "var(--shadow-md)",
                            }}
                        >
                            <Image
                                src={block.image}
                                alt=""
                                fill
                                sizes={small ? "200px" : "(max-width: 900px) 90vw, 420px"}
                                style={{ objectFit: "cover" }}
                                priority
                            />
                        </div>
                    </figure>
                )}
            </div>
        </section>
    );
}

/* ─── Features ─────────────────────────────────────────────── */

function Features({
    block,
    first,
}: {
    block: Extract<Block, { type: "features" }>;
    first: boolean;
}) {
    if (block.items.length === 0) return null;

    return (
        <section
            className="wrap"
            style={{ paddingTop: first || block.title ? 96 : 24, paddingBottom: 96 }}
        >
            {block.title && <h2 style={sectionTitleStyle}>{block.title}</h2>}
            <div className="grid-3 rule" style={{ paddingTop: 56 }}>
                {block.items.map((item, i) => (
                    <div key={i}>
                        <h2
                            style={{
                                fontFamily: "var(--font-heading)",
                                fontSize: 25,
                                margin: "0 0 var(--space-3)",
                                color: "var(--color-accent-800)",
                            }}
                        >
                            {item.title}
                        </h2>
                        <p
                            style={{
                                margin: 0,
                                fontSize: 16.5,
                                lineHeight: 1.75,
                                color: "var(--color-neutral-700)",
                            }}
                        >
                            {item.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}

/* ─── Steps ────────────────────────────────────────────────── */

function Steps({ block }: { block: Extract<Block, { type: "steps" }> }) {
    if (block.items.length === 0) return null;

    return (
        <section className="section-quiet">
            <div className="wrap" style={{ paddingTop: 96, paddingBottom: 96 }}>
                {block.title && <h2 style={sectionTitleStyle}>{block.title}</h2>}
                <ol className="grid-steps">
                    {block.items.map((item, i) => (
                        <li
                            key={i}
                            style={{ display: "flex", gap: 24, alignItems: "flex-start" }}
                        >
                            <span
                                style={{
                                    flex: "none",
                                    width: 56,
                                    height: 56,
                                    borderRadius: "50%",
                                    background:
                                        i % 2 === 0
                                            ? "var(--color-accent)"
                                            : "var(--brand-blue)",
                                    color: "var(--color-bg)",
                                    fontFamily: "var(--font-heading)",
                                    fontSize: 20,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                {String(i + 1).padStart(2, "0")}
                            </span>
                            <div>
                                <h3
                                    style={{
                                        fontFamily: "var(--font-heading)",
                                        fontSize: 23,
                                        margin: "8px 0 var(--space-2)",
                                    }}
                                >
                                    {item.title}
                                    {item.meta && (
                                        <span className="step-meta">{item.meta}</span>
                                    )}
                                </h3>
                                <p
                                    style={{
                                        margin: 0,
                                        fontSize: 16.5,
                                        lineHeight: 1.75,
                                        color: "var(--color-neutral-700)",
                                    }}
                                >
                                    {item.description}
                                </p>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}

/* ─── Audience ("Kimler İçin?") ───────────────────────────── */

function Audience({ block }: { block: Extract<Block, { type: "audience" }> }) {
    if (block.items.length === 0) return null;

    return (
        <section className="wrap" style={{ paddingTop: 96, paddingBottom: 24 }}>
            {block.title && <h2 style={sectionTitleStyle}>{block.title}</h2>}
            <ul className="grid-audience">
                {block.items.map((item, i) => {
                    const Icon = AUDIENCE_ICONS[item.icon];
                    return (
                        <li key={i} className="audience-card">
                            <span className="audience-icon">
                                <Icon size={26} strokeWidth={1.75} aria-hidden />
                            </span>
                            <h3
                                style={{
                                    fontFamily: "var(--font-heading)",
                                    fontSize: 22,
                                    lineHeight: 1.2,
                                    margin: "var(--space-4) 0 var(--space-1)",
                                }}
                            >
                                {item.title}
                            </h3>
                            <p
                                style={{
                                    margin: "0 0 var(--space-3)",
                                    fontFamily: "var(--font-heading)",
                                    fontSize: 17,
                                    color: "var(--color-accent-700)",
                                }}
                            >
                                {item.slogan}
                            </p>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 15.5,
                                    lineHeight: 1.7,
                                    color: "var(--color-neutral-700)",
                                }}
                            >
                                {item.description}
                            </p>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}

/* ─── Credentials strip (home) ─────────────────────────────── */

function Credentials({ block }: { block: Extract<Block, { type: "credentials" }> }) {
    return (
        <section className="wrap" style={{ paddingTop: 8, paddingBottom: 8 }}>
            <div className="cred-strip">
                <div className="cred-stats">
                    {block.stats.map((s, i) => (
                        <div key={i}>
                            <div className="cred-big">{s.value}</div>
                            <div className="cred-small">{s.label}</div>
                        </div>
                    ))}
                </div>
                <div className="cred-chips">
                    {block.tags.map((t) => (
                        <span key={t} className="cred-chip">
                            {t}
                        </span>
                    ))}
                    {block.href && block.linkLabel && (
                        <a href={block.href} className="cred-link">
                            {block.linkLabel}
                        </a>
                    )}
                </div>
            </div>
        </section>
    );
}

/* ─── Certificates (about page) ─────────────────────────────── */

function Certificates({ block }: { block: Extract<Block, { type: "certificates" }> }) {
    if (block.items.length === 0) return null;

    return (
        <section id="sertifikalar" className="wrap" style={{ paddingTop: 0, paddingBottom: 72 }}>
            {block.title && <h2 style={sectionTitleStyle}>{block.title}</h2>}
            <ul className="cert-grid">
                {block.items.map((c, i) => (
                    <li key={i} className="cert-card">
                        <span className="audience-icon cert-icon">
                            <Award size={22} strokeWidth={1.75} aria-hidden />
                        </span>
                        <div style={{ flex: 1 }}>
                            <h3 className="cert-name">
                                {c.name}
                                {c.badge && <span className="step-meta">{c.badge}</span>}
                            </h3>
                            <p className="cert-org">
                                {c.org} · {c.date}
                            </p>
                            {c.file && (
                                <a
                                    href={`/sertifikalar/${c.file}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="cert-link"
                                >
                                    <FileText size={15} aria-hidden />
                                    {SITE.certificates.linkLabel}
                                </a>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}

/* ─── Call to action ─────────────────────────────────────── */

function Cta({ block }: { block: Extract<Block, { type: "cta" }> }) {
    return (
        <section className="wrap" style={{ paddingTop: 0, paddingBottom: 112 }}>
            <div className="cta-box">
                {block.text && <p className="cta-text">{block.text}</p>}
                <WhatsAppButton />
            </div>
        </section>
    );
}

/* ─── Quote ────────────────────────────────────────────────── */

function Quote({ block }: { block: Extract<Block, { type: "quote" }> }) {
    return (
        <section className="band-dark">
            <div
                className="blob"
                style={{
                    top: -90,
                    right: -60,
                    width: 340,
                    height: 340,
                    background: "var(--color-accent)",
                    opacity: 0.85,
                }}
            />
            <div
                className="wrap"
                style={{ position: "relative", paddingTop: 104, paddingBottom: 104 }}
            >
                <blockquote
                    style={{
                        margin: 0,
                        fontFamily: "var(--font-heading)",
                        fontSize: "clamp(30px, 5vw, 44px)",
                        lineHeight: 1.22,
                        color: "var(--color-bg)",
                        maxWidth: "22ch",
                    }}
                >
                    {block.text}
                </blockquote>
                {block.cite && (
                    <p
                        style={{
                            margin: "var(--space-6) 0 0",
                            fontSize: 13,
                            letterSpacing: "0.14em",
                            textTransform: "uppercase",
                            color: "var(--color-accent-300)",
                        }}
                    >
                        {block.cite}
                    </p>
                )}
            </div>
        </section>
    );
}

/* ─── Contacts ─────────────────────────────────────────────── */

function Contacts({ block }: { block: Extract<Block, { type: "contacts" }> }) {
    if (block.items.length === 0) return null;

    return (
        <section className="wrap" style={{ paddingTop: 40, paddingBottom: 120 }}>
            <div className="grid-2 rule" style={{ paddingTop: 56 }}>
                {block.items.map((item, i) => (
                    <div key={i}>
                        <p className="eyebrow-quiet">{item.label}</p>
                        <p
                            style={{
                                margin: 0,
                                fontFamily: "var(--font-heading)",
                                fontSize: 26,
                                lineHeight: 1.4,
                                color: "var(--color-text)",
                            }}
                        >
                            {item.value}
                        </p>
                        {item.note && (
                            <p
                                style={{
                                    margin: "var(--space-2) 0 0",
                                    fontSize: 17,
                                    color: "var(--color-neutral-700)",
                                }}
                            >
                                {item.note}
                            </p>
                        )}
                        {item.href && item.linkLabel && (
                            <a
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: "inline-block",
                                    marginTop: "var(--space-4)",
                                    fontSize: 16,
                                    borderBottom: "1px solid var(--color-accent-300)",
                                    paddingBottom: 2,
                                }}
                            >
                                {item.linkLabel}
                            </a>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}

/* ─── Text ─────────────────────────────────────────────────── */

function Text({ block }: { block: Extract<Block, { type: "text" }> }) {
    return (
        <section className="wrap" style={{ paddingTop: 40, paddingBottom: 112 }}>
            <div
                className="prose rule"
                style={{ paddingTop: 56 }}
                dangerouslySetInnerHTML={{ __html: block.content }}
            />
        </section>
    );
}
