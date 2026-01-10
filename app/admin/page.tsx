import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui";
import {
  Wrench,
  Star,
  FileText,
  MessageSquare,
  TrendingUp,
  Eye,
  ArrowRight,
  Clock,
} from "lucide-react";

async function getDashboardStats() {
  const supabase = await createClient();

  // Get counts from each table
  const [
    servicesCount,
    testimonialsCount,
    quoteSubmissions,
    contactSubmissions,
    analyticsToday,
  ] = await Promise.all([
    supabase.from("services").select("id", { count: "exact", head: true }),
    supabase.from("testimonials").select("id", { count: "exact", head: true }),
    supabase
      .from("quote_submissions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("analytics_events")
      .select("id", { count: "exact", head: true })
      .gte("created_at", new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()),
  ]);

  // Count new submissions
  const newQuotes = quoteSubmissions.data?.filter((q) => q.status === "new").length || 0;
  const newContacts = contactSubmissions.data?.filter((c) => c.status === "new").length || 0;

  return {
    services: servicesCount.count || 0,
    testimonials: testimonialsCount.count || 0,
    newQuotes,
    newContacts,
    recentQuotes: quoteSubmissions.data || [],
    recentContacts: contactSubmissions.data || [],
    pageViewsToday: analyticsToday.count || 0,
  };
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  const statCards = [
    {
      title: "Active Services",
      value: stats.services,
      icon: Wrench,
      href: "/admin/services",
      color: "bg-electric/20 text-electric",
    },
    {
      title: "Testimonials",
      value: stats.testimonials,
      icon: Star,
      href: "/admin/testimonials",
      color: "bg-yellow-500/20 text-yellow-500",
    },
    {
      title: "New Quotes",
      value: stats.newQuotes,
      icon: FileText,
      href: "/admin/quotes",
      color: "bg-green-500/20 text-green-500",
      badge: stats.newQuotes > 0,
    },
    {
      title: "New Messages",
      value: stats.newContacts,
      icon: MessageSquare,
      href: "/admin/contacts",
      color: "bg-blue-500/20 text-blue-500",
      badge: stats.newContacts > 0,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-br from-charcoal-800 to-charcoal-900 rounded-2xl border border-charcoal-700 p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="font-heading text-2xl font-bold text-white mb-2">
              Welcome to the Admin Dashboard
            </h2>
            <p className="text-charcoal-300">
              Manage your website content, view submissions, and track analytics.
            </p>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-2 bg-charcoal-700/50 rounded-lg px-4 py-2">
              <Eye className="w-4 h-4 text-electric" />
              <span className="text-charcoal-200">
                <span className="font-bold text-white">{stats.pageViewsToday}</span> views today
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.title} href={stat.href}>
              <Card variant="interactive" className="h-full">
                <CardContent className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-charcoal-400">{stat.title}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                      {stat.badge && (
                        <span className="px-2 py-0.5 bg-electric text-charcoal text-xs font-bold rounded-full">
                          New
                        </span>
                      )}
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-charcoal-500" />
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Quote Requests */}
        <Card>
          <CardContent>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading text-lg font-bold text-white">
                Recent Quote Requests
              </h3>
              <Link
                href="/admin/quotes"
                className="text-sm text-electric hover:text-electric-400 transition-colors"
              >
                View all →
              </Link>
            </div>
            {stats.recentQuotes.length > 0 ? (
              <div className="space-y-4">
                {stats.recentQuotes.slice(0, 4).map((quote: any) => (
                  <div
                    key={quote.id}
                    className="flex items-center gap-4 p-3 bg-charcoal-800/50 rounded-xl"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-white truncate">
                        {quote.contact_name}
                      </p>
                      <p className="text-sm text-charcoal-400 truncate">
                        {quote.service_name || "General inquiry"}
                      </p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          quote.status === "new"
                            ? "bg-green-500/20 text-green-400"
                            : quote.status === "contacted"
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-charcoal-700 text-charcoal-300"
                        }`}
                      >
                        {quote.status}
                      </span>
                      <p className="text-xs text-charcoal-500 mt-1">
                        <Clock className="w-3 h-3 inline mr-1" />
                        {new Date(quote.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-charcoal-600 mx-auto mb-3" />
                <p className="text-charcoal-400">No quote requests yet</p>
                <p className="text-sm text-charcoal-500">
                  Requests will appear here as they come in
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Contact Messages */}
        <Card>
          <CardContent>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading text-lg font-bold text-white">
                Recent Messages
              </h3>
              <Link
                href="/admin/contacts"
                className="text-sm text-electric hover:text-electric-400 transition-colors"
              >
                View all →
              </Link>
            </div>
            {stats.recentContacts.length > 0 ? (
              <div className="space-y-4">
                {stats.recentContacts.slice(0, 4).map((contact: any) => (
                  <div
                    key={contact.id}
                    className="flex items-center gap-4 p-3 bg-charcoal-800/50 rounded-xl"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-white truncate">
                        {contact.name}
                      </p>
                      <p className="text-sm text-charcoal-400 truncate">
                        {contact.message}
                      </p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          contact.status === "new"
                            ? "bg-green-500/20 text-green-400"
                            : contact.status === "read"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-charcoal-700 text-charcoal-300"
                        }`}
                      >
                        {contact.status}
                      </span>
                      <p className="text-xs text-charcoal-500 mt-1">
                        <Clock className="w-3 h-3 inline mr-1" />
                        {new Date(contact.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <MessageSquare className="w-12 h-12 text-charcoal-600 mx-auto mb-3" />
                <p className="text-charcoal-400">No messages yet</p>
                <p className="text-sm text-charcoal-500">
                  Messages will appear here as they come in
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardContent>
          <h3 className="font-heading text-lg font-bold text-white mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Link
              href="/admin/services/new"
              className="flex flex-col items-center gap-2 p-4 bg-charcoal-800/50 rounded-xl hover:bg-charcoal-800 transition-colors"
            >
              <div className="w-10 h-10 bg-electric/20 rounded-lg flex items-center justify-center">
                <Wrench className="w-5 h-5 text-electric" />
              </div>
              <span className="text-sm text-charcoal-200">Add Service</span>
            </Link>
            <Link
              href="/admin/testimonials/new"
              className="flex flex-col items-center gap-2 p-4 bg-charcoal-800/50 rounded-xl hover:bg-charcoal-800 transition-colors"
            >
              <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-yellow-500" />
              </div>
              <span className="text-sm text-charcoal-200">Add Testimonial</span>
            </Link>
            <Link
              href="/admin/content"
              className="flex flex-col items-center gap-2 p-4 bg-charcoal-800/50 rounded-xl hover:bg-charcoal-800 transition-colors"
            >
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-500" />
              </div>
              <span className="text-sm text-charcoal-200">Edit Content</span>
            </Link>
            <Link
              href="/admin/settings"
              className="flex flex-col items-center gap-2 p-4 bg-charcoal-800/50 rounded-xl hover:bg-charcoal-800 transition-colors"
            >
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-blue-500" />
              </div>
              <span className="text-sm text-charcoal-200">Settings</span>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

