import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui";
import { 
  Eye, 
  FileText, 
  MessageSquare, 
  TrendingUp, 
  Calendar,
  Wrench,
  Users
} from "lucide-react";

interface AnalyticsStats {
  totalPageViews: number;
  pageViewsToday: number;
  pageViewsThisWeek: number;
  pageViewsThisMonth: number;
  totalQuotes: number;
  quotesThisMonth: number;
  totalContacts: number;
  contactsThisMonth: number;
  popularPages: { path: string; count: number }[];
  popularServices: { name: string; count: number }[];
  quotesByStatus: { status: string; count: number }[];
  recentActivity: { type: string; description: string; time: string }[];
}

async function getAnalytics(): Promise<AnalyticsStats> {
  const supabase = await createClient();
  const now = new Date();
  const todayStart = new Date(now.setHours(0, 0, 0, 0)).toISOString();
  const weekStart = new Date(now.setDate(now.getDate() - 7)).toISOString();
  const monthStart = new Date(now.setDate(1)).toISOString();

  // Get page view counts
  const [totalViews, viewsToday, viewsWeek, viewsMonth] = await Promise.all([
    supabase.from("analytics_events").select("id", { count: "exact", head: true }).eq("event_type", "page_view"),
    supabase.from("analytics_events").select("id", { count: "exact", head: true }).eq("event_type", "page_view").gte("created_at", todayStart),
    supabase.from("analytics_events").select("id", { count: "exact", head: true }).eq("event_type", "page_view").gte("created_at", weekStart),
    supabase.from("analytics_events").select("id", { count: "exact", head: true }).eq("event_type", "page_view").gte("created_at", monthStart),
  ]);

  // Get quote counts
  const [totalQuotes, quotesMonth] = await Promise.all([
    supabase.from("quote_submissions").select("id", { count: "exact", head: true }),
    supabase.from("quote_submissions").select("id", { count: "exact", head: true }).gte("created_at", monthStart),
  ]);

  // Get contact counts
  const [totalContacts, contactsMonth] = await Promise.all([
    supabase.from("contact_submissions").select("id", { count: "exact", head: true }),
    supabase.from("contact_submissions").select("id", { count: "exact", head: true }).gte("created_at", monthStart),
  ]);

  // Get popular pages (top 5)
  const { data: pageData } = await supabase
    .from("analytics_events")
    .select("page_path")
    .eq("event_type", "page_view")
    .not("page_path", "is", null);

  const pageCounts: Record<string, number> = {};
  pageData?.forEach((item: any) => {
    pageCounts[item.page_path] = (pageCounts[item.page_path] || 0) + 1;
  });
  const popularPages = Object.entries(pageCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([path, count]) => ({ path, count }));

  // Get popular services from quotes
  const { data: quoteData } = await supabase
    .from("quote_submissions")
    .select("service_name");

  const serviceCounts: Record<string, number> = {};
  quoteData?.forEach((item: any) => {
    if (item.service_name) {
      serviceCounts[item.service_name] = (serviceCounts[item.service_name] || 0) + 1;
    }
  });
  const popularServices = Object.entries(serviceCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({ name, count }));

  // Get quotes by status
  const { data: statusData } = await supabase
    .from("quote_submissions")
    .select("status");

  const statusCounts: Record<string, number> = {};
  statusData?.forEach((item: any) => {
    statusCounts[item.status] = (statusCounts[item.status] || 0) + 1;
  });
  const quotesByStatus = Object.entries(statusCounts).map(([status, count]) => ({ status, count }));

  // Get recent activity
  const [recentQuotes, recentContacts] = await Promise.all([
    supabase.from("quote_submissions").select("contact_name, service_name, created_at").order("created_at", { ascending: false }).limit(3),
    supabase.from("contact_submissions").select("name, created_at").order("created_at", { ascending: false }).limit(3),
  ]);

  const recentActivity: { type: string; description: string; time: string }[] = [];
  
  recentQuotes.data?.forEach((q: any) => {
    recentActivity.push({
      type: "quote",
      description: `${q.contact_name} requested a quote for ${q.service_name || "General inquiry"}`,
      time: q.created_at,
    });
  });
  
  recentContacts.data?.forEach((c: any) => {
    recentActivity.push({
      type: "contact",
      description: `${c.name} sent a message`,
      time: c.created_at,
    });
  });

  // Sort by time
  recentActivity.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());

  return {
    totalPageViews: totalViews.count || 0,
    pageViewsToday: viewsToday.count || 0,
    pageViewsThisWeek: viewsWeek.count || 0,
    pageViewsThisMonth: viewsMonth.count || 0,
    totalQuotes: totalQuotes.count || 0,
    quotesThisMonth: quotesMonth.count || 0,
    totalContacts: totalContacts.count || 0,
    contactsThisMonth: contactsMonth.count || 0,
    popularPages,
    popularServices,
    quotesByStatus,
    recentActivity: recentActivity.slice(0, 5),
  };
}

