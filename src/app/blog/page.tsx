import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/content";
import { getAllPosts } from "@/lib/posts";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
    title: `${SITE.nav.blog} · ${SITE.brandName}`,
    description: SITE.blog.pageSubtitle,
};

export default function Blog() {
    const posts = getAllPosts();

    return (
        <>
            <section style={{ position: "relative", overflow: "hidden" }}>
                <div
                    className="blob"
                    style={{
                        top: -150,
                        right: -90,
                        width: 400,
                        height: 400,
                        background: "var(--color-accent-300)",
                    }}
                />
                <div
                    className="blob"
                    style={{
                        top: 200,
                        right: 120,
                        width: 84,
                        height: 84,
                        background: "var(--brand-blue)",
                    }}
                />
                <div
                    className="wrap"
                    style={{ position: "relative", paddingTop: 96, paddingBottom: 56 }}
                >
                    <p className="eyebrow">{SITE.blog.eyebrow}</p>
                    <h1 className="display-sm" style={{ maxWidth: "16ch" }}>
                        {SITE.blog.pageTitle}
                    </h1>
                    <p className="lede">{SITE.blog.pageSubtitle}</p>
                </div>
            </section>

            <section className="wrap" style={{ paddingTop: 40, paddingBottom: 112 }}>
                {posts.length > 0 ? (
                    <div className="grid-posts rule" style={{ paddingTop: 56 }}>
                        {posts.map((post) => (
                            <Link key={post.slug} href={`/blog/${post.slug}`} className="pcard">
                                <div className="shot washed">
                                    {post.image ? (
                                        <Image
                                            src={post.image}
                                            alt=""
                                            fill
                                            sizes="(max-width: 620px) 90vw, (max-width: 900px) 45vw, 340px"
                                            style={{ objectFit: "cover" }}
                                        />
                                    ) : (
                                        <span
                                            aria-hidden="true"
                                            style={{
                                                width: 92,
                                                height: 92,
                                                borderRadius: "50%",
                                                background: "var(--color-accent-200)",
                                            }}
                                        />
                                    )}
                                </div>
                                <p
                                    style={{
                                        margin: "var(--space-4) 0 var(--space-2)",
                                        fontSize: 12.5,
                                        letterSpacing: "0.14em",
                                        textTransform: "uppercase",
                                        color: "var(--color-neutral-600)",
                                    }}
                                >
                                    {formatDate(post.date)}
                                </p>
                                <h3
                                    style={{
                                        fontFamily: "var(--font-heading)",
                                        fontSize: 23,
                                        lineHeight: 1.25,
                                        margin: 0,
                                        color: "var(--color-text)",
                                    }}
                                >
                                    {post.title}
                                </h3>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="rule" style={{ paddingTop: 56 }}>
                        <h2
                            style={{
                                fontFamily: "var(--font-heading)",
                                fontSize: 26,
                                margin: "0 0 var(--space-2)",
                                color: "var(--color-neutral-700)",
                            }}
                        >
                            {SITE.blog.emptyTitle}
                        </h2>
                        <p style={{ margin: 0, color: "var(--color-neutral-600)" }}>
                            {SITE.blog.emptyText}
                        </p>
                    </div>
                )}
            </section>
        </>
    );
}
