"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui";
import { Edit, Trash2, Eye, EyeOff, MoreVertical } from "lucide-react";

interface ServiceActionsProps {
  service: {
    id: string;
    name: string;
    slug: string;
    is_active: boolean;
  };
}

export function ServiceActions({ service }: ServiceActionsProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isToggling, setIsToggling] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleToggleActive = async () => {
    setIsToggling(true);
    const supabase = createClient();

    const { error } = await supabase
      .from("services")
      .update({ is_active: !service.is_active })
      .eq("id", service.id);

    if (error) {
      console.error("Error toggling service:", error);
      alert("Failed to update service status");
    } else {
      router.refresh();
    }

    setIsToggling(false);
    setShowMenu(false);
  };

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${service.name}"? This action cannot be undone.`)) {
      return;
    }

    setIsDeleting(true);
    const supabase = createClient();

    const { error } = await supabase
      .from("services")
      .delete()
      .eq("id", service.id);

    if (error) {
      console.error("Error deleting service:", error);
      alert("Failed to delete service");
      setIsDeleting(false);
    } else {
      router.refresh();
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* View on site button */}
      <Link
        href={`/services/${service.slug}`}
        target="_blank"
        className="hidden sm:flex"
      >
        <Button variant="ghost" size="sm" className="text-charcoal-400">
          <Eye className="w-4 h-4" />
        </Button>
      </Link>

      {/* Edit button */}
      <Link href={`/admin/services/${service.id}`}>
        <Button variant="ghost" size="sm" className="text-charcoal-400">
          <Edit className="w-4 h-4" />
        </Button>
      </Link>

      {/* More actions dropdown */}
      <div className="relative">
        <Button
          variant="ghost"
          size="sm"
          className="text-charcoal-400"
          onClick={() => setShowMenu(!showMenu)}
        >
          <MoreVertical className="w-4 h-4" />
        </Button>

        {showMenu && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setShowMenu(false)}
            />
            
            {/* Dropdown */}
            <div className="absolute right-0 top-full mt-1 w-48 bg-charcoal-800 border border-charcoal-700 rounded-xl shadow-xl z-50 overflow-hidden">
              <button
                onClick={handleToggleActive}
                disabled={isToggling}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-charcoal-200 hover:bg-charcoal-700 transition-colors disabled:opacity-50"
              >
                {service.is_active ? (
                  <>
                    <EyeOff className="w-4 h-4" />
                    Hide from Website
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4" />
                    Show on Website
                  </>
                )}
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-50"
              >
                <Trash2 className="w-4 h-4" />
                {isDeleting ? "Deleting..." : "Delete Service"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

