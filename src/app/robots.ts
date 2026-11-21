import type { MetadataRoute } from "next";
import { SITE } from "@/lib/content";

// Built once into /robots.txt: lets every search engine in and points it at the sitemap.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: { userAgent: "*", allow: "/" },
        sitemap: new URL("/sitemap.xml", SITE.url).toString(),
    };
}
