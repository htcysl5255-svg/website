import Image from "next/image";
import type { Block } from "@/lib/content";

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
    const decor = block.decor ?? "right";

    return (
        <section style={{ position: "relative", overflow: "hidden" }}>
            {/* Soft decorative circles */}
            {decor === "right" && (
                <>
                    <div
                        className="blob"
                        style={{
                            top: -140,
                            right: -120,
                            width: 520,
                            height: 520,
                            background: "var(--brand-green-soft)",
                            opacity: 0.55,
                        }}
                    />
                    <div
                        className="blob"
                        style={{
                            top: 230,
                            right: 280,
                            width: 150,
                            height: 150,
                            background: "var(--color-accent-200)",
                            opacity: 0.7,
                        }}
                    />
                </>
            )}
            {decor === "left" && (
                <div
                    className="blob"
                    style={{
                        top: -180,
                        left: -140,
                        width: 460,
                        height: 460,
                        background: "var(--color-accent-200)",
                        opacity: 0.6,
                    }}
                />
            )}
            {decor === "bottom" && (
                <div
                    className="blob"
                    style={{
                        bottom: -160,
                        right: -100,
                        width: 420,
                        height: 420,
                        background: "var(--brand-green-soft)",
                        opacity: 0.55,
                    }}
                />
            )}

            <div
                className={`wrap ${small ? "grid-hero-compact" : "grid-hero"}`}
                style={{
                    position: "relative",
                    paddingTop: small ? 96 : 104,
                    paddingBottom: small ? 56 : 88,
                }}
            >
                <div>
                    {block.eyebrow && <p className="eyebrow">{block.eyebrow}</p>}
                    <h1 className={small ? "display-sm" : "display"}>{block.title}</h1>
                    {block.subtitle && <p className="lede">{block.subtitle}</p>}
                </div>

                {block.image && (
                    <figure
                        className="hero-figure"
                        style={{
                            position: "relative",
                            margin: 0,
                            width: small ? 200 : "100%",
                        }}
                    >
                        <div
                            className="washed"
                            style={{
                                width: "100%",
                                aspectRatio: "1 / 1",
                                borderRadius: "50%",
                                overflow: "hidden",
                                background: "var(--color-surface)",
                                boxShadow: small ? "var(--shadow-sm)" : "var(--shadow-md)",
                                position: "relative",
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
            style={{ paddingTop: first ? 96 : 24, paddingBottom: 96 }}
        >
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
                {block.title && (
                    <h2
                        style={{
                            fontFamily: "var(--font-heading)",
                            fontSize: "clamp(30px, 4.4vw, 38px)",
                            margin: "0 0 var(--space-8)",
                            color: "var(--color-text)",
                            maxWidth: "20ch",
                            lineHeight: 1.15,
                        }}
                    >
                        {block.title}
                    </h2>
                )}
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
                                            : "var(--brand-green)",
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

/* ─── Quote ────────────────────────────────────────────────── */

function Quote({ block }: { block: Extract<Block, { type: "quote" }> }) {
    return (
        <section className="wrap" style={{ paddingTop: 96, paddingBottom: 96 }}>
            <blockquote
                style={{
                    margin: 0,
                    fontFamily: "var(--font-heading)",
                    fontSize: "clamp(28px, 4.6vw, 40px)",
                    lineHeight: 1.25,
                    color: "var(--color-accent-800)",
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
                        color: "var(--color-neutral-600)",
                    }}
                >
                    {block.cite}
                </p>
            )}
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
