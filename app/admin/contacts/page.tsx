import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui";
import { MessageSquare, Clock, Mail, Phone } from "lucide-react";
import { ContactActions } from "./ContactActions";

async function getContactSubmissions() {
  const supabase = await createClient();
  const { data: contacts, error } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching contacts:", error);
    return [];
  }

  return contacts || [];
}

const statusColors: Record<string, string> = {
  new: "bg-green-500/20 text-green-400",
  read: "bg-yellow-500/20 text-yellow-400",
  replied: "bg-blue-500/20 text-blue-400",
  archived: "bg-charcoal-700 text-charcoal-300",
};

export default async function ContactsPage() {
  const contacts = await getContactSubmissions();

  const newCount = contacts.filter((c) => c.status === "new").length;

  return (
    <div className="space-y-6">
      {/* Summary */}
      {newCount > 0 && (
        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-green-400" />
          </div>
          <div>
            <p className="font-medium text-white">
              You have {newCount} new message{newCount !== 1 ? "s" : ""}
            </p>
            <p className="text-sm text-charcoal-400">
              Review and respond to customer inquiries
            </p>
          </div>
        </div>
      )}

      {/* Contact List */}
      {contacts.length > 0 ? (
        <div className="space-y-4">
          {contacts.map((contact: any) => (
            <Card key={contact.id} className={contact.status === "new" ? "border-green-500/30" : ""}>
              <CardContent>
                <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                  {/* Main Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-white">
                        {contact.name}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[contact.status]}`}>
                        {contact.status}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-charcoal-400 mb-3">
                      <a href={`mailto:${contact.email}`} className="flex items-center gap-1 hover:text-electric">
                        <Mail className="w-4 h-4" />
                        {contact.email}
                      </a>
                      {contact.phone && (
                        <a href={`tel:${contact.phone}`} className="flex items-center gap-1 hover:text-electric">
                          <Phone className="w-4 h-4" />
                          {contact.phone}
                        </a>
                      )}
                      {contact.service && (
                        <span className="text-electric">
                          Re: {contact.service}
                        </span>
                      )}
                    </div>

                    <div className="bg-charcoal-800/50 rounded-lg p-4">
                      <p className="text-charcoal-200 whitespace-pre-wrap">
                        {contact.message}
                      </p>
                    </div>

                    {contact.admin_notes && (
                      <div className="mt-3 text-sm bg-electric/10 border border-electric/30 rounded-lg p-3">
                        <span className="font-medium text-electric">Admin Notes:</span>
                        <p className="text-charcoal-300 mt-1">{contact.admin_notes}</p>
                      </div>
                    )}
                  </div>

                  {/* Right Side - Time & Actions */}
                  <div className="flex flex-row lg:flex-col items-center lg:items-end gap-4">
                    <div className="flex items-center gap-2 text-xs text-charcoal-500">
                      <Clock className="w-3 h-3" />
                      {new Date(contact.created_at).toLocaleDateString()} at{" "}
                      {new Date(contact.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>

                    <ContactActions contact={contact} />
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
              <MessageSquare className="w-8 h-8 text-charcoal-400" />
            </div>
            <h3 className="font-heading text-xl font-bold text-white mb-2">
              No Messages Yet
            </h3>
            <p className="text-charcoal-400 max-w-md mx-auto">
              Contact form messages from your website will appear here. Make sure your
              contact form is connected to submit to this system.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

