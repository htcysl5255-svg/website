import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NavigationWrapper from "@/components/NavigationWrapper";
import { createClient } from "@/lib/supabase/server";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const supabase = await createClient();
  let settings: any[] | null = null;

  if (supabase) {
    const { data } = await supabase.from("site_settings").select("*");
    settings = data;
  }

  const getSetting = (key: string) => settings?.find(s => s.key === key)?.value;

  return {
    title: getSetting('site_title') || "Yöneylem Koçluk",
    description: getSetting('site_description') || "Bireysel ve kurumsal koçluk hizmetleri ile potansiyelinizi keşfedin.",
    icons: {
      icon: '/logo.png',
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50 text-slate-900`}
      >
        <NavigationWrapper>
          <Navbar />
        </NavigationWrapper>
        <main className="min-h-screen">
          {children}
        </main>
        <NavigationWrapper>
          <Footer />
        </NavigationWrapper>
      </body>
    </html>
  );
}
