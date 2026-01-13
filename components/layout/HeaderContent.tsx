"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, Zap } from "lucide-react";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

interface HeaderContentProps {
  phone: string;
  businessName: string;
  tagline: string;
  logoUrl: string;
}

const navigation = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function HeaderContent({ phone, businessName, tagline, logoUrl }: HeaderContentProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-charcoal/95 backdrop-blur-md border-b border-charcoal-800">
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              {logoUrl ? (
                <div className="w-10 h-10 rounded-lg overflow-hidden">
                  <Image 
                    src={logoUrl} 
                    alt={businessName}
                    width={40}
                    height={40}
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <div className="w-10 h-10 bg-electric rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform">
                  <Zap className="w-6 h-6 text-charcoal" />
                </div>
              )}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent-orange rounded-full animate-pulse" />
            </div>
            <div className="hidden sm:block">
              <span className="font-heading text-xl font-bold text-white">
                {businessName}
              </span>
              <span className="block text-xs text-charcoal-400 -mt-1">
                {tagline}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-charcoal-300 hover:text-white font-medium transition-colors link-underline"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/quote">
              <Button size="sm">Schedule Consultation</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 text-charcoal-300 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Toggle menu</span>
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300",
            mobileMenuOpen ? "max-h-96 pb-6" : "max-h-0"
          )}
        >
          <div className="flex flex-col gap-4 pt-4 border-t border-charcoal-800">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-charcoal-300 hover:text-white font-medium py-2 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link href="/quote" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full">Schedule Consultation</Button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
