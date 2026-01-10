import { createClient } from "@/lib/supabase/server";
import { testimonials as staticTestimonials, type Testimonial } from "./testimonials";
import { unstable_noStore as noStore } from "next/cache";

// Fetch testimonials from Supabase with fallback to static data
export async function getTestimonialsFromDB(): Promise<Testimonial[]> {
  // Disable caching to always get fresh data
  noStore();
  
  // Check if Supabase is configured
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.log("Supabase not configured, using static testimonials");
    return staticTestimonials;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .eq("is_active", true)
      .order("date", { ascending: false });

    if (error) {
      console.error("Error fetching testimonials from Supabase:", error);
      return staticTestimonials;
    }

    if (!data || data.length === 0) {
      console.log("No testimonials in database, using static data");
      return staticTestimonials;
    }

    // Transform database format to match Testimonial interface
    return data.map((t: any) => ({
      id: t.id,
      name: t.name,
      location: t.location || "",
      rating: t.rating || 5,
      text: t.text,
      service: t.service || "",
      date: t.date,
      image: t.image || undefined,
    }));
  } catch (err) {
    console.error("Error connecting to Supabase:", err);
    return staticTestimonials;
  }
}

export async function getFeaturedTestimonialsFromDB(count: number = 3): Promise<Testimonial[]> {
  // Disable caching to always get fresh data
  noStore();
  
  // Check if Supabase is configured
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return staticTestimonials.slice(0, count);
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .eq("is_active", true)
      .eq("is_featured", true)
      .order("date", { ascending: false })
      .limit(count);

    if (error || !data || data.length === 0) {
      // Fall back to regular testimonials if no featured ones
      const allTestimonials = await getTestimonialsFromDB();
      return allTestimonials.slice(0, count);
    }

    return data.map((t: any) => ({
      id: t.id,
      name: t.name,
      location: t.location || "",
      rating: t.rating || 5,
      text: t.text,
      service: t.service || "",
      date: t.date,
      image: t.image || undefined,
    }));
  } catch (err) {
    console.error("Error fetching featured testimonials:", err);
    return staticTestimonials.slice(0, count);
  }
}

export async function getTestimonialsByServiceFromDB(serviceName: string): Promise<Testimonial[]> {
  const testimonials = await getTestimonialsFromDB();
  return testimonials.filter((t) => 
    t.service.toLowerCase().includes(serviceName.toLowerCase())
  );
}

