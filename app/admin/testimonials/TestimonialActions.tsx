"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui";
import { Edit, Trash2, Eye, EyeOff, Star, MoreVertical } from "lucide-react";

interface TestimonialActionsProps {
  testimonial: {
    id: string;
    name: string;
    is_active: boolean;
    is_featured: boolean;
  };
}

export function TestimonialActions({ testimonial }: TestimonialActionsProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleToggleActive = async () => {
    const supabase = createClient();
    const { error } = await supabase
      .from("testimonials")
      .update({ is_active: !testimonial.is_active })
      .eq("id", testimonial.id);

    if (error) {
      console.error("Error toggling testimonial:", error);
      alert("Failed to update testimonial");
    } else {
      router.refresh();
    }
    setShowMenu(false);
  };

  const handleToggleFeatured = async () => {
    const supabase = createClient();
    const { error } = await supabase
      .from("testimonials")
      .update({ is_featured: !testimonial.is_featured })
      .eq("id", testimonial.id);

    if (error) {
      console.error("Error toggling featured:", error);
      alert("Failed to update testimonial");
    } else {
      router.refresh();
    }
    setShowMenu(false);
  };

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete this testimonial from ${testimonial.name}?`)) {
      return;
    }

    setIsDeleting(true);
    const supabase = createClient();

    const { error } = await supabase
      .from("testimonials")
      .delete()
      .eq("id", testimonial.id);

    if (error) {
      console.error("Error deleting testimonial:", error);
      alert("Failed to delete testimonial");
      setIsDeleting(false);
    } else {
      router.refresh();
    }
  };

  return (
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
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowMenu(false)}
          />
          
          <div className="absolute right-0 top-full mt-1 w-48 bg-charcoal-800 border border-charcoal-700 rounded-xl shadow-xl z-50 overflow-hidden">
            <Link
              href={`/admin/testimonials/${testimonial.id}`}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-charcoal-200 hover:bg-charcoal-700 transition-colors"
              onClick={() => setShowMenu(false)}
            >
              <Edit className="w-4 h-4" />
              Edit
            </Link>
            
            <button
              onClick={handleToggleFeatured}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-charcoal-200 hover:bg-charcoal-700 transition-colors"
            >
              <Star className={`w-4 h-4 ${testimonial.is_featured ? "fill-yellow-400 text-yellow-400" : ""}`} />
              {testimonial.is_featured ? "Remove from Featured" : "Mark as Featured"}
            </button>

            <button
              onClick={handleToggleActive}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-charcoal-200 hover:bg-charcoal-700 transition-colors"
            >
              {testimonial.is_active ? (
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
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

