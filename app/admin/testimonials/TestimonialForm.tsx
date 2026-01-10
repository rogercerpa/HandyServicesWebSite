"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button, Input, Card, CardContent, Textarea } from "@/components/ui";
import { Save, ArrowLeft, Star } from "lucide-react";

interface TestimonialFormProps {
  testimonial?: {
    id: string;
    name: string;
    location: string | null;
    rating: number;
    text: string;
    service: string | null;
    date: string;
    image: string | null;
    is_featured: boolean;
    is_active: boolean;
  };
}

export function TestimonialForm({ testimonial }: TestimonialFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: testimonial?.name || "",
    location: testimonial?.location || "",
    rating: testimonial?.rating || 5,
    text: testimonial?.text || "",
    service: testimonial?.service || "",
    date: testimonial?.date || new Date().toISOString().split("T")[0],
    image: testimonial?.image || "",
    is_featured: testimonial?.is_featured || false,
    is_active: testimonial?.is_active ?? true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const supabase = createClient();

    try {
      if (testimonial) {
        const { error } = await supabase
          .from("testimonials")
          .update(formData)
          .eq("id", testimonial.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("testimonials")
          .insert([formData]);

        if (error) throw error;
      }

      router.push("/admin/testimonials");
      router.refresh();
    } catch (err: any) {
      console.error("Error saving testimonial:", err);
      setError(err.message || "Failed to save testimonial");
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Link
        href="/admin/testimonials"
        className="inline-flex items-center gap-2 text-charcoal-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Testimonials
      </Link>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      <Card>
        <CardContent>
          <h3 className="font-heading text-lg font-bold text-white mb-6">
            Testimonial Details
          </h3>

          <div className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <Input
                label="Customer Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., John Smith"
                required
              />
              <Input
                label="Location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g., Downtown"
              />
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-charcoal-200 mb-2">
                Rating
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: star })}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`w-8 h-8 transition-colors ${
                        star <= formData.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-charcoal-600 hover:text-charcoal-500"
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-2 text-charcoal-400">
                  {formData.rating} star{formData.rating !== 1 ? "s" : ""}
                </span>
              </div>
            </div>

            <Textarea
              label="Testimonial Text"
              value={formData.text}
              onChange={(e) => setFormData({ ...formData, text: e.target.value })}
              placeholder="What did the customer say about your service?"
              rows={4}
              required
            />

            <div className="grid sm:grid-cols-2 gap-5">
              <Input
                label="Service (Optional)"
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                placeholder="e.g., Ceiling Fan Replacement"
              />
              <Input
                label="Date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>

            <Input
              label="Customer Photo URL (Optional)"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="https://..."
            />

            <div className="flex flex-col sm:flex-row gap-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="w-5 h-5 rounded border-charcoal-600 bg-charcoal-800 text-electric focus:ring-electric"
                />
                <span className="text-white">Active (visible on website)</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.is_featured}
                  onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                  className="w-5 h-5 rounded border-charcoal-600 bg-charcoal-800 text-electric focus:ring-electric"
                />
                <span className="text-white">Featured (show on homepage)</span>
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-end gap-4">
        <Link href="/admin/testimonials">
          <Button type="button" variant="secondary">
            Cancel
          </Button>
        </Link>
        <Button type="submit" isLoading={isSubmitting}>
          <Save className="w-5 h-5 mr-2" />
          {testimonial ? "Save Changes" : "Add Testimonial"}
        </Button>
      </div>
    </form>
  );
}

