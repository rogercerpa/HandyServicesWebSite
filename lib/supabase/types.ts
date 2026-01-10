// Database types for Supabase tables

export interface Admin {
  id: string;
  email: string;
  name: string | null;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  slug: string;
  name: string;
  short_description: string | null;
  full_description: string | null;
  icon: string;
  image: string | null;
  starting_price: number;
  price_note: string | null;
  duration: string | null;
  features: string[];
  process: { step: number; title: string; description: string }[];
  faq: { question: string; answer: string }[];
  related_services: string[];
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
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
  created_at: string;
  updated_at: string;
}

export interface QuoteQuestion {
  id: string;
  service_id: string;
  question: string;
  question_type: "select" | "number" | "radio" | "checkbox";
  options: { value: string; label: string; priceModifier?: number }[];
  min_value: number | null;
  max_value: number | null;
  price_per_unit: number | null;
  sort_order: number;
  is_required: boolean;
  created_at: string;
  updated_at: string;
}

export interface SiteSetting {
  id: string;
  key: string;
  value: unknown;
  category: string;
  created_at: string;
  updated_at: string;
}

export interface PageContent {
  id: string;
  page_key: string;
  content: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface QuoteSubmission {
  id: string;
  service_id: string | null;
  service_name: string | null;
  answers: Record<string, unknown>;
  estimated_price: number | null;
  contact_name: string;
  contact_email: string;
  contact_phone: string | null;
  contact_address: string | null;
  preferred_date: string | null;
  notes: string | null;
  status: "new" | "contacted" | "scheduled" | "completed" | "cancelled";
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service: string | null;
  message: string;
  status: "new" | "read" | "replied" | "archived";
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface AnalyticsEvent {
  id: string;
  event_type: string;
  page_path: string | null;
  service_id: string | null;
  metadata: Record<string, unknown>;
  session_id: string | null;
  user_agent: string | null;
  ip_address: string | null;
  created_at: string;
}

// Supabase Database type helper
export type Database = {
  public: {
    Tables: {
      admins: {
        Row: Admin;
        Insert: Omit<Admin, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Admin, "id" | "created_at" | "updated_at">>;
      };
      services: {
        Row: Service;
        Insert: Omit<Service, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Service, "id" | "created_at" | "updated_at">>;
      };
      testimonials: {
        Row: Testimonial;
        Insert: Omit<Testimonial, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Testimonial, "id" | "created_at" | "updated_at">>;
      };
      quote_questions: {
        Row: QuoteQuestion;
        Insert: Omit<QuoteQuestion, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<QuoteQuestion, "id" | "created_at" | "updated_at">>;
      };
      site_settings: {
        Row: SiteSetting;
        Insert: Omit<SiteSetting, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<SiteSetting, "id" | "created_at" | "updated_at">>;
      };
      page_content: {
        Row: PageContent;
        Insert: Omit<PageContent, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<PageContent, "id" | "created_at" | "updated_at">>;
      };
      faqs: {
        Row: FAQ;
        Insert: Omit<FAQ, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<FAQ, "id" | "created_at" | "updated_at">>;
      };
      quote_submissions: {
        Row: QuoteSubmission;
        Insert: Omit<QuoteSubmission, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<QuoteSubmission, "id" | "created_at" | "updated_at">>;
      };
      contact_submissions: {
        Row: ContactSubmission;
        Insert: Omit<ContactSubmission, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<ContactSubmission, "id" | "created_at" | "updated_at">>;
      };
      analytics_events: {
        Row: AnalyticsEvent;
        Insert: Omit<AnalyticsEvent, "id" | "created_at">;
        Update: Partial<Omit<AnalyticsEvent, "id" | "created_at">>;
      };
    };
  };
};

