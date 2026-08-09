"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/** A nav pill that marks itself as the current page. */
export default function NavLink({ href, title }: { href: string; title: string }) {
    const pathname = usePathname() ?? "";
    const current = pathname === href || pathname.startsWith(`${href}/`);

    return (
        <Link href={href} className="nv" aria-current={current ? "page" : undefined}>
            {title}
        </Link>
    );
}
