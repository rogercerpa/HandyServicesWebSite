"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  History, 
  CreditCard, 
  User, 
  LogOut,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";

const navigation = [
  { name: "Dashboard", href: "/portal", icon: LayoutDashboard },
  { name: "Service History", href: "/portal/history", icon: History },
  { name: "Payments", href: "/portal/payments", icon: CreditCard },
  { name: "Profile", href: "/portal/profile", icon: User },
];

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Don't show sidebar on login page
  if (pathname === "/portal/login") {
    return children;
  }

  return (
    <div className="pt-16 md:pt-20 min-h-screen flex">
      {/* Mobile Sidebar Toggle */}
      <button
        type="button"
        className="lg:hidden fixed bottom-6 right-6 z-50 w-14 h-14 bg-electric rounded-full flex items-center justify-center shadow-lg shadow-electric/30"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? (
          <X className="w-6 h-6 text-charcoal" />
        ) : (
          <Menu className="w-6 h-6 text-charcoal" />
        )}
      </button>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-charcoal/80 backdrop-blur-sm z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-16 md:top-20 left-0 z-40 w-64 h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] bg-charcoal-900 border-r border-charcoal-800 transition-transform duration-300",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full p-4">
          {/* Portal Title */}
          <div className="px-3 py-4 mb-4 border-b border-charcoal-800">
            <h2 className="font-heading text-lg font-bold text-white">
              Customer Portal
            </h2>
            <p className="text-sm text-charcoal-400">Welcome back, John</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-3 rounded-xl font-medium transition-colors",
                    isActive
                      ? "bg-electric/10 text-electric"
                      : "text-charcoal-300 hover:bg-charcoal-800 hover:text-white"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="pt-4 border-t border-charcoal-800">
            <Link
              href="/portal/login"
              className="flex items-center gap-3 px-3 py-3 rounded-xl text-charcoal-400 hover:bg-charcoal-800 hover:text-white transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8">
        {children}
      </main>
    </div>
  );
}

