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

    const path = `/${page.slug}/`;
    const description = page.description ?? SITE.description;

    return {
        title: page.title,
        description,
        alternates: { canonical: path },
        openGraph: {
            title: `${page.title} · ${SITE.brandName}`,
            description,
            url: path,
            type: "website",
            locale: "tr_TR",
            siteName: SITE.brandName,
            images: [{ url: SITE.shareImage, width: 1200, height: 630 }],
        },
    };
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