export default async function AnalyticsPage() {
  const stats = await getAnalytics();

  const mainStats = [
    {
      title: "Page Views Today",
      value: stats.pageViewsToday,
      change: stats.pageViewsThisWeek,
      changeLabel: "this week",
      icon: Eye,
      color: "bg-blue-500/20 text-blue-400",
    },
    {
      title: "Total Quotes",
      value: stats.totalQuotes,
      change: stats.quotesThisMonth,
      changeLabel: "this month",
      icon: FileText,
      color: "bg-green-500/20 text-green-400",
    },
    {
      title: "Total Messages",
      value: stats.totalContacts,
      change: stats.contactsThisMonth,
      changeLabel: "this month",
      icon: MessageSquare,
      color: "bg-purple-500/20 text-purple-400",
    },
    {
      title: "All Time Views",
      value: stats.totalPageViews,
      change: stats.pageViewsThisMonth,
      changeLabel: "this month",
      icon: TrendingUp,
      color: "bg-electric/20 text-electric",
    },
  ];

  const statusColors: Record<string, string> = {
    new: "bg-green-500",
    contacted: "bg-blue-500",
    scheduled: "bg-purple-500",
    completed: "bg-charcoal-500",
    cancelled: "bg-red-500",
  };

  return (
    <div className="space-y-6">
      {/* Main Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {mainStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-charcoal-400">{stat.title}</p>
                    <p className="text-2xl font-bold text-white">{stat.value.toLocaleString()}</p>
                    <p className="text-xs text-charcoal-500">
                      +{stat.change} {stat.changeLabel}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Popular Pages */}
        <Card>
          <CardContent>
            <h3 className="font-heading text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Eye className="w-5 h-5 text-electric" />
              Popular Pages
            </h3>
            {stats.popularPages.length > 0 ? (
              <div className="space-y-4">
                {stats.popularPages.map((page, index) => (
                  <div key={page.path} className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-charcoal-700 rounded-lg flex items-center justify-center text-sm font-bold text-charcoal-300">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white truncate">{page.path || "/"}</p>
                    </div>
                    <p className="text-electric font-medium">{page.count.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-charcoal-400 text-center py-8">
                No page view data yet. Analytics will appear as visitors browse your site.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Popular Services */}
        <Card>
          <CardContent>
            <h3 className="font-heading text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Wrench className="w-5 h-5 text-electric" />
              Most Requested Services
            </h3>
            {stats.popularServices.length > 0 ? (
              <div className="space-y-4">
                {stats.popularServices.map((service, index) => (
                  <div key={service.name} className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-charcoal-700 rounded-lg flex items-center justify-center text-sm font-bold text-charcoal-300">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white truncate">{service.name}</p>
                    </div>
                    <p className="text-electric font-medium">{service.count} quotes</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-charcoal-400 text-center py-8">
                No quote requests yet.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Quote Status Breakdown */}
        <Card>
          <CardContent>
            <h3 className="font-heading text-lg font-bold text-white mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-electric" />
              Quote Status Breakdown
            </h3>
            {stats.quotesByStatus.length > 0 ? (
              <div className="space-y-3">
                {stats.quotesByStatus.map((item) => {
                  const total = stats.totalQuotes || 1;
                  const percentage = Math.round((item.count / total) * 100);
                  return (
                    <div key={item.status}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-charcoal-300 capitalize">{item.status}</span>
                        <span className="text-sm text-white">{item.count} ({percentage}%)</span>
                      </div>
                      <div className="h-2 bg-charcoal-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${statusColors[item.status] || "bg-charcoal-500"} rounded-full transition-all`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-charcoal-400 text-center py-8">
                No quote data to display.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardContent>
            <h3 className="font-heading text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-electric" />
              Recent Activity
            </h3>
            {stats.recentActivity.length > 0 ? (
              <div className="space-y-4">
                {stats.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      activity.type === "quote" ? "bg-green-500/20" : "bg-blue-500/20"
                    }`}>
                      {activity.type === "quote" ? (
                        <FileText className="w-4 h-4 text-green-400" />
                      ) : (
                        <MessageSquare className="w-4 h-4 text-blue-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-charcoal-200 truncate">
                        {activity.description}
                      </p>
                      <p className="text-xs text-charcoal-500">
                        {new Date(activity.time).toLocaleDateString()} at{" "}
                        {new Date(activity.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-charcoal-400 text-center py-8">
                No recent activity.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Info Note */}
      <Card className="bg-charcoal-800/50">
        <CardContent className="flex items-start gap-4">
          <div className="w-10 h-10 bg-electric/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-5 h-5 text-electric" />
          </div>
          <div>
            <h4 className="font-medium text-white mb-1">Analytics Tracking</h4>
            <p className="text-sm text-charcoal-400">
              Analytics data is collected when visitors browse your website. Make sure the analytics tracking 
              code is installed on your pages to see accurate visitor statistics. Quote and contact submissions 
              are tracked automatically.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

