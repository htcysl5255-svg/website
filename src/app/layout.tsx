import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/content";

// Fonts (Baloo 2 + Figtree) are loaded at the top of organic.css.

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  // Sub-pages give only their own name; the brand is appended here.
  title: {
    default: SITE.title,
    template: `%s · ${SITE.brandName}`,
  },
  description: SITE.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: SITE.brandName,
    title: SITE.title,
    description: SITE.description,
    url: "/",
    images: [{ url: SITE.shareImage, width: 1200, height: 630, alt: SITE.brandName }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    images: [SITE.shareImage],
  },
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Navbar />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
