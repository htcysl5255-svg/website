/**
 * Reads blog posts from the /posts folder at build time.
 *
 * You should not need to edit this file. To write a post, add a new
 * .md file to the /posts folder — see posts/_template.md.
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import { SITE } from "./content";

const POSTS_DIR = path.join(process.cwd(), "posts");

export type Post = {
    /** URL of the post: /blog/<slug>. Comes from the filename. */
    slug: string;
    title: string;
    /** ISO date, e.g. "2026-08-09". Controls ordering. */
    date: string;
    author: string;
    /** Optional cover image, e.g. "/photo.png". */
    image?: string;
    /** Rendered HTML of the post body. */
    html: string;
};

/** Normalises whatever YAML gave us for `date` into "YYYY-MM-DD". */
function toIsoDate(value: unknown): string {
    if (value instanceof Date) return value.toISOString().slice(0, 10);
    if (typeof value === "string" && value.trim()) return value.trim();
    return "";
}

function readPost(filename: string): Post | null {
    const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf8");
    const { data, content } = matter(raw);

    // Posts marked `draft: true` are ignored entirely.
    if (data.draft === true) return null;

    const slug = filename.replace(/\.md$/, "");

    if (!data.title) {
        throw new Error(
            `posts/${filename} is missing a "title:" line in its frontmatter.`
        );
    }

    return {
        slug,
        title: String(data.title),
        date: toIsoDate(data.date),
        author: data.author ? String(data.author) : SITE.author,
        image: data.image ? String(data.image) : undefined,
        html: marked.parse(content, { async: false }) as string,
    };
}

/** All published posts, newest first. */
export function getAllPosts(): Post[] {
    if (!fs.existsSync(POSTS_DIR)) return [];

    return fs
        .readdirSync(POSTS_DIR)
        .filter((name) => name.endsWith(".md") && !name.startsWith("_"))
        .map(readPost)
        .filter((post): post is Post => post !== null)
        .sort((a, b) => b.date.localeCompare(a.date));
}

/** A single post by slug, or undefined if it does not exist. */
export function getPost(slug: string): Post | undefined {
    return getAllPosts().find((post) => post.slug === slug);
}
