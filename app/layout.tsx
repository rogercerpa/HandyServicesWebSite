import type { Metadata } from "next";
import { Instrument_Sans, DM_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Analytics } from "@/components/Analytics";
import { ThemeProvider } from "@/components/ThemeProvider";
import { getSEOSettings, getBrandingSettings, getThemeSettings } from "@/lib/data/settings-db";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const [seo, branding] = await Promise.all([
    getSEOSettings(),
    getBrandingSettings(),
  ]);

  const keywords = seo.meta_keywords
    ? seo.meta_keywords.split(",").map((k) => k.trim())
    : ["handyman", "electrician", "ceiling fan installation", "light fixture", "electrical services", "home repair"];

  return {
    title: seo.meta_title,
    description: seo.meta_description,
    keywords,
    icons: branding.favicon_url ? { icon: branding.favicon_url } : undefined,
    openGraph: {
      title: seo.meta_title,
      description: seo.meta_description,
      type: "website",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = await getThemeSettings();
  
  return (
    <html lang="en" className={`${instrumentSans.variable} ${dmSans.variable}`}>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider primaryColor={theme.primary_color} accentColor={theme.accent_color}>
          <Analytics />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
