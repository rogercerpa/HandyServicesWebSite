import type { Metadata } from "next";
import { Instrument_Sans, DM_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

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

export const metadata: Metadata = {
  title: "Fix it, papa! | Professional Handyman Services",
  description:
    "Expert electrical and handyman services including ceiling fan installation, light fixtures, switches, power receptacles, and smart home setup. Licensed, reliable, and affordable.",
  keywords: [
    "handyman",
    "electrician",
    "ceiling fan installation",
    "light fixture",
    "electrical services",
    "home repair",
  ],
  openGraph: {
    title: "Fix it, papa! | Professional Handyman Services",
    description:
      "Expert electrical and handyman services. Licensed, reliable, and affordable.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${instrumentSans.variable} ${dmSans.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

