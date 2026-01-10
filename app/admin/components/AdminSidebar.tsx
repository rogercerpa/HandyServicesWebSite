"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Zap,
  LayoutDashboard,
  Wrench,
  Star,
  FileText,
  MessageSquare,
  Settings,
  FileEdit,
  BarChart3,
  X,
  Building2,
  Search,
  Scale,
  Palette,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Services", href: "/admin/services", icon: Wrench },
  { name: "Testimonials", href: "/admin/testimonials", icon: Star },
  { name: "Quote Requests", href: "/admin/quotes", icon: FileText },
  { name: "Contact Messages", href: "/admin/contacts", icon: MessageSquare },
  { name: "Page Content", href: "/admin/content", icon: FileEdit },
  { name: "Site Settings", href: "/admin/settings", icon: Settings },
  { name: "Branding", href: "/admin/branding", icon: Building2 },
  { name: "SEO", href: "/admin/seo", icon: Search },
  { name: "Legal Pages", href: "/admin/legal", icon: Scale },
  { name: "Theme", href: "/admin/theme", icon: Palette },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
];

export function AdminSidebar() {
  const pathname = usePathname();

  // Don't show sidebar on login page
  if (pathname === "/admin/login") {
    return null;
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-charcoal-900 border-r border-charcoal-800 px-6 py-4">
          {/* Logo */}
          <Link href="/admin" className="flex items-center gap-3 py-2">
            <div className="w-10 h-10 bg-electric rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-charcoal" />
            </div>
            <div>
              <span className="font-heading text-lg font-bold text-white">
                Fix it, papa!
              </span>
              <span className="block text-xs text-charcoal-400 -mt-0.5">
                Admin Panel
              </span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href || 
                  (item.href !== "/admin" && pathname.startsWith(item.href));
                const Icon = item.icon;
                
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        "group flex items-center gap-x-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-electric text-charcoal"
                          : "text-charcoal-300 hover:bg-charcoal-800 hover:text-white"
                      )}
                    >
                      <Icon
                        className={cn(
                          "h-5 w-5 shrink-0",
                          isActive ? "text-charcoal" : "text-charcoal-400 group-hover:text-white"
                        )}
                      />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Back to Website Link */}
            <div className="mt-auto pt-6 border-t border-charcoal-800">
              <Link
                href="/"
                target="_blank"
                className="flex items-center gap-x-3 rounded-xl px-3 py-2.5 text-sm font-medium text-charcoal-400 hover:bg-charcoal-800 hover:text-white transition-colors"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                  />
                </svg>
                View Website
              </Link>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Sidebar - Will be controlled by AdminHeader */}
      <div
        id="mobile-sidebar"
        className="hidden fixed inset-0 z-50 lg:hidden"
      >
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-charcoal/80 backdrop-blur-sm"
          onClick={() => {
            document.getElementById("mobile-sidebar")?.classList.add("hidden");
          }}
        />

        {/* Sidebar Panel */}
        <div className="fixed inset-y-0 left-0 w-64 bg-charcoal-900 border-r border-charcoal-800">
          <div className="flex h-full flex-col gap-y-5 overflow-y-auto px-6 py-4">
            {/* Header with close button */}
            <div className="flex items-center justify-between">
              <Link href="/admin" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-electric rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-charcoal" />
                </div>
                <span className="font-heading text-lg font-bold text-white">
                  Admin
                </span>
              </Link>
              <button
                type="button"
                className="p-2 text-charcoal-400 hover:text-white"
                onClick={() => {
                  document.getElementById("mobile-sidebar")?.classList.add("hidden");
                }}
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Mobile Navigation */}
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-1">
                {navigation.map((item) => {
                  const isActive = pathname === item.href ||
                    (item.href !== "/admin" && pathname.startsWith(item.href));
                  const Icon = item.icon;

                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        onClick={() => {
                          document.getElementById("mobile-sidebar")?.classList.add("hidden");
                        }}
                        className={cn(
                          "group flex items-center gap-x-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                          isActive
                            ? "bg-electric text-charcoal"
                            : "text-charcoal-300 hover:bg-charcoal-800 hover:text-white"
                        )}
                      >
                        <Icon
                          className={cn(
                            "h-5 w-5 shrink-0",
                            isActive ? "text-charcoal" : "text-charcoal-400 group-hover:text-white"
                          )}
                        />
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

