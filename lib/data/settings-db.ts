import { createClient } from "@/lib/supabase/server";
import { unstable_noStore as noStore } from "next/cache";

export interface SiteSettings {
  phone: string;
  email: string;
  service_area: string;
  service_radius: string;
  hours_weekday: string;
  hours_saturday: string;
  hours_sunday: string;
  facebook_url: string;
  instagram_url: string;
  twitter_url: string;
}

const defaultSettings: SiteSettings = {
  phone: "(123) 456-7890",
  email: "hello@fixitpapa.com",
  service_area: "Greater Metro Area",
  service_radius: "30 miles",
  hours_weekday: "8:00 AM - 6:00 PM",
  hours_saturday: "9:00 AM - 4:00 PM",
  hours_sunday: "Closed",
  facebook_url: "",
  instagram_url: "",
  twitter_url: "",
};

export async function getSiteSettings(): Promise<SiteSettings> {
  // Disable caching to always get fresh data
  noStore();
  
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return defaultSettings;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("key, value")
      .eq("category", "contact");

    if (error || !data || data.length === 0) {
      return defaultSettings;
    }

    const settings: Partial<SiteSettings> = {};
    data.forEach((item: { key: string; value: unknown }) => {
      // JSONB values come back as parsed JS values
      // String values are returned directly, no need to strip quotes
      if (typeof item.value === 'string') {
        settings[item.key as keyof SiteSettings] = item.value;
      } else if (item.value !== null && item.value !== undefined) {
        settings[item.key as keyof SiteSettings] = String(item.value);
      }
    });

    return { ...defaultSettings, ...settings };
  } catch (err) {
    console.error("Error fetching site settings:", err);
    return defaultSettings;
  }
}

export interface PageContent {
  hero: {
    badge_text: string;
    headline: string;
    headline_highlight: string;
    subheadline: string;
    trust_points: string[];
  };
  about: {
    company_story: string;
    years_experience: string;
    jobs_completed: string;
    happy_customers: string;
    average_rating: string;
    certifications: string[];
  };
  cta: {
    headline: string;
    headline_highlight: string;
    description: string;
    trust_note: string;
  };
}

const defaultPageContent: PageContent = {
  hero: {
    badge_text: "Trusted by 500+ homeowners in the Metro Area",
    headline: "Expert Electrical &",
    headline_highlight: "Handyman Services",
    subheadline: "From ceiling fans to smart home installations, we handle all your electrical needs with precision, reliability, and fair pricing. Licensed professionals, guaranteed satisfaction.",
    trust_points: ["Licensed & Insured", "Same-Day Service", "Satisfaction Guaranteed"],
  },
  about: {
    company_story: "With over a decade of experience in the electrical trade, our founder saw a gap in the market: homeowners needed reliable, fairly-priced help with everyday electrical tasks that didn't require a full contractor.",
    years_experience: "10+",
    jobs_completed: "1,200+",
    happy_customers: "500+",
    average_rating: "5.0",
    certifications: ["Licensed Electrical Contractor", "Fully Insured & Bonded", "EPA Certified", "OSHA Safety Trained", "Smart Home Certified", "Ring Pro Installer"],
  },
  cta: {
    headline: "Ready to Get Your Project",
    headline_highlight: "Done Right?",
    description: "Get a free quote in minutes. Our friendly team is ready to help with any electrical or handyman project, big or small.",
    trust_note: "No obligation • Free estimates • Same-day response",
  },
};

export async function getPageContent(): Promise<PageContent> {
  // Disable caching to always get fresh data
  noStore();
  
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return defaultPageContent;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("page_content")
      .select("page_key, content");

    if (error || !data || data.length === 0) {
      return defaultPageContent;
    }

    const content: Partial<PageContent> = {};
    data.forEach((item: { page_key: string; content: any }) => {
      if (item.page_key === "hero") content.hero = { ...defaultPageContent.hero, ...item.content };
      if (item.page_key === "about") content.about = { ...defaultPageContent.about, ...item.content };
      if (item.page_key === "cta") content.cta = { ...defaultPageContent.cta, ...item.content };
    });

    return { ...defaultPageContent, ...content };
  } catch (err) {
    console.error("Error fetching page content:", err);
    return defaultPageContent;
  }
}

export async function getFAQs() {
  // Disable caching to always get fresh data
  noStore();
  
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return null; // Will fall back to static
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("faqs")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return null;
    }

    return data.map((faq: any) => ({
      question: faq.question,
      answer: faq.answer,
    }));
  } catch (err) {
    console.error("Error fetching FAQs:", err);
    return null;
  }
}

