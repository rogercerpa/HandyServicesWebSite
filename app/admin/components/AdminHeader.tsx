"use client";

import { usePathname } from "next/navigation";
import { signOut } from "../actions";
import { Menu, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui";

interface AdminHeaderProps {
  admin: {
    id: string;
    email: string;
    name: string | null;
  };
}

const pageTitles: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/services": "Services",
  "/admin/testimonials": "Testimonials",
  "/admin/quotes": "Quote Requests",
  "/admin/contacts": "Contact Messages",
  "/admin/content": "Page Content",
  "/admin/settings": "Site Settings",
  "/admin/analytics": "Analytics",
};

export function AdminHeader({ admin }: AdminHeaderProps) {
  const pathname = usePathname();

  // Don't show header on login page
  if (pathname === "/admin/login") {
    return null;
  }

  // Get page title, handling dynamic routes
  let pageTitle = pageTitles[pathname] || "Admin";
  if (pathname.startsWith("/admin/services/") && pathname !== "/admin/services") {
    pageTitle = pathname.includes("/new") ? "New Service" : "Edit Service";
  }
  if (pathname.startsWith("/admin/testimonials/") && pathname !== "/admin/testimonials") {
    pageTitle = pathname.includes("/new") ? "New Testimonial" : "Edit Testimonial";
  }

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="sticky top-0 z-30 bg-charcoal/95 backdrop-blur-md border-b border-charcoal-800">
      <div className="flex items-center justify-between h-16 px-4 lg:px-8">
        {/* Mobile menu button */}
        <button
          type="button"
          className="lg:hidden p-2 text-charcoal-400 hover:text-white"
          onClick={() => {
            document.getElementById("mobile-sidebar")?.classList.remove("hidden");
          }}
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Page Title */}
        <h1 className="font-heading text-xl font-bold text-white lg:text-2xl">
          {pageTitle}
        </h1>

        {/* User Menu */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-3">
            <div className="w-8 h-8 bg-electric/20 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-electric" />
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-white">
                {admin.name || "Admin"}
              </p>
              <p className="text-xs text-charcoal-400">{admin.email}</p>
            </div>
          </div>

          <form action={handleSignOut}>
            <Button
              type="submit"
              variant="ghost"
              size="sm"
              className="text-charcoal-400 hover:text-white"
            >
              <LogOut className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </form>
        </div>
      </div>
    </header>
  );
}

