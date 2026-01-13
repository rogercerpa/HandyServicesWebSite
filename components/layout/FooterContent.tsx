"use client";

import Link from "next/link";
import Image from "next/image";
import { Zap, MapPin, Clock, Facebook, Instagram } from "lucide-react";
import { type Service } from "@/lib/data/services";

interface FooterContentProps {
  settings: {
    phone: string;
    email: string;
    service_area: string;
    hours_weekday: string;
    hours_saturday: string;
    facebook_url: string;
    instagram_url: string;
  };
  branding: {
    business_name: string;
    tagline: string;
    description: string;
    logo_url: string;
  };
  services: Service[];
}

const company = [
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Schedule Consultation", href: "/quote" },
  { name: "Contact Us", href: "/contact" },
];

export function FooterContent({ settings, branding, services }: FooterContentProps) {
  // Show first 4 active services, then "View All Services"
  const displayedServices = services.slice(0, 4);
  return (
    <footer className="bg-charcoal-950 border-t border-charcoal-800">
      {/* Main Footer */}
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              {branding.logo_url ? (
                <div className="w-10 h-10 rounded-lg overflow-hidden">
                  <Image 
                    src={branding.logo_url} 
                    alt={branding.business_name}
                    width={40}
                    height={40}
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <div className="w-10 h-10 bg-electric rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-charcoal" />
                </div>
              )}
              <div>
                <span className="font-heading text-xl font-bold text-white">
                  {branding.business_name}
                </span>
                <span className="block text-xs text-charcoal-400 -mt-1">
                  {branding.tagline}
                </span>
              </div>
            </Link>
            <p className="text-charcoal-400 text-sm leading-relaxed mb-6">
              {branding.description || "Professional electrical and handyman services you can trust. Licensed, reliable, and committed to quality workmanship."}
            </p>
            <div className="flex gap-4">
              {settings.facebook_url && (
                <a
                  href={settings.facebook_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-charcoal-800 rounded-lg flex items-center justify-center text-charcoal-400 hover:bg-electric hover:text-charcoal transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {settings.instagram_url && (
                <a
                  href={settings.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-charcoal-800 rounded-lg flex items-center justify-center text-charcoal-400 hover:bg-electric hover:text-charcoal transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {!settings.facebook_url && !settings.instagram_url && (
                <>
                  <a
                    href="#"
                    className="w-10 h-10 bg-charcoal-800 rounded-lg flex items-center justify-center text-charcoal-400 hover:bg-electric hover:text-charcoal transition-colors"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-charcoal-800 rounded-lg flex items-center justify-center text-charcoal-400 hover:bg-electric hover:text-charcoal transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                </>
              )}
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="font-heading font-bold text-white mb-4">Services</h4>
            <ul className="space-y-3">
              {displayedServices.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-charcoal-400 hover:text-electric text-sm transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
              {services.length > 4 && (
                <li>
                  <Link
                    href="/services"
                    className="text-electric text-sm font-medium hover:text-electric-400 transition-colors"
                  >
                    View All Services →
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-heading font-bold text-white mb-4">Company</h4>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-charcoal-400 hover:text-electric text-sm transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/portal/login"
                  className="text-charcoal-400 hover:text-electric text-sm transition-colors"
                >
                  Customer Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="font-heading font-bold text-white mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-electric mt-0.5" />
                <span className="text-charcoal-400 text-sm">
                  Serving the {settings.service_area}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-electric mt-0.5" />
                <div className="text-charcoal-400 text-sm">
                  <p>Mon - Fri: {settings.hours_weekday}</p>
                  <p>Sat: {settings.hours_saturday}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-charcoal-800">
        <div className="container-custom py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-charcoal-500 text-sm">
            © {new Date().getFullYear()} {branding.business_name} All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-charcoal-500 hover:text-charcoal-300 text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-charcoal-500 hover:text-charcoal-300 text-sm transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/admin/login"
              className="text-charcoal-500 hover:text-charcoal-300 text-sm transition-colors"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
