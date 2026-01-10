import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, Button } from "@/components/ui";
import { Plus, Star, EyeOff } from "lucide-react";
import { TestimonialActions } from "./TestimonialActions";

async function getTestimonials() {
  const supabase = await createClient();
  const { data: testimonials, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }

  return testimonials || [];
}

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-lg text-charcoal-300">
            Manage customer testimonials displayed on your website
          </h2>
        </div>
        <Link href="/admin/testimonials/new">
          <Button leftIcon={<Plus className="w-5 h-5" />}>
            Add Testimonial
          </Button>
        </Link>
      </div>

      {/* Testimonials Grid */}
      {testimonials.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((testimonial: any) => (
            <Card key={testimonial.id} className="relative">
              <CardContent>
                {/* Status badges */}
                <div className="flex items-center gap-2 mb-4">
                  {testimonial.is_featured && (
                    <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-medium rounded-full">
                      Featured
                    </span>
                  )}
                  {!testimonial.is_active && (
                    <span className="flex items-center gap-1 px-2 py-1 bg-charcoal-700 text-charcoal-400 text-xs rounded-full">
                      <EyeOff className="w-3 h-3" />
                      Hidden
                    </span>
                  )}
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < testimonial.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-charcoal-600"
                      }`}
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-charcoal-300 text-sm line-clamp-3 mb-4">
                  &ldquo;{testimonial.text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-white">{testimonial.name}</p>
                    <p className="text-xs text-charcoal-500">
                      {testimonial.location} • {new Date(testimonial.date).toLocaleDateString()}
                    </p>
                  </div>
                  <TestimonialActions testimonial={testimonial} />
                </div>

                {/* Service tag */}
                {testimonial.service && (
                  <div className="mt-3 pt-3 border-t border-charcoal-700">
                    <span className="text-xs text-electric">{testimonial.service}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <div className="w-16 h-16 bg-charcoal-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-charcoal-400" />
            </div>
            <h3 className="font-heading text-xl font-bold text-white mb-2">
              No Testimonials Yet
            </h3>
            <p className="text-charcoal-400 mb-6 max-w-md mx-auto">
              Add customer testimonials to build trust and showcase your quality work.
            </p>
            <Link href="/admin/testimonials/new">
              <Button leftIcon={<Plus className="w-5 h-5" />}>
                Add Your First Testimonial
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

