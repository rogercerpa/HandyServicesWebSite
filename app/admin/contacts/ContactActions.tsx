"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui";
import { MoreVertical, Check, Eye, Archive, StickyNote, Trash2, Mail } from "lucide-react";

interface ContactActionsProps {
  contact: {
    id: string;
    status: string;
    name: string;
    email: string;
    admin_notes: string | null;
  };
}

export function ContactActions({ contact }: ContactActionsProps) {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [adminNotes, setAdminNotes] = useState(contact.admin_notes || "");
  const [isSaving, setIsSaving] = useState(false);

  const updateStatus = async (newStatus: string) => {
    const supabase = createClient();
    const { error } = await supabase
      .from("contact_submissions")
      .update({ status: newStatus })
      .eq("id", contact.id);

    if (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
    } else {
      router.refresh();
    }
    setShowMenu(false);
  };

  const saveNotes = async () => {
    setIsSaving(true);
    const supabase = createClient();
    const { error } = await supabase
      .from("contact_submissions")
      .update({ admin_notes: adminNotes })
      .eq("id", contact.id);

    if (error) {
      console.error("Error saving notes:", error);
      alert("Failed to save notes");
    } else {
      router.refresh();
    }
    setIsSaving(false);
    setShowNotesModal(false);
  };

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete this message from ${contact.name}?`)) {
      return;
    }

    const supabase = createClient();
    const { error } = await supabase
      .from("contact_submissions")
      .delete()
      .eq("id", contact.id);

    if (error) {
      console.error("Error deleting contact:", error);
      alert("Failed to delete message");
    } else {
      router.refresh();
    }
  };

  return (
    <>
      <div className="relative">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setShowMenu(!showMenu)}
        >
          Actions
          <MoreVertical className="w-4 h-4 ml-2" />
        </Button>

        {showMenu && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setShowMenu(false)}
            />
            
            <div className="absolute right-0 top-full mt-1 w-52 bg-charcoal-800 border border-charcoal-700 rounded-xl shadow-xl z-50 overflow-hidden">
              <a
                href={`mailto:${contact.email}`}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-charcoal-200 hover:bg-charcoal-700 transition-colors"
                onClick={() => setShowMenu(false)}
              >
                <Mail className="w-4 h-4 text-electric" />
                Reply via Email
              </a>

              <div className="border-t border-charcoal-700 my-1" />
              
              <button
                onClick={() => updateStatus("read")}
                disabled={contact.status === "read"}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-charcoal-200 hover:bg-charcoal-700 transition-colors disabled:opacity-50"
              >
                <Eye className="w-4 h-4 text-yellow-400" />
                Mark as Read
              </button>
              
              <button
                onClick={() => updateStatus("replied")}
                disabled={contact.status === "replied"}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-charcoal-200 hover:bg-charcoal-700 transition-colors disabled:opacity-50"
              >
                <Check className="w-4 h-4 text-blue-400" />
                Mark as Replied
              </button>
              
              <button
                onClick={() => updateStatus("archived")}
                disabled={contact.status === "archived"}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-charcoal-200 hover:bg-charcoal-700 transition-colors disabled:opacity-50"
              >
                <Archive className="w-4 h-4 text-charcoal-400" />
                Archive
              </button>

              <div className="border-t border-charcoal-700 mt-1 pt-1">
                <button
                  onClick={() => {
                    setShowMenu(false);
                    setShowNotesModal(true);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-charcoal-200 hover:bg-charcoal-700 transition-colors"
                >
                  <StickyNote className="w-4 h-4" />
                  Add/Edit Notes
                </button>
                
                <button
                  onClick={handleDelete}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Notes Modal */}
      {showNotesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-charcoal/80 backdrop-blur-sm"
            onClick={() => setShowNotesModal(false)}
          />
          <div className="relative bg-charcoal-800 border border-charcoal-700 rounded-2xl p-6 w-full max-w-md">
            <h3 className="font-heading text-lg font-bold text-white mb-4">
              Admin Notes
            </h3>
            <textarea
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              placeholder="Add internal notes about this message..."
              rows={4}
              className="w-full bg-charcoal-900 border border-charcoal-600 rounded-xl px-4 py-3 text-white placeholder:text-charcoal-400 focus:outline-none focus:border-electric resize-none"
            />
            <div className="flex justify-end gap-3 mt-4">
              <Button variant="secondary" onClick={() => setShowNotesModal(false)}>
                Cancel
              </Button>
              <Button onClick={saveNotes} isLoading={isSaving}>
                Save Notes
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

