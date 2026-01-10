import { createClient } from "@/lib/supabase/server";
import { services as staticServices, type Service } from "./services";
import { unstable_noStore as noStore } from "next/cache";

// Fetch services from Supabase with fallback to static data
export async function getServicesFromDB(): Promise<Service[]> {
  // Disable caching to always get fresh data
  noStore();
  
  // Check if Supabase is configured
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.log("Supabase not configured, using static data");
    return staticServices;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("Error fetching services from Supabase:", error);
      return staticServices;
    }

    if (!data || data.length === 0) {
      console.log("No services in database, using static data");
      return staticServices;
    }

    // Transform database format to match Service interface
    return data.map((s: any) => ({
      id: s.slug, // Use slug as ID for URL compatibility
      slug: s.slug,
      name: s.name,
      shortDescription: s.short_description || "",
      fullDescription: s.full_description || "",
      icon: s.icon || "Zap",
      image: s.image || "",
      startingPrice: Number(s.starting_price) || 0,
      priceNote: s.price_note || undefined,
      duration: s.duration || "",
      features: Array.isArray(s.features) ? s.features : [],
      process: Array.isArray(s.process) ? s.process : [],
      faq: Array.isArray(s.faq) ? s.faq : [],
      relatedServices: Array.isArray(s.related_services) ? s.related_services : [],
    }));
  } catch (err) {
    console.error("Error connecting to Supabase:", err);
    return staticServices;
  }
}

export async function getServiceBySlugFromDB(slug: string): Promise<Service | undefined> {
  const services = await getServicesFromDB();
  return services.find((service) => service.slug === slug);
}

export async function getRelatedServicesFromDB(serviceIds: string[]): Promise<Service[]> {
  const services = await getServicesFromDB();
  return services.filter((service) => serviceIds.includes(service.id) || serviceIds.includes(service.slug));
}

