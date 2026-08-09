import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { SITE } from "@/lib/content";
import { getAllPosts, getPost } from "@/lib/posts";
import { formatDate } from "@/lib/format";

export function generateStaticParams() {
    return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const post = getPost(slug);

    if (!post) return {};

    return { title: `${post.title} · ${SITE.brandName}` };
}

export default async function BlogPost({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const post = getPost(slug);

    if (!post) notFound();

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
