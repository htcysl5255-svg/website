import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Blocks from "@/components/Blocks";
import { PAGES, SITE } from "@/lib/content";

export function generateStaticParams() {
    return PAGES.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const page = PAGES.find((p) => p.slug === slug);

    if (!page) return {};

    return { title: `${page.title} · ${SITE.brandName}` };
}

export default async function DynamicPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const page = PAGES.find((p) => p.slug === slug);

    if (!page) {
        notFound();
    }

    return <Blocks blocks={page.content} />;
}
