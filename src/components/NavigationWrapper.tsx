"use client";

import { usePathname } from "next/navigation";

export default function NavigationWrapper({
    children,
    hideOnPaths = [],
}: {
    children: React.ReactNode;
    hideOnPaths?: string[];
}) {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith("/admin");
    const isHiddenPath = hideOnPaths.includes(pathname || "");

    if (isAdmin || isHiddenPath) return null;

    return <>{children}</>;
}
