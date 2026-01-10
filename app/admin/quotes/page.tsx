import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui";
import { FileText, Clock, Mail, Phone, MapPin } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { QuoteActions } from "./QuoteActions";

async function getQuoteSubmissions() {
  const supabase = await createClient();
  const { data: quotes, error } = await supabase
    .from("quote_submissions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching quotes:", error);
    return [];
  }

  return quotes || [];
}

const statusColors: Record<string, string> = {
  new: "bg-green-500/20 text-green-400",
  contacted: "bg-blue-500/20 text-blue-400",
  scheduled: "bg-purple-500/20 text-purple-400",
  completed: "bg-charcoal-700 text-charcoal-300",
  cancelled: "bg-red-500/20 text-red-400",
};

export default async function QuotesPage() {
  const quotes = await getQuoteSubmissions();

  // Group by status for summary
  const summary = {
    new: quotes.filter((q) => q.status === "new").length,
    contacted: quotes.filter((q) => q.status === "contacted").length,
    scheduled: quotes.filter((q) => q.status === "scheduled").length,
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <span className="text-green-400 font-bold">{summary.new}</span>
            </div>
            <div>
              <p className="text-sm text-charcoal-400">New</p>
              <p className="font-medium text-white">Awaiting response</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <span className="text-blue-400 font-bold">{summary.contacted}</span>
            </div>
            <div>
              <p className="text-sm text-charcoal-400">Contacted</p>
              <p className="font-medium text-white">In discussion</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <span className="text-purple-400 font-bold">{summary.scheduled}</span>
            </div>
            <div>
              <p className="text-sm text-charcoal-400">Scheduled</p>
              <p className="font-medium text-white">Appointments set</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quotes List */}
      {quotes.length > 0 ? (
        <div className="space-y-4">
          {quotes.map((quote: any) => (
            <Card key={quote.id}>
              <CardContent>
                <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                  {/* Main Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-white">
                        {quote.contact_name}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[quote.status]}`}>
                        {quote.status}
                      </span>
                    </div>

                    <p className="text-electric font-medium mb-2">
                      {quote.service_name || "General Inquiry"}
                    </p>

                    <div className="flex flex-wrap gap-4 text-sm text-charcoal-400">
                      <a href={`mailto:${quote.contact_email}`} className="flex items-center gap-1 hover:text-electric">
                        <Mail className="w-4 h-4" />
                        {quote.contact_email}
                      </a>
                      {quote.contact_phone && (
                        <a href={`tel:${quote.contact_phone}`} className="flex items-center gap-1 hover:text-electric">
                          <Phone className="w-4 h-4" />
                          {quote.contact_phone}
                        </a>
                      )}
                      {quote.contact_address && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {quote.contact_address}
                        </span>
                      )}
                    </div>

                    {quote.notes && (
                      <p className="mt-3 text-sm text-charcoal-300 bg-charcoal-800/50 rounded-lg p-3">
                        {quote.notes}
                      </p>
                    )}

                    {quote.admin_notes && (
                      <div className="mt-3 text-sm bg-electric/10 border border-electric/30 rounded-lg p-3">
                        <span className="font-medium text-electric">Admin Notes:</span>
                        <p className="text-charcoal-300 mt-1">{quote.admin_notes}</p>
                      </div>
                    )}
                  </div>

                  {/* Right Side - Price & Actions */}
                  <div className="flex flex-row lg:flex-col items-center lg:items-end gap-4">
                    {quote.estimated_price && (
                      <div className="text-right">
                        <p className="text-xs text-charcoal-500">Estimated</p>
                        <p className="text-xl font-bold text-electric">
                          {formatCurrency(quote.estimated_price)}
                        </p>
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-xs text-charcoal-500">
                      <Clock className="w-3 h-3" />
                      {new Date(quote.created_at).toLocaleDateString()} at{" "}
                      {new Date(quote.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>

                    <QuoteActions quote={quote} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <div className="w-16 h-16 bg-charcoal-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-charcoal-400" />
            </div>
            <h3 className="font-heading text-xl font-bold text-white mb-2">
              No Quote Requests Yet
            </h3>
            <p className="text-charcoal-400 max-w-md mx-auto">
              Quote requests from your website will appear here. Make sure your quote
              form is connected to submit to this system.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