// =====================================================
// BRANDING SETTINGS
// =====================================================

export interface BrandingSettings {
  business_name: string;
  tagline: string;
  logo_url: string;
  favicon_url: string;
}

const defaultBranding: BrandingSettings = {
  business_name: "Fix it, papa!",
  tagline: "Handyman Services",
  logo_url: "",
  favicon_url: "",
};

export async function getBrandingSettings(): Promise<BrandingSettings> {
  noStore();
  
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return defaultBranding;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("key, value")
      .eq("category", "branding");

    if (error || !data || data.length === 0) {
      return defaultBranding;
    }

    const settings: Partial<BrandingSettings> = {};
    data.forEach((item: { key: string; value: unknown }) => {
      if (typeof item.value === 'string') {
        settings[item.key as keyof BrandingSettings] = item.value;
      } else if (item.value !== null && item.value !== undefined) {
        settings[item.key as keyof BrandingSettings] = String(item.value);
      }
    });

    return { ...defaultBranding, ...settings };
  } catch (err) {
    console.error("Error fetching branding settings:", err);
    return defaultBranding;
  }
}

// =====================================================
// SEO SETTINGS
// =====================================================

export interface SEOSettings {
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
}

const defaultSEO: SEOSettings = {
  meta_title: "Fix it, papa! | Professional Handyman Services",
  meta_description: "Expert electrical and handyman services including ceiling fan installation, light fixtures, switches, power receptacles, and smart home setup. Licensed, reliable, and affordable.",
  meta_keywords: "handyman, electrician, ceiling fan installation, light fixture, electrical services, home repair",
};

export async function getSEOSettings(): Promise<SEOSettings> {
  noStore();
  
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return defaultSEO;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("key, value")
      .eq("category", "seo");

    if (error || !data || data.length === 0) {
      return defaultSEO;
    }

    const settings: Partial<SEOSettings> = {};
    data.forEach((item: { key: string; value: unknown }) => {
      if (typeof item.value === 'string') {
        settings[item.key as keyof SEOSettings] = item.value;
      } else if (item.value !== null && item.value !== undefined) {
        settings[item.key as keyof SEOSettings] = String(item.value);
      }
    });

    return { ...defaultSEO, ...settings };
  } catch (err) {
    console.error("Error fetching SEO settings:", err);
    return defaultSEO;
  }
}

// =====================================================
// THEME SETTINGS
// =====================================================

export interface ThemeSettings {
  primary_color: string;
  accent_color: string;
}

const defaultTheme: ThemeSettings = {
  primary_color: "#EEFF00",
  accent_color: "#FF6B35",
};

export async function getThemeSettings(): Promise<ThemeSettings> {
  noStore();
  
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return defaultTheme;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("key, value")
      .eq("category", "theme");

    if (error || !data || data.length === 0) {
      return defaultTheme;
    }

    const settings: Partial<ThemeSettings> = {};
    data.forEach((item: { key: string; value: unknown }) => {
      if (typeof item.value === 'string') {
        settings[item.key as keyof ThemeSettings] = item.value;
      } else if (item.value !== null && item.value !== undefined) {
        settings[item.key as keyof ThemeSettings] = String(item.value);
      }
    });

    return { ...defaultTheme, ...settings };
  } catch (err) {
    console.error("Error fetching theme settings:", err);
    return defaultTheme;
  }
}

// =====================================================
// LEGAL PAGES
// =====================================================

export interface LegalPage {
  page_key: string;
  title: string;
  content: string;
  last_updated: string;
}

export async function getLegalPage(pageKey: string): Promise<LegalPage | null> {
  noStore();
  
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return null;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("legal_pages")
      .select("*")
      .eq("page_key", pageKey)
      .single();

    if (error || !data) {
      return null;
    }

    return {
      page_key: data.page_key,
      title: data.title,
      content: data.content,
      last_updated: data.last_updated,
    };
  } catch (err) {
    console.error("Error fetching legal page:", err);
    return null;
  }
}

export async function getAllLegalPages(): Promise<LegalPage[]> {
  noStore();
  
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return [];
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("legal_pages")
      .select("*")
      .order("page_key");

    if (error || !data) {
      return [];
    }

    return data.map((page: any) => ({
      page_key: page.page_key,
      title: page.title,
      content: page.content,
      last_updated: page.last_updated,
    }));
  } catch (err) {
    console.error("Error fetching legal pages:", err);
    return [];
  }
}

