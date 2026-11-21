import type { MetadataRoute } from "next";
import { PAGES, SITE } from "@/lib/content";
import { getAllPosts } from "@/lib/posts";

// Built once into /sitemap.xml; tells Google which pages exist.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
    const url = (path: string) => new URL(path, SITE.url).toString();

    return [
        { url: url("/"), changeFrequency: "monthly", priority: 1 },
        ...PAGES.map((page) => ({
            url: url(`/${page.slug}/`),
            changeFrequency: "monthly" as const,
            priority: 0.8,
        })),
        { url: url("/blog/"), changeFrequency: "weekly", priority: 0.6 },
        ...getAllPosts().map((post) => ({
            url: url(`/blog/${post.slug}/`),
            lastModified: post.date || undefined,
            priority: 0.5,
        })),
    ];
}
