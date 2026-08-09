import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/content";
import { getAllPosts, getPost } from "@/lib/posts";
import { formatDate } from "@/lib/format";

// Only the posts in /posts exist; anything else is a 404.
export const dynamicParams = false;

/**
 * A static export refuses to build a dynamic route that generates zero pages.
 * While there are no posts yet we emit this single placeholder so the build
 * succeeds; it is hidden from search engines and disappears on its own the
 * moment a real post exists.
 */
const NO_POSTS_SLUG = "__no-posts";

export function generateStaticParams() {
    const posts = getAllPosts();

    if (posts.length === 0) return [{ slug: NO_POSTS_SLUG }];

    return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const post = getPost(slug);

    // The build-time placeholder: keep it out of search results.
    if (!post) return { robots: { index: false, follow: false } };

    return { title: `${post.title} · ${SITE.brandName}` };
}

export default async function BlogPost({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const post = getPost(slug);

    // Because dynamicParams is false, the only page that reaches this branch is
    // the placeholder generated while /posts has no published posts. Real
    // unknown URLs never get a file, so the host serves its own 404.
    if (!post) {
        return (
            <section className="wrap" style={{ paddingTop: 96, paddingBottom: 112 }}>
                <p className="eyebrow">{SITE.blog.eyebrow}</p>
                <h1 className="display-sm">{SITE.blog.emptyTitle}</h1>
                <p className="lede">{SITE.blog.emptyText}</p>
                <p style={{ marginTop: "var(--space-8)" }}>
                    <Link href="/blog">← {SITE.blog.backLabel}</Link>
                </p>
            </section>
        );
    }

    return (
        <article className="wrap" style={{ paddingTop: 56, paddingBottom: 112 }}>
            <Link
                href="/blog"
                style={{
                    display: "inline-block",
                    fontSize: 15,
                    marginBottom: "var(--space-8)",
                }}
            >
                ← {SITE.blog.backLabel}
            </Link>

            <p
                style={{
                    margin: "0 0 var(--space-4)",
                    fontSize: 12.5,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--color-neutral-600)",
                }}
            >
                {formatDate(post.date)} · {post.author}
            </p>

            <h1
                className="display-sm"
                style={{ maxWidth: "20ch", marginBottom: "var(--space-8)" }}
            >
                {post.title}
            </h1>

            {post.image && (
                <div
                    className="washed"
                    style={{
                        position: "relative",
                        borderRadius: "var(--radius-lg)",
                        overflow: "hidden",
                        height: 360,
                        background: "var(--color-surface)",
                        marginBottom: "var(--space-8)",
                    }}
                >
                    <Image
                        src={post.image}
                        alt=""
                        fill
                        sizes="(max-width: 1120px) 100vw, 1040px"
                        style={{ objectFit: "cover" }}
                        priority
                    />
                </div>
            )}

            <div
                className="prose"
                dangerouslySetInnerHTML={{ __html: post.html }}
            />
        </article>
    );
}
